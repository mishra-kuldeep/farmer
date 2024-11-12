
"use client"
import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import "./adsCategory.css"
import "../adverts/[...slug]/adverts.css"
import RentServices from '@/services/RentService';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

const page = () => {
    const user = useSelector((state) => state.auth);
    const country = useSelector((state) => state.country);
    const [categoryList, setCategoryList] = useState([]);
    const router = useRouter()


    const goNextPage = (id) => {
        router.push(`/adverts/${id}`)
    }

    useEffect(() => {
        RentServices?.getRentCategory()
            .then(({ data }) => {
                // setSelectedCategory(slug[0]);
                setCategoryList(data);
            })
            .catch((e) => console.log(e));
    }, [user?.profile?.country, country?.country?.countryId]);
    const categoryimg = [
        'https://www.farmersmarket.ie/media/gpzhgfut/istock-91580444.jpg?anchor=center&mode=crop&width=250&height=225&rnd=132931996245270000',
        'https://www.farmersmarket.ie/media/t40nlet2/thompson-dairy-farm-7727.jpeg?anchor=center&mode=crop&width=250&height=225&rnd=132906087644530000',
        'https://www.farmersmarket.ie/media/4zslqhgn/page-3_.jpeg?anchor=center&mode=crop&width=250&height=225&rnd=132836312616970000',
        'https://www.farmersmarket.ie/media/no1bibzu/land-3.jpeg?anchor=center&mode=crop&width=250&height=225&rnd=132906087516570000',
        'https://www.farmersmarket.ie/media/fwvfbblx/ballingarde-land-ariel.jpeg?anchor=center&mode=crop&width=250&height=225&rnd=132839746492070000',
        'https://www.farmersmarket.ie/media/kobfaext/ifj-shanballymore-11.jpeg?anchor=center&mode=crop&width=250&height=225&rnd=132906089152770000',
        'https://www.farmersmarket.ie/media/bmrdoyhq/amazone-spreader-zav-2021-deutz-3-1.jpg?anchor=center&mode=crop&width=250&height=225&rnd=132931105464570000'


    ]
    return (
        <div className='container pt-3'>
            <div className="search_wrapper mb-3">
                <input
                    type="text"
                    placeholder="Search categories..."
                // onChange={handleInputChange}
                // value={searchTerm}
                />
                <button
                // onClick={handleSearch}
                >
                    <FaSearch color="#fff" />
                </button>
            </div>
            <div className=' rounded py-3' style={{ border: "5px solid #ddd" }}>
                <div className='d-flex justify-content-between mb-3 px-3'>
                    <h5>All categories</h5>
                    <p><u>View all ads</u></p>
                </div>

                <div className='adsCatogryWrapper'>
                    {categoryList.map((category, index) => (
                        <div className='adsCategory' key={index} onClick={() => goNextPage(category?.rentCategoryId)}>
                            <div className='imageWrapperAdd'>
                                <img src={categoryimg[index]} />
                            </div>
                            <h6><u>{category?.name}</u></h6>
                        </div>))}
                </div>
            </div>
        </div>
    )
}

export default page