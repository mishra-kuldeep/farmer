import CategoryServices from "@/services/CategoryServices";
import React, { useEffect, useState } from "react";
import "../admin/adminpage.css";
import IconButton from "../reusableComponent/IconButton";
import { GrOverview } from "react-icons/gr";
import Pagination from "../reusableComponent/Pagination";
import ProductModal from "../reusableComponent/ProductModal";
import OrderService from "@/services/Orderservices";
import OrderModal from "../reusableComponent/OrderModel";

const AllOrders = () => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [metaData, setmetaData] = useState(false);
  const [allPendingOrder, setAllPendingOrders] = useState([]);

  const [modalData, setModalData] = useState("");
  const [actionPerformed, setActionPerformed] = useState(false);

  useEffect(() => {
    OrderService.getOrderAdmin({
      name: "All",
      page: page,
      search: searchText,
    })
      .then(({ data }) => {
        setAllPendingOrders(data?.data);
        setmetaData(data?.meta);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page, searchText, actionPerformed]);
  return (
    <div className="p-2">
      <Pagination
        page={page}
        setPage={setPage}
        searchText={searchText}
        setSearchText={setSearchText}
        List={allPendingOrder}
        metaData={metaData}
        searchShow={true}
      />


      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Customer name</th>
            <th className="text-center">Mobile No</th>
            <th className="text-center">Email</th>
            <th className="text-center">Total Amount</th>
            <th className="text-center">Order Date</th>
            <th className="text-center">Review Date</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        {allPendingOrder?.length > 0 && (
          <tbody>
            {allPendingOrder?.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{item?.User?.FirstName}</td>
                  <td className="text-center">
                    {item?.User?.Phone ? item?.User?.Phone : "---"}
                  </td>
                  <td className="text-center">
                    {item?.User?.Email}

                  </td>
                  <td className="text-center">
                    {item?.totalAmount}
                  </td>
                  <td className="text-center">{item?.orderDate.slice(0, 10)}</td>
                  <td className="text-center">
                    {item?.adminReviewDate?.slice(0, 10)}
                  </td>

                  <td>
                    {item?.adminReview == "Pending" &&
                      <div className="d-flex gap-2 justify-content-center">
                        <div
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          style={{
                            height: "30px",
                            width: "30px",
                            borderRadius: "50%",
                          }}
                        >

                          < IconButton onClick={() => setModalData(item?.orderId)}>
                            <GrOverview color="green" size={20} />
                          </IconButton>
                        </div>
                        <OrderModal
                          modalData={modalData}
                          // brandList={brandList}
                          // categoryList={categoryList}
                          // subCategoryList={subCategoryList}
                          setActionPerformed={setActionPerformed}
                        />
                      </div>
                    }
                  </td>
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
      {
        allPendingOrder?.length == 0 && (
          <div
            className=" centerAllDiv fs-5 text-secondary "
            style={{ height: "50vh" }}
          >
            <h6>No Products Found</h6>
          </div>
        )
      }
    </div >
  );
};

export default AllOrders;
