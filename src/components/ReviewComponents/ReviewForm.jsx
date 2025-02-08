import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../Button";
import toast from "react-hot-toast";
import { EmptyStar, FullStar } from "../Icons";

const ReviewForm = ({ courseId, onReviewSubmitted, existingReview }) => {
  const [newRating, setNewRating] = useState(existingReview?.rating || 0);
  const [comment, setComment] = useState(existingReview?.comment || "");

  const handleClick = (value) => {
    setNewRating(value);
  };

  useEffect(() => {
    setNewRating(existingReview?.rating || 0);
    setComment(existingReview?.comment || "");
  }, [existingReview, courseId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      if (
        existingReview?.rating === newRating &&
        comment === existingReview?.comment
      ) {
        toast.error("Update review before submitting");
        return;
      }
      const rating = newRating;
      const reviewData = { rating, comment };
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/reviews/add/${courseId}`,
        reviewData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onReviewSubmitted(response.data);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-[800px] mr-auto space-y-4 p-6 bg-white rounded-lg shadow-md"
    >
      <h3 className="text-xl font-semibold text-gray-700">
        {existingReview ? "Update" : "Post"} Your Review
      </h3>

      <div className="flex items-center space-x-2">
        <label className="text-sm text-gray-600">Rating :</label>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <div
              key={value}
              className="cursor-pointer scale-125"
              onClick={() => handleClick(value)}
            >
              {newRating >= value ? (
                <FullStar colour="#d69e2e" />
              ) : (
                <EmptyStar colour="#cbd5e0" />
              )}
            </div>
          ))}
        </div>
      </div>
      <div>
        <label className="text-sm text-gray-600">Comment:</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review..."
          required
          className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <Button type={"submit"}>Submit</Button>
    </form>
  );
};

export default ReviewForm;
