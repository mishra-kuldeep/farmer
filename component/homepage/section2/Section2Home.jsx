"use client"
import React from "react";
import "./section2Home.css";
import { useRouter } from "next/navigation";
const cardArr = [
  {
    id: 1,
    title: 'Farmer',
    goesTo:"",

    image:
      'https://i.pinimg.com/474x/5e/7c/07/5e7c07a78fb76a9066bbfa410458b849.jpg',
  },
  {
    id: 2,
    title: 'Farm Land',
    goesTo:"/adverts/16",

    image:
      'https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  },
  {
    id: 3,
    title: 'Buyer',
    goesTo:"",

    image:
      'https://img.freepik.com/premium-photo/black-friday-banner-shopping-cart-with-paper-bags-pile-clothes-background-internet-buyer-final-sale-online-store-copy-space_1021941-3909.jpg',
  },
  {
    id: 4,
    title: 'Vender',
    goesTo:"/vender/4",

    image:
      'https://stockarea.io/blogs/wp-content/uploads/2021/07/5-1024x1024.png',
  },
  {
    id: 5,
    title: 'Transportation',
    goesTo:"/transporter/1",

    image:
      'https://4.imimg.com/data4/KJ/BY/MY-14831048/john-deere-5050d-tractor.jpg',
  },
  {
    id: 6,
    title: 'Fertilizers & Pesticides',
    goesTo:"/fertilizers-pesticides/1",
    image:
      'https://static.vecteezy.com/system/resources/previews/010/508/297/non_2x/old-farmers-spray-fertilizer-or-chemical-pesticides-in-the-rice-fields-chemical-fertilizers-free-photo.jpg',
  },
  {
    id: 7,
    title: 'Ads',
    goesTo:"/ads-category",
    image:
      'https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y293c3xlbnwwfHwwfHx8MA%3D%3D',
  },
];

const Section2Home = () => {
  const router = useRouter()
  return (
    <div className="container">
      <div className="p-md-3 p-1 my-3 rounded" style={{ backgroundColor: "#f2f2f2" }}>
        <div className="section2Heading">
          <h5>All Services</h5>
        </div>
          <div className="row overflowhiddenbutscroll m-0 pb-3">
            {cardArr.map((ele, i) => (
              <div className="col-md-2 col-5 p-md-3 p-1" key={ele.id} >
                <div className="section2cardHome shadowcss" onClick={()=>router.push(ele?.goesTo)}>
                  <div className="image_div">
                    <img src={ele.image} alt="product image" />
                  </div>
                  <div className="section2cartTitle">
                    <span className="fw-bold">{ele.title}</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Section2Home;
