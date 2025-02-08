import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "../Button";
import StarRating from "../StarRating";

const ReviewList = ({ courseId, refresh }) => {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (!courseId) return;
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/reviews/get/${courseId}?page=${page}&size=3`
        );
        setHasMore(
          response.data.page.number + 1 < response.data.page.totalPages
        );
        setReviews(response.data._embedded.reviewList);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [courseId, page, refresh]);

  return (
    <div className="mt-6 space-y-4">
      <h3 className="text-xl font-semibold text-gray-700">Reviews</h3>
      <hr className="border-gray-400" />
      {reviews.length === 0 && <p>No reviews yet</p>}
      {reviews.map((review) => (
        <div
          key={review.reviewId}
          className="p-4 pt-3 rounded-sm border-b-2 border-b-gray-200"
        >
          <div className="w-full gap-6 flex flex-row">
            <p className="text-lg font-semibold text-gray-800">
              @{review.username}
            </p>
            <p className="text-xs text-gray-500 ml-auto">
              {new Date(review.date).toLocaleDateString()}
            </p>
          </div>
          <div className="mt-3 flex gap-1">
            <StarRating rating={review.rating} colour={"#d69e2e"} />
          </div>
          <ReviewComment comment={review.comment} />
        </div>
      ))}

      <div className="max-w-sm ml-auto flex gap-6 mt-4">
        <Button
          disabled={page === 0}
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
        >
          {"< "}Previous
        </Button>
        <Button
          disabled={!hasMore}
          onClick={() => setPage((prev) => (hasMore ? prev + 1 : prev))}
        >
          Next{" >"}
        </Button>
      </div>
    </div>
  );
};

const ReviewComment = ({ comment }) => {
  const [showFull, setShowFull] = useState(false);
  const MAX_LENGTH = 400;
  const displayedComment = showFull
    ? comment
    : comment.slice(0, MAX_LENGTH) + (comment.length > MAX_LENGTH ? "..." : "");

  return (
    <div>
      <p className="mt-2 text-gray-700 break-words">{displayedComment}</p>
      {comment.length > MAX_LENGTH && (
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

export default ReviewList;
