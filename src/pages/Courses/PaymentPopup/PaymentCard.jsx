import React, { useState, useEffect } from "react";
import Button from "../../../components/Button";
import logo from "../../../assets/icon_3_blue.png";
import axios from "axios";
import toast from "react-hot-toast";
import { RazorPayIcon } from "../../../components/icons";

const PaymentCard = ({ course, onClose, isOpen }) => {
  const createOrder = async (courseId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/payment/createOrder/${courseId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (error) {
      console.error("Error fetching order details:", error);
      alert("Failed to fetch order details. Please try again.");
      return null;
    }
  };

  const handlePayment = async () => {
    const orderDetails = await createOrder(course.id);
    if(orderDetails.free){
      window.location.reload();
      toast.success("Succesfully enrolled into the course!");
      return;
    }

    if (!orderDetails) return;

    const options = {
      key: `${import.meta.env.VITE_RZP_KEY_ID}`,
      amount: orderDetails.amount,
      currency: "INR",
      order_id: orderDetails.order_id,
      handler: async function (response) {
        try {
          const paymentData = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            courseId: course.id,
          };

          const paymentVerificationResponse = await axios.post(
            `${import.meta.env.VITE_API_URL}/payment/verify`,
            paymentData
          );

          if (paymentVerificationResponse.status === 200) {
            console.log("Payment Successful and User Enrolled!");
            toast.success("Succesfully enrolled into the course!");
            window.location.reload();
            onClose();
          } else {
            toast.error("Payment verification failed!");
          }
        } catch (error) {
          console.error("Payment verification failed:", error);
          toast.error("Payment verification failed!");
        }
      },
      theme: {
        color: "#1E88E5",
      },
    };

    if (window.Razorpay) {
      const rzp1 = new window.Razorpay(options); 

      rzp1.on("payment.failed", function (response) {
        console.log("Payment Failed!");
        toast.error("Payment Failed! Please try again.");
        console.error(response.error);
      });

      rzp1.open(); 
    } else {
      console.log("Razorpay SDK failed to load!");
    }
  };

  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    if (!course.thumbnail) {
      return;
    }
    const fetchThumbnail = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/get/image/${course.thumbnail.toString()}`
        );
        setThumbnail(`data:${response.data.type};base64,${response.data.data}`);
      } catch (error) {
        console.error("Error fetching thumbnail:", error);
      }
    };

    fetchThumbnail();
  }, [course.thumbnail]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isOpen]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="w-[90%] max-w-md bg-white rounded-xl shadow-lg overflow-hidden relative"
        onClick={(e) => e.stopPropagation()} 
      >
        <button
          onClick={onClose}
          className="absolute top-1 right-3 text-gray-400 hover:text-gray-700 text-4xl"
        >
          &times;
        </button>
        <div className="">
          <div className="w-full bg-slate-50 border border-b-2 p-3">
            <div className="ml-auto mr-auto sm:aspect-video h-40 rounded-lg overflow-hidden">
              {thumbnail ? (
                <img
                  src={thumbnail}
                  alt={course.title}
                  className="w-full rounded-lg h-full object-contain"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <img
                    src={logo}
                    alt={course.title}
                    className="w-full h-full object-contain "
                  />
                </div>
              )}
            </div>
          </div>
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800 truncate">
                {course.title}
              </h2>
              <p className="text-xl font-bold text-green-500">
                {course.price === 0 ? "Free" : `₹${course.price}`}
              </p>
            </div>

            <p className="text-sm text-gray-600 line-clamp-2">
              {course.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              {course.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-6">
              <Button onClick={handlePayment}>
                {course.price === 0 ? (
                  "Enroll for Free"
                ) : (
                  <>
                    Proceed to Payment
                    <RazorPayIcon/>
                    
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PaymentCard;
