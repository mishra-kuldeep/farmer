import React from "react";

const cardArr = [
  {
    id: 1,
    title: "Agriculture Land",
    image:
      "https://plus.unsplash.com/premium_photo-1661900547591-80ee79e20d1c?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YWdyaWN1bHR1cmFsJTIwbGFuZHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 2,
    title: "Plot",
    image:
      "https://images.unsplash.com/photo-1587745890135-20db8c79b027?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bGFuZCUyMHBsb3R8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 3,
    title: "Farm Land",
    image:
      "https://images.pexels.com/photos/259280/pexels-photo-259280.jpeg?cs=srgb&dl=pexels-pixabay-259280.jpg&fm=jpg",
  },
];

const cardArr2 = [
  {
    id: 1,
    title: "Cold Storage",
    image:
      "https://www.refconchillers.com/blog/wp-content/uploads/2024/02/industrial-cold-storage-refcon-chillers-india-1200x675.jpg",
  },
  {
    id: 2,
    title: "Machinery",
    image:
      "https://i.pinimg.com/originals/b1/cf/4c/b1cf4ca4161c1a77d76af93bd8896ec5.jpg",
  },
];

const Section3Home = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          {/* ////////////  Farm Land service   ///////////////// */}
          <div className="col-md-7 pr-2 ">
            <div style={{backgroundColor:"#f2f2f2"}} className="rounded mt-3 border p-3">
              <h5 className="mobilehome_title">Farm Land Services</h5>
            <div className="row overflowhiddenbutscroll " >
              {cardArr.map((ele, i) => (
                <div className="col-md-4 col-5  mb-3 px-2 px-md-3 " key={ele.id}>
                  <div className="section2cardHome shadowcss">
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
          {/* ////////////  vender service   ///////////////// */}
          <div className="col-md-5 pl-2 ">
          <div style={{backgroundColor:"#f2f2f2"}} className="rounded mt-3 border p-3">
          <h5 className="mobilehome_title">Vendor Services</h5>
            <div className="row overflowhiddenbutscroll">
              {cardArr2.map((ele, i) => (
                <div className="col-md-6 col-6  mb-3 px-2 px-md-3" key={ele.id}>
                  <div className="section2cardHome shadowcss">
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
        </div>
      </div>
    </>
  );
};

export default Section3Home;
