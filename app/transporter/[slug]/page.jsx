"use client"
import React, { useEffect, useState } from 'react'
import "./transporter.css"
import "../../adverts/[...slug]/adverts.css"
import { FaSearch } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { VscCircleLargeFilled } from "react-icons/vsc";
import VehicleMasterServices from '@/services/VehicleMasterServices';
import VehicleServices from '@/services/VehicleServices';
import { useSelector } from 'react-redux';
import { useParams } from "next/navigation";

const Page = () => {

    const user = useSelector((state) => state.auth);
    const country = useSelector((state) => state.country);
    const [category, setCategory] = useState([])
    const [location, setLocation] = useState("")
    const { slug } = useParams();
    const [categorryFilter, setCategoryFilter] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [transport, setTransportList] = useState([])
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter()

    const handleCategoryChange = (rentCategoryId) => {
        setSelectedCategory(rentCategoryId);
        setSearchTerm("");
    };
    const handleSearch = () => {
        apiCallTransAds()
    }
    const handleLocation = (e) => {
        setLocation(e.target.value)
    }
    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);

    }
    const Navigate = (transVechicalId) => {
        router.push(`/transporter/details/${transVechicalId}`)
    }
    const initApi = () => {
        VehicleMasterServices.getVehicle()
            .then(({ data }) => {
                setCategory(data)
                console.log(data)
            }).catch((err) => console.log(err))
    }

    const apiCallTransAds = () => {
        const data = {
            country: user?.profile?.country || country?.country?.countryId,
            search: searchTerm,
            zip: location
        }
        VehicleServices.getAllTransportByVehicalId((selectedCategory || slug), data).then(({ data }) => {
            console.log("data")
            setTransportList(data?.data)
        }).catch((err) => {
            console.log(err)
            setTransportList([])
        })
    }
    useEffect(() => {
        apiCallTransAds()
        
    }, [user?.profile?.country, country?.country?.countryId, selectedCategory, location])

    useEffect(() => {
        initApi()
        setSelectedCategory(slug)
    }, [user?.profile?.country, country?.country?.countryId])

    return (
        <div>
            <div>
                <div className="container pt-1">
                    <div className=" py-1">
                        <div className="search_wrapper my-4">
                            <input
                                type="text"
                                placeholder="Search by company name..."
                                onChange={handleInputChange}
                                value={searchTerm}
                            />
                            <button onClick={handleSearch}>
                                <FaSearch color="#fff" />
                            </button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3">
                            <div className="filterSection">
                                <h6>Filter</h6>
                                <hr className="m-0 my-2 p-0" />
                                <div>
                                    <div>
                                        <input className='locationInput' type="text"
                                            value={location}
                                            onChange={handleLocation}
                                            placeholder='Search by pin/Postal Code...' />
                                    </div>
                                    <div
                                        className="d-flex justify-content-between cursor"
                                        onClick={() => setCategoryFilter(!categorryFilter)}
                                    >

                                        <h6 className='my-2'>Category</h6>
                                        <span>{categorryFilter ? "-" : "+"}</span>
                                    </div>
                                    {categorryFilter && (
                                        <div className="px-2">
                                            {category.map((category, index) => (
                                                <div
                                                    key={index}
                                                    className={`${selectedCategory == category?.vehicleId &&
                                                        "filterSELECTED"
                                                        } filterHover mb-1 p-1`}
                                                    onClick={() =>
                                                        handleCategoryChange(category?.vehicleId)
                                                    }
                                                >
                                                    {selectedCategory == category?.vehicleId ? (
                                                        <VscCircleLargeFilled
                                                            size={22}
                                                            color="var(--mainColor)"
                                                        />
                                                    ) : (
                                                        <VscCircleLargeFilled size={22} color="#dadada" />
                                                    )}
                                                    <label className="ms-2">{category?.type}</label>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className='col-md-9'>
                            <div className="d-flex justify-content-between">
                                <h3 className='my-2'> Ads For Booking</h3>
                            </div>

                            <div className='row'>
                                {
                                    transport.map((item, id) => {
                                        console.log(item)
                                        return (
                                            <div className="col-md-6 col-lg-4" onClick={() => Navigate(item.transVehicalId)}>
                                                <div className="servicevendercard">
                                                    <img
                                                        src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
                                                        style={{ backgroundColor: "#dadada" }}
                                                        width="100%"
                                                    />
                                                    <div className="p-2">
                                                        <h5 className="my-2">{item?.TransportVehicle?.type}</h5>
                                                        <h6 style={{ fontSize: "13px" }}>
                                                            Name -  {item?.User.FirstName}
                                                        </h6>
                                                        <h6 style={{ fontSize: "13px" }}>

                                                            {/* Capacity - {item?.capacity}{" "} */}
                                                            {/* {item?.ProductUnit?.unitName} */}
                                                        </h6>
                                                        <h6 style={{ fontSize: "13px" }}>
                                                            {/* Duration - {item?.duration} */}
                                                        </h6>
                                                        <p
                                                            style={{
                                                                color: "grey",
                                                                fontSize: "12px",
                                                                margin: "10px 0px 10px 0px",
                                                                // cursor:""
                                                            }}
                                                            data-bs-toggle="tooltip"
                                                            data-bs-placement="bottom"
                                                        // title={item?.description}
                                                        >

                                                        </p>
                                                    </div>
                                                    <div className="d-flex justify-content-between">
                                                        <p style={{ fontSize: "12px" }}>
                                                            <span className='transporterParagraph'>Company Name</span> <br />

                                                            {item?.User?.userInfo?.CompanyName}
                                                        </p>

                                                    </div>
                                                    <div className="d-flex justify-content-between">
                                                        <p style={{ fontSize: "12px" }}>
                                                            <span className='transporterParagraph'>Pincode</span> <br />

                                                            {item?.User?.userInfo?.Zip}
                                                        </p>
                                                        <p className="venderservicephone">
                                                            {item?.User?.Phone}
                                                        </p>

                                                    </div>

                                                </div>
                                            </div>
                                        )
                                    })
                                }


                            </div>
                        </div>
                        {/* {VendorList?.map((item, i) => ( */}

                        {/* ))} */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page