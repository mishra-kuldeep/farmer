import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CartService from "@/services/CartSevices";

const initialState = {
    cart:null,
    isLoading: false,
    error: null,
    success: false,
    message: "",
  };

// Async thunk for adding to cart
export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async (data, { rejectWithValue }) => {
      try {
        const response = await CartService.AddToCart(data);    
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  // Async thunk for updating cart quantity
  export const updateCart = createAsyncThunk(
    "cart/updateCart",
    async ({ cartId, data }, { rejectWithValue }) => {
      try {
        const response = await CartService.UpdateCart(cartId, data);
        console.log(response);
        
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  // Async thunk for fetching cart
  export const getCart = createAsyncThunk(
    "cart/getCart",
    async (buyerId, { rejectWithValue }) => {
      try {
        const response = await CartService.getCartItems(buyerId);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  // Async thunk for deleting cart item
  export const deleteCart = createAsyncThunk(
    "cart/deleteCart",
    async (cartId, { rejectWithValue }) => {
      try { 
        const response = await CartService.RemoveFromCart(cartId);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
      clearCart: (state) => {
        state.cart = null;
        state.error = null;
        state.success = false;
        state.message = "";
      },
    },
    extraReducers: (builder) => {
      builder
        // Add to cart
        .addCase(addToCart.pending, (state) => {
          state.isLoading = true;
          state.error = null;
          state.success = false;
          state.message = "";
        })
        .addCase(addToCart.fulfilled, (state, action) => {
          state.isLoading = false;
          state.success = true;
          state.message = "Item added to cart successfully!";
          state.cart =  !state.cart?[action.payload.newCartItem]:[...state.cart,action.payload.newCartItem];
        })
        .addCase(addToCart.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action?.payload?.error || "Failed to add to cart";
        })
  
        // Update cart (quantity)
        .addCase(updateCart.pending, (state) => {
          state.isLoading = true;
          state.error = null;
          state.success = false;
          state.message = "";
        })
        .addCase(updateCart.fulfilled, (state, action) => {
          state.isLoading = false;
          state.success = true;
          state.message = "Cart updated successfully!";

        //   state.cart = action.payload.cartItem;
          const updatedCartItem = action.payload.cartItem;
          // Find index of the existing item in the cart
          const index = state.cart.findIndex(
            (item) => item.productDtlId === updatedCartItem.productDtlId
          );
          if (index !== -1) {
            // Replace the old item with the updated one
            state.cart[index].quantity = updatedCartItem?.quantity;
          } else {
            state.cart.push(updatedCartItem);
          }
        })
        .addCase(updateCart.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload.error || "Failed to update cart";
        })
  
        // Get cart
        .addCase(getCart.pending, (state) => {
          state.isLoading = true;
          state.error = null;
          state.message="";
          state.success = false;
        })
        .addCase(getCart.fulfilled, (state, action) => {
          state.isLoading = false;
          state.success = true;
          state.cart = action.payload;
        })
        .addCase(getCart.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action?.payload?.error || "Failed to fetch cart";
          state.cart = null;
        })
  
        // Delete cart item
        .addCase(deleteCart.pending, (state) => {
          state.isLoading = true;
          state.error = null;
          state.success = false;
        })
        .addCase(deleteCart.fulfilled, (state, action) => {
          state.isLoading = false;
          state.success = true;
          state.message = "Item removed from cart successfully!";
          state.cart = state?.cart?.filter((val)=>val?.cartId !==action.payload.cartId)
        })
        .addCase(deleteCart.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action?.payload?.error || "Failed to remove item from cart";
        });
    },
  });
  
  export const { clearCart } = cartSlice.actions;
  export default cartSlice.reducer;