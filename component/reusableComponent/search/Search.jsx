
import React, { useEffect, useState } from "react";
import "./search.css"
import ProductsDtlServices from "@/services/ProductsDtlServices";
import { useRouter } from "next/navigation";
const Search = () => {
  const [open, setOpen] = useState(false);
  const [queryes, setquery] = useState('');
  const [searchProduct, setSearchProduct] = useState([]);
  const router = useRouter()

  const handleSearch = (e) => {
    const query = e.target.value;
      setquery(query);
      if (query.length >= 2) {
      setOpen(true);
    } else {
      setOpen(false);
      // setquery('');
    }
  };

  const handleGetProduct = async (val) => {
    try {
      const searchResult = await ProductsDtlServices.getProductsDtl({ page: 1, search: val });
      setSearchProduct(searchResult?.data?.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setSearchProduct([]);
      setOpen(false);
    }
  };

  const handlegoSingleProduct = (slug) => {
    router.push(`/product/${slug}`)
    setOpen(false);
    setquery('');

  };


  useEffect(() => {
    handleGetProduct(queryes)
  }, [queryes])

  useEffect(() => {
    const handleScroll = () => {
      setOpen(false);
      setquery("")
    };

    // Add scroll event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  

  return (
    <div className="w-100 position-relative">
      <input
        type="search"
        className="form-control"
        value={queryes}
        onChange={handleSearch}
        placeholder="Search for Products ..."
      />
      {open &&
        <div className="search_list_wrapper">
          {searchProduct?.map((ele, i) => (
            <p onClick={() => handlegoSingleProduct(ele?.slug)}>{ele?.productDtlName}</p>
          ))}
        </div>
      }
    </div>
  );
};

export default Search;

