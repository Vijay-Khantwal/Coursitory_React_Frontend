import React, { useEffect, useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import axios from "axios";
import Button from "../Button";

const ReviewList = ({ courseId }) => {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (!courseId) return;
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/reviews/get/${courseId}?page=${page}&size=3` // Page size set to 2
        );
        setHasMore(response.data.page.number + 1 !== response.data.page.totalPages);
        setReviews(response.data._embedded.reviewList);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [courseId, page]);

  return (
    <div className="mt-6 space-y-4">
      <h3 className="text-xl font-semibold text-gray-700">Reviews</h3>
      <hr />
      {reviews.length === 0 && <p>No reviews yet</p>}
      {reviews.map((review) => (
        <div
          key={review.reviewId}
          className="p-4 pt-3 rounded-sm border-b-2 border-b-black"
        >
          <div className="w-full gap-6 flex flex-row">
            <p className="text-lg font-semibold text-gray-800">
              @{review.username}
            </p>
            <p className="text-xs text-gray-500 ml-auto">
              {new Date(review.date).toLocaleDateString()}
            </p>
          </div>
          <div className="mt-3">
            <StarRating rating={review.rating} />
          </div>
          <ReviewComment comment={review.comment} />
        </div>
      ))}

      {/* Pagination Navigation */}
      <div className="max-w-sm ml-auto flex gap-6 mt-4">

        <Button disabled={page===0} onClick={()=>setPage((prev) => Math.max(prev-1,0))}>{"< "}Previous</Button>
        <Button disabled={!hasMore} onClick={() => setPage((prev)=>(hasMore?prev+1:prev))}>Next{" >"}</Button>
      </div>
    </div>
  );
};

const ReviewComment = ({ comment }) => {
  const [showFull, setShowFull] = useState(false);

  return (
    <div>
      <p
        className={`mt-2 text-gray-700 break-words ${
          showFull ? "" : "line-clamp-3"
        }`}
      >
        {comment}
      </p>
      {comment.split("\n").length > 3 && (
        <button
          onClick={() => setShowFull(!showFull)}
          className="text-blue-800 mt-2 hover:underline"
        >
          {showFull ? "Read Less" : "Read More"}
        </button>
      )}
    </div>
  );
};

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating); // Number of full stars
  const hasHalfStar = rating % 1 !== 0; // Check if there's a half star
  const emptyStars = 5 - Math.ceil(rating); // Remaining empty stars

  return (
    <div className="flex items-center space-x-1 text-yellow-600">
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={`full-${index}`} />
      ))}
      {hasHalfStar && <FaStarHalfAlt />}
      {[...Array(emptyStars)].map((_, index) => (
        <FaRegStar key={`empty-${index}`} />
      ))}
    </div>
  );
};

export default ReviewList;
