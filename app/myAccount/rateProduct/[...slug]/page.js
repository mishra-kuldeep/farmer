"use client";
import { useEffect, useState } from 'react';
import './rateProduct.css';
import ProductRateServices from '@/services/ProductRateServices';
import { FaStar } from 'react-icons/fa';
import { Image_URL } from '@/helper/common';
import toast from 'react-hot-toast';
import { useParams } from "next/navigation";
const RateProduct = () => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [reviewId, setreviewId] = useState(null);
    const [productDetail, setProductDetail] = useState({});
    const [ratingDetail, setRatingDetail] = useState([]);
    const { slug } = useParams();

    const handleStarClick = (starIndex) => {
        setRating(starIndex + 1); // Update the rating based on the clicked star
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        const data = { rating, reviewText: review, productDtlId: slug }
        if (ratingDetail.length === 0) {
            ProductRateServices.addRate(data)
                .then(({ data }) => {
                    // setOrderedList(data?.data);
                    toast('Thank you so much. Your review has been saved', {
                        icon: "👏",
                        style: {
                            borderRadius: "10px",
                            background: "green",
                            color: "#fff",
                        },
                    });
                })
                .catch((err) => console.log(err));
        } else {
            ProductRateServices.UpdateRate(reviewId, data)
                .then(({ data }) => {
                    toast('Thank you so much. Your review has been saved', {
                        icon: "👏",
                        style: {
                            borderRadius: "10px",
                            background: "green",
                            color: "#fff",
                        },
                    });
                })
                .catch((err) => console.log(err));
        }
    };

    useEffect(() => {
        // Fetch the rating and review data from the API
        ProductRateServices.getRate(slug)
            .then(({ data }) => {
                console.log(data)
                setProductDetail(data?.data);
                setreviewId(data?.data?.ProductReviews[0]?.reviewId);
                setRatingDetail(data?.data?.ProductReviews[0]);
                setRating(data?.data?.ProductReviews[0]?.rating);
                setReview(data?.data?.ProductReviews[0]?.reviewText);
                // setLoader(false);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="rate-container bg-white">
            <div className='border bg-white rounded p-3 d-flex  justify-content-between align-items-center'>
                <h5>Ratings & Reviews</h5>
                <div className='d-flex gap-4 justify-content-between align-items-center'>
                    <div className=''>
                        <h6>{productDetail?.productDtlName}</h6>
                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <div className="rating_wrap mt-1">
                                <p className="centerAllDiv rating">
                                    <span className="fw-bold">{productDetail?.averageRating}</span>
                                    <FaStar size={10} className="ms-1" />
                                </p>
                                <span className="rating_unit">
                                    {productDetail?.numberOfRatings} Ratings
                                </span>
                            </div>
                        </div>
                    </div>
                    {productDetail?.ProductsImages && productDetail?.ProductsImages.length > 0 &&
                        <img src={`${Image_URL}/products/${productDetail?.ProductsImages[0]?.url}`} height="50px" width="50px" className='rounded-50' />
                    }
                </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <form className="rate-form w-100" onSubmit={handleSubmit}>
                    <div className='bg-white p-3'>
                        <h5>Rate Your Purchase</h5>
                        <div className="star-rating">
                            {[...Array(5)].map((_, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    className={`star-btn ${index < rating ? 'active' : ''}`}
                                    onClick={() => handleStarClick(index)}
                                >
                                    ★
                                </button>
                            ))}
                        </div>
                    </div>
                    <textarea
                        className="comment-area w-100"
                        placeholder="Share your experience..."
                        value={review}
                        rows={10}
                        onChange={(e) => setReview(e.target.value)} // Update review state
                    ></textarea>
                    <div className='d-flex justify-content-end'>
                        <button type="submit" className="submit-btn">Submit Review</button>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default RateProduct;
