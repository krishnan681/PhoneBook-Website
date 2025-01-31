import React, { useState, useEffect } from "react";
import { Form, Button, Nav, ProgressBar, Modal } from "react-bootstrap";
import axios from "axios";
import "../Css/UserProfile.css"; // Link the CSS file
import { useAuth } from "./Auth"; // Assuming this is your auth context
import userImage from "../assets/images/book_logo.png";
import UserLogo from "../assets/images/profileimg-membership.png";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const UserProfile = () => {
  const { userData, setUserData } = useAuth(); // Fetch userData from Auth context
  const [teamData, setTeamData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [referralCount, setReferralCount] = useState(0);
  const [taskCount, setTaskCount] = useState(""); // Task count
  const [isEditing, setIsEditing] = useState(false);
  const [editableDetails, setEditableDetails] = useState(userData || {});
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("about"); // State for active tab
  const [showModal, setShowModal] = useState(false);
  const [profileImage, setProfileImage] = useState(userData?.profileImage || UserLogo);

  // Update editableDetails when userData changes
  useEffect(() => {
    setEditableDetails(userData || {});
  }, [userData]);

  // Fetch team data based on user ID
  const fetchTeamData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://signpostphonebook.in/try_totalcount.php?id=${userData?.id}`
      );
      if (response.data?.total_count) {
        setTeamData([{ total_count: response.data.total_count }]);
        setTaskCount(response.data.total_count || 0); // Set task count from the API response
      } else {
        setTeamData([]);
      }
    } catch (error) {
      console.error("Error fetching team data:", error);
      setTeamData([]);
    } finally {
      setIsLoading(false);
    }
  };

 // Fetch referral count based on user mobile number
 const fetchReferralCount = async () => {
  try {
    if (!userData?.mobileno) {
      setError("Mobile number is required for fetching referral count.");
      return;
    }

    const response = await fetch(
      `https://signpostphonebook.in/try_referrals_count.php?mobile=${encodeURIComponent(userData.mobileno)}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch referral count.");
    }

    const data = await response.text(); // Fetch response as text

    const match = data.match(/Total Referred: (\d+)/); // Extract number from response

    if (match) {
      setReferralCount(parseInt(match[1], 10)); // Set extracted referral count
    } else {
      setError("No referral data found.");
    }
  } catch (error) {
    setError(error.message || "Failed to fetch referral count.");
  }
};


  useEffect(() => {
    if (userData) {
      fetchTeamData();
      fetchReferralCount();
    }
  }, [userData]);

 // Handle edit toggle
 const toggleEdit = () => {
  setIsEditing(!isEditing);
};

const handleChange = (e) => {
  const { name, value } = e.target;
  setEditableDetails((prev) => ({ ...prev, [name]: value }));
};

// Save profile changes

const handleSave = async () => {
  try {
    if (!editableDetails.id) {
      setError("User ID is missing. Cannot update profile.");
      return;
    }

    const { mobileno, ...payload } = editableDetails;
    payload.id = userData.id;

    console.log("Payload being sent to server:", payload);

    const response = await axios.post(
      "https://signpostphonebook.in/try_update_profile.php",
      payload
    );

    if (response.data.success) {
      if (setUserData) {
        setUserData((prevData) => ({
          ...prevData,
          ...payload, // Include updated details
        }));
      } else {
        console.error("setUserData is not a function");
      }
      setIsEditing(false);  // Switch to non-editable view
      setError("");  // Clear any errors
      console.log("Profile updated successfully:", response.data.message);
    } else {
      console.error("Failed to update profile:", response.data.message);
      setError(response.data.message || "Failed to save changes.");
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    setError("Something went wrong. Please try again later.");
  }
};




const handleTabChange = (selectedTab) => {
  setActiveTab(selectedTab); // Update active tab
};

 // Handle image upload
 const handleImageChange = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("profileImage", file);
  formData.append("id", userData?.id);

  try {
    const response = await axios.post("https://signpostphonebook.in/upload_profile.php", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.data.success) {
      setProfileImage(response.data.imageUrl);
      setUserData({ ...userData, profileImage: response.data.imageUrl });
    } else {
      console.error("Image upload failed", response.data.message);
    }
  } catch (error) {
    console.error("Error uploading image", error);
  }
};

 
  
  
  
 
  return (
    <div className="user-profile">
      <div
        className="profile-head"
        style={{
          backgroundColor: "#add8e6",
          borderRadius: "10px",
        }}
      >
        <div className="profile-header">
          <div className="profile-picture">
            <label htmlFor="profile-upload" className="profile-circle">
              <img src={UserLogo} alt="Profile" className="profile-img" />
              <i className="fas fa-camera overlay-icon"></i>
            </label>
            <input type="file" id="profile-upload" accept="image/*" style={{ display: "none" }} onChange={handleImageChange} />
          </div>
          <div className="profile-info" style={{ marginTop: "5vh" }}>
            <h3>{userData?.businessname || "Business Name Not Available"}</h3>
            <p>{userData?.product || "Product Info Not Available"}</p>
            <p>{userData?.joiningDate || "Joining Date Not Available"}</p>
          </div>
          <div className="profile-actions">
            <Button className="share-btn">
              <i className="fas fa-share"></i> Share
            </Button>
            <Button className="ref-btn" onClick={() => setShowModal(true)}>
              <i className="fas fa-users"></i> My Ref
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="tabs-wrapper">
          <Nav
            variant="pills"
            activeKey={activeTab}
            onSelect={(selectedTab) => handleTabChange(selectedTab)}
            className="profile-tabs"
          >
            <Nav.Item>
              <Nav.Link eventKey="about">About</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="tasks">Tasks</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="sub">Sub</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="membership">Membership Card</Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
      </div>
      <div className="tab-line"></div> {/* Line below the tabs */}

      {/* Tab Content */}
      <div className="tab-content">
        {/* About Tab */}
        {activeTab === "about" && (
          <div className="about-tab" style={{ padding: "10px" }}>
            <h4>About Me</h4>
            <div className="about-container">
              {isEditing ? (
                <div className="about-edit-form">
                   
                  <Form.Group>
                    <Form.Label>Prefix</Form.Label>
                    <Form.Control
                      type="text"
                      name="prefix"
                      value={editableDetails.prefix || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={editableDetails.businessname || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                   
                  <Form.Group>
                    <Form.Label>Product</Form.Label>
                    <Form.Control
                      type="text"
                      name="product"
                      value={editableDetails.product || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="doorno"
                      value={editableDetails.doorno || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>city</Form.Label>
                    <Form.Control
                      type="text"
                      name="city"
                      value={editableDetails.city || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>pincode</Form.Label>
                    <Form.Control
                      type="number"
                      name="pincode"
                      value={editableDetails.pincode || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>email</Form.Label>
                    <Form.Control
                      type="text"
                      name="email"
                      value={editableDetails.email || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  
                  <div className="action-buttons">
                    <Button variant="success" onClick={handleSave}>
                      Save
                    </Button>
                    <Button variant="secondary" onClick={toggleEdit}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="about-details">
                   
                  <p>
                    <strong>ID:</strong> {userData.id || "N/A"}
                  </p>
                  <p>
                    <strong>Prefix:</strong> {userData.prefix || "N/A"}
                  </p>
                  <p>
                    <strong>Address:</strong> {userData.doorno || "N/A"}
                  </p>
                  <p>
                    <strong>City:</strong> {userData.city || "N/A"}
                  </p>
                  <p>
                    <strong>Pincode:</strong> {userData.pincode || "N/A"}
                  </p>
                  <p>
                    <strong>Mobile:</strong> {userData.mobileno || "N/A"}
                  </p>
                  <p>
                    <strong>Email:</strong> {userData.email || "N/A"}
                  </p>
                  <Button variant="primary" className="edit-btn" onClick={toggleEdit}>
                    Edit
                  </Button>
                </div>
              )}
               
            </div>
          </div>
        )}

        {/* Tasks Tab */}
        {activeTab === "tasks" && (
          <div className="tasks-tab" style={{ padding: "10px" }}>
            <div className="stats-box">
              <h3>Counts: {isLoading ? "Loading..." : taskCount || "No entries today..."}</h3>
            </div>
            <div className="progress-section">
            <ProgressBar
              now={(Math.min(taskCount, 1000) / 1000) * 100}
              label={`${Math.round((Math.min(taskCount, 1000) / 1000) * 100)}%`}
            />


            </div>
            {error && <p className="error-message">{error}</p>}
          </div>
        )}

        {/* Subscription Tab */}
        {activeTab === "sub" && (
          <div className="sub-tab">
            {/* Weekly Plan */}
            <div className="starter-plan-card">
              <div className="plan-header">
                <h5>1 Week Trial Pack</h5>
                <p className="plan-price">₹20</p>
              </div>
              <div className="plan-body">
                <ul className="plan-features">
                  <li>Duration: 7 Days</li>
                  <li>Bluk Message for 7 days</li>
                  <li>Free Support</li>
                </ul>
                <Button variant="success">Buy Now</Button>
              </div>
            </div>
            <div className="monthly-plan-card">
              <div className="plan-header">
                <h5>1 month Pack</h5>
                <p className="plan-price">₹200</p>
              </div>
              <div className="plan-body">
                <ul className="plan-features">
                  <li>Referral Bonus: ₹50</li>
                  <li>Free Support</li>
                  <li>Sign-up bonus: ₹20</li>
                </ul>
                <Button variant="success">Buy Now</Button>
              </div>
            </div>
            <div className="yearly-plan-card">
              <div className="plan-header">
                <h5>1 year Pack</h5>
                <p className="plan-price">₹1000</p>
              </div>
              <div className="plan-body">
                <ul className="plan-features">
                  <li>Unlimited messages</li>
                  <li>24*7 Support</li>
                  <li>Sign-up bonus: ₹20</li>
                </ul>
                <Button variant="success">Buy Now</Button>
              </div>
            </div>
          </div>
        )}

        {/* Membership Card Tab */}
        {activeTab === "membership" && (
          <>
            <div className="memb-card-download" style={{ textAlign: "right", marginBottom: "10px" }}>
               
            </div>
            <div className="membership-card-container">
              <div className="membership-card">
                
                <div className="card-front">
                  <div className="logo-container">
                    <img src={userImage} className="membership-logo" alt="Logo" />
                  </div>

                  <div className="head">
                    <h4>Signpost Celfon.in Technology</h4>
                  </div>

                  <div className="sub-head">
                    <h4>Member Card</h4>
                  </div>

                  <div className="profile-card">
                    <img src={UserLogo} alt="Profile" />
                  </div>

                  <div className="card-content">
                    <p className="membership-name">
                      Name: {userData.businessname || "N/A"}
                    </p>
                    <p className="membership-id">User ID: {userData.id || "N/A"}</p>
                    <p className="expiry-date">Membership Expires: 31/Dec/2025</p>
                    <p className="expiry-date">Membership Number: 5897486230 012</p>
                  </div>

                  <div className="memb-footer">
                    <p className="footer-text">This card is valid for 5 years from the date of issue. | 46, Sidco Industtrial Estate, Coimbtore - 641021</p>
                  </div>
                </div>

                <div className="card-back">
                  <h4>Membership Benefits</h4>
                  <ul>
                    <li>✔ Access to exclusive content</li>
                    <li>✔ Priority customer support</li>
                    <li>✔ Discounts on services and products</li>
                    <li>✔ Invitations to special events</li>
                  </ul>
                  <p className="visit-text">Visit our Store to collect books and make sure to visit our E-Books.</p>
                  <p className="visit-text">This Card belogns to the company If you find this anywhrere please bring to signpost celfon technology.</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
       {/* Referral Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>My Referrals</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Total Referrals: {referralCount}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserProfile;
