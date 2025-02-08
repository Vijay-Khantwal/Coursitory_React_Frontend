import React, { useEffect, useState } from "react";
import axios from "axios";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";

const CourseReview = ({ courseId, isEnrolled }) => {
  const [hasReviewed, setHasReviewed] = useState(false);
  const [existingReview, setExistingReview] = useState(null);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    if (!courseId) return;
    const checkIfUserReviewed = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/reviews/${courseId}/has-reviewed`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data) {
          setHasReviewed(true);
          setExistingReview(response.data);
        }
        // console.log("User has reviewed:", response.data);
    } catch (error) {
          setHasReviewed(false);
          setExistingReview(null);
        // console.error("Error checking if user reviewed:", error);
      }
    };
    checkIfUserReviewed();
  }, [courseId]);

  const handleReviewSubmitted = (newReview) => {
    setHasReviewed(true);
    setExistingReview(newReview);
    setRefresh(refresh+1);
  };

  return (
    <div className="bg-gray-50 mx-auto p-4">
      <div className="bg-gray-50 rounded-lg">
        {isEnrolled ? (
          !hasReviewed ? (
            <ReviewForm
              existingReview={null}
              courseId={courseId}
              onReviewSubmitted={handleReviewSubmitted}
            />
          ) : (
            <ReviewForm
              existingReview={existingReview}
              courseId={courseId}
              onReviewSubmitted={handleReviewSubmitted}
            />
          )
        ) : (
          "Enroll to review this course"
        )}
      </div>

      <ReviewList refresh={refresh} courseId={courseId} />
    </div>
  );
};

export default CourseReview;
