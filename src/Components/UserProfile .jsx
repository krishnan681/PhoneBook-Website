import React, { useEffect, useState } from "react";
import { useAuth } from "./Auth";
import "../Css/UserProfile.css";


const UserProfile = () => {
  const [details, setDetails] = useState({});
  const [error, setError] = useState("");
  const { userData } = useAuth();
  const date = new Date().toISOString().split("T")[0];
  const [modalData, setModalData] = useState(null); // State to manage modal data
  const [isModalOpen, setIsModalOpen] = useState(false); // State to toggle modal

  const fetchData = async () => {
    try {
      if (!userData?.id || !date) {
        setError("Please provide a valid ID and Date.");
        return;
      }

      const response = await fetch(
        `https://signpostphonebook.in/data_entry_details.php?id=${userData.id}&date=${date}`
      );

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === "success") {
        setDetails(data.data);
        setError(""); // Clear any previous errors
      } else {
        setError(data.message || "Failed to fetch details.");
      }
    } catch (error) {
      setError(error.message || "Something went wrong.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (coupon) => {
    setModalData(coupon);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalData(null);
    setIsModalOpen(false);
  };

  return (
    <div className="user-profile">
      <div className="profile-banner">
        <div className="profile-banner-overlay">
          {/* <button className="member-btn">Member's Added</button> */}
          <div className="profile-picture-container">
            <img
              src="../assets/images/book_logo.png"
              alt=""
              className="profile-picture"
            />
            <button className="edit-picture-btn">📷</button>
          </div>
        </div>
      </div>
      <div className="profile-details">
        <h1 className="profile-name">{userData.businessname}</h1>
        <p className="profile-description">{userData.product}</p>
        <p className="profile-id">ID: {userData.id}</p>
        <div className="profile-stats" style={{display:"flex", justifyContent:"center"}}>
          <h3>Counts: {details.count || "No entries today..."}</h3>
        </div>
        <div className="coupon-section">
          <h2>Coupons</h2>
          <div className="coupon-cards">
            {[...Array(4)].map((_, index) => {
              // Define unique descriptions, codes, and valid dates for each card
              const couponDetails = [
                {
                  title: "Flat 20% Off",
                  description:
                    "Get 20% off on all rides within the city using HDFC Credit Card.",
                  code: "STEALDEAL20",
                  validTill: "20th Jan, 2025",
                  backgroundImage: "{../assets/images/coupn1.png}", // Example background image
                },
                {
                  title: "Buy 1 Get 1 Free",
                  description:
                    "Buy one coffee and get another free at participating outlets.",
                  code: "COFFEELOVE",
                  validTill: "15th Feb, 2025",
                  backgroundImage: "../assets/images/coupon-2.png", // Example background image
                },
                {
                  title: "50% Off on Electronics",
                  description:
                    "Get 50% off on selected electronics using ICICI Debit Card.",
                  code: "ELEC50",
                  validTill: "10th March, 2025",
                  backgroundImage: "../assets/images/coupon-3.png", // Example background image
                },
                {
                  title: "Free Delivery",
                  description:
                    "Enjoy free delivery on your next 5 orders with this code.",
                  code: "FREEDEL",
                  validTill: "30th Jan, 2025",
                  backgroundImage: "../assets/images/coupon-4.png", // Example background image
                },
              ];

              const { title, description, code, validTill, backgroundImage } =
                couponDetails[index];

              return (
                <div
                  key={index}
                  className="coupon-card"
                  style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  onClick={() =>
                    openModal({
                      title,
                      description,
                      code,
                      validTill,
                    })
                  }
                >
                  {/* Optional: Add overlay or additional content */}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && modalData && (
        <div className="modal">
          <div className="modal-content coupon-card">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <img
              src="../assets/images/book_logo.png"
              alt="Coupon Logo"
              className="logo"
            />
            <h3>{modalData.title}</h3>
            <p>{modalData.description}</p>
            <div className="coupon-row">
              <span id="cpnCode">{modalData.code}</span>
              <button
                id="cpnBtn"
                onClick={() => {
                  navigator.clipboard.writeText(modalData.code);
                  document.getElementById("cpnBtn").innerText = "COPIED";
                  setTimeout(() => {
                    document.getElementById("cpnBtn").innerText = "COPY CODE";
                  }, 3000);
                }}
              >
                COPY CODE
              </button>
            </div>
            <p>Valid Till: {modalData.validTill}</p>
            <div className="circle1"></div>
            <div className="circle2"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
