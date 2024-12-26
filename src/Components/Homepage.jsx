import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaSearch, FaWindowClose } from "react-icons/fa";
import {
  faPhone,
  faMapMarkerAlt,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import MarqueeWithLink from "../Components/MarqueeWithLink";
import { useAuth } from "./Auth";
import { useNavigate } from "react-router-dom";
import "../Css/Homepage.css";
import Card from 'react-bootstrap/Card';
 
import image1 from "../assets/images/image1.jpg";
import image2 from "../assets/images/image2.jpg";
import image3 from "../assets/images/image3.jpg";
import image4 from "../assets/images/image4.jpg";
import image5 from "../assets/images/image5.jpg";
import image6 from "../assets/images/image6.jpg";
import image7 from "../assets/images/image7.jpg";
import image8 from "../assets/images/image8.jpg";
import image9 from "../assets/images/image9.jpg";
import image10 from "../assets/images/image10.jpg";
import image11 from "../assets/images/image11.jpg";
import image12 from "../assets/images/image12.jpg";
import image13 from "../assets/images/image13.jpg";
import image14 from "../assets/images/image14.jpg";
import image15 from "../assets/images/image15.jpg";
import image16 from "../assets/images/image16.jpg";
import image17 from "../assets/images/image17.jpg";
import image18 from "../assets/images/image18.jpg";
import image19 from "../assets/images/image19.jpg";
import image20 from "../assets/images/image20.jpg";
import image21 from "../assets/images/image21.jpg";
import image22 from "../assets/images/image22.jpg";
import image23 from "../assets/images/image23.jpg";
import image24 from "../assets/images/image24.jpg";
import image25 from "../assets/images/image25.jpg";
import image26 from "../assets/images/image26.jpg";
import image27 from "../assets/images/image27.jpg";
import image28 from "../assets/images/image28.jpg";
import image29 from "../assets/images/image29.jpg";
import image30 from "../assets/images/image30.jpg";
 


export default function Homepage() {
 

  const [data, setData] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [firmName, setFirmName] = useState("");
  const [productName, setProductName] = useState("");
  const [messageTemplate] = useState(
    "I Saw Your Listing in SIGNPOST PHONE BOOK. I am Interested in your Products. Please Send Details/Call Me."
  );
  const encodedMessage = encodeURIComponent(messageTemplate);

  const imagesForFirstCard = [image1, image2, image3, image4, image5];
  const imagesForSecondCard = [image6, image7, image8, image9, image10];
  const imagesForThirdCard = [image11, image12, image13, image14, image15];
  const imagesForFourthCard = [image16, image17, image18, image19, image20];
  const imagesForFifthCard = [image21, image22, image23, image24, image25];
  const imagesForSixthCard = [image26, image27, image28, image29, image30];


  const [currentImageIndexFirst, setCurrentImageIndexFirst] = useState(0);
  const [currentImageIndexSecond, setCurrentImageIndexSecond] = useState(0);
  const [currentImageIndexThird, setCurrentImageIndexThird] = useState(0);
  const [currentImageIndexFourth, setCurrentImageIndexFourth] = useState(0);
  const [currentImageIndexFifth, setCurrentImageIndexFifth] = useState(0);
  const [currentImageIndexSixth, setCurrentImageIndexSixth] = useState(0);


  const createSlideshowEffect = (setIndex, imageArray) => {
    return setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % imageArray.length);
    }, 3000);
  };

  useEffect(() => {
    const interval = createSlideshowEffect(setCurrentImageIndexFirst, imagesForFirstCard);
    return () => clearInterval(interval);
  }, [imagesForFirstCard.length]);

  useEffect(() => {
    const interval = createSlideshowEffect(setCurrentImageIndexSecond, imagesForSecondCard);
    return () => clearInterval(interval);
  }, [imagesForSecondCard.length]);

  useEffect(() => {
    const interval = createSlideshowEffect(setCurrentImageIndexThird, imagesForThirdCard);
    return () => clearInterval(interval);
  }, [imagesForThirdCard.length]);

  useEffect(() => {
    const interval = createSlideshowEffect(setCurrentImageIndexFourth, imagesForFourthCard);
    return () => clearInterval(interval);
  }, [imagesForFourthCard.length]);

  useEffect(() => {
    const interval = createSlideshowEffect(setCurrentImageIndexFifth, imagesForFifthCard);
    return () => clearInterval(interval);
  }, [imagesForFifthCard.length]);

  useEffect(() => {
    const interval = createSlideshowEffect(setCurrentImageIndexSixth, imagesForSixthCard);
    return () => clearInterval(interval);
  }, [imagesForSixthCard.length]);

  const { user } = useAuth();

  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://signpostphonebook.in/client_fetch.php"
      );
      if (!response.ok)
        throw new Error(`HTTP Error! Status: ${response.status}`);
      const jsonResponse = await response.json();
      if (Array.isArray(jsonResponse)) {
        setData(jsonResponse.sort((a, b) => b.id - a.id));
      } else {
        alert("Unexpected response from server.");
      }
    } catch (error) {
      alert("Failed to load data: " + error.message);
    }
  };

  function toTitleCase(str) {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 480);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const maskMobileNumber = (mobileNumber) =>
    mobileNumber && mobileNumber.length > 5
      ? mobileNumber.slice(0, -5) + "xxxxx"
      : mobileNumber;

  const fetchFirmData = async (name) => {
    if (!name) {
      return;
    }
    try {
      const response = await fetch(
        `https://signpostphonebook.in/client_fetch_byname.php?businessname=${name}`
      );

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const jsonResponse = await response.json();
      if (Array.isArray(jsonResponse)) {
        setData(jsonResponse);
      } else {
        window.alert("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      window.alert("Failed to load firm data: " + error.message);
    }
  };

  const fetchProductData = async (name) => {
    if (!name) {
      return;
    }
    try {
      const response = await fetch(
        `https://signpostphonebook.in/client_fetch_product.php?product=${name}`
      );

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const jsonResponse = await response.json();
      if (Array.isArray(jsonResponse)) {
        setData(jsonResponse);
      } else {
        window.alert("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      window.alert("Failed to load product data: " + error.message);
    }
  };

  const handleCallClick = (item) => {
    if (user) {
      window.location.href = `tel:${item.mobileno}`;
    } else {
      alert("Login Required");
      navigate("/login");
    }
  };

  const handleMoreClick = (item) => {
    if (user) {
      setSelectedItem(item);
    } else {
      alert("Login Required");
      navigate("/login");
    }
  };

  const closePopup = () => {
    setSelectedItem(null);
  };

  useEffect(() => {
    if (firmName) fetchFirmData(firmName);
    else fetchData();
  }, [firmName]);

  useEffect(() => {
    if (productName) fetchProductData(productName);
    else fetchData();
  }, [productName]);

  const styles = {
    container: {
      display: "flex",
      gap: "20px",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "2px",
    },
    inputContainer: {
      position: "relative",
      width: "250px",
    },
    input: {
      width: "100%",
      padding: "10px 10px 10px 40px", // Leave space for the icon
      borderRadius: "5px",
      border: "1px solid #ccc",
      fontSize: "16px",
    },
    icon: {
      position: "absolute",
      top: "50%",
      left: "10px",
      transform: "translateY(-50%)",
      color: "#888",
      fontSize: "18px",
    },
  };

  return (
    <div>
      <div className="mycontainer container-fluid">
        <br/> 
        <br/> 

        <h2>Search & Find
        businesses in your city</h2>

        <div className="sticky-container">
          {/* Search Bars */}
          {isMobile ? (
            <div style={styles.container}>
              {/* First Input Box */}
              <div style={styles.inputContainer}>
                <FaSearch style={styles.icon} />
                <input
                  type="text"
                  placeholder="Firm/Person Name"
                  style={styles.input}
                  onChange={(e) => setFirmName(e.target.value)}
                  onSelect={() => setProductName("")}
                  value={firmName}
                />
              </div>

              {/* Second Input Box */}
              <div style={styles.inputContainer}>
                <FaSearch style={styles.icon} />
                <input
                  type="text"
                  placeholder="Product Name"
                  style={styles.input}
                  onChange={(e) => setProductName(e.target.value)}
                  onSelect={() => setFirmName("")}
                  value={productName}
                />
              </div>
            </div>
          ) : (
            <div className="search-container">
              <label>Firm/Person: </label>
              <input
                type="text"
                placeholder="Search by Firms/Persons..."
                className="search-box"
                onChange={(e) => setFirmName(e.target.value)}
                onSelect={() => setProductName("")}
                value={firmName}
              />
              <label>Product: </label>
              <input
                type="text"
                placeholder="Search By Products..."
                className="search-box"
                onChange={(e) => setProductName(e.target.value)}
                onSelect={() => setFirmName("")}
                value={productName}
              />
            </div>
          )}
        </div>
        {/* Contact Cards */}
        <div className="contactcard-div">
          {data.length > 0 ? (
            data.map((item) => (
              <div className="card-container" key={item.id}>
                <div className="card-left">
                  <h3 className="card-name">
                    {toTitleCase(item.businessname)}
                  </h3>
                  <p className="card-location">
                    {productName ? (
                      <>{item.product}</>
                    ) : (
                      <>
                        {item.city}, {item.pincode}
                      </>
                    )}
                  </p>
                </div>
                <div className="card-right">
                  <div className="phone-section">
                    <p className="phone-number">
                      {maskMobileNumber(item.mobileno)}
                    </p>
                  </div>
                  <div className="button-group">
                    <button
                      className="mybtn call-btn"
                      onClick={() => handleCallClick(item)}
                    >
                      Call
                    </button>
                    <button
                      className="mybtn more-btn"
                      onClick={() => handleMoreClick(item)}
                    >
                      More
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No data available.</p>
          )}
        </div>

        {/* Popup */}
        {selectedItem && (
          <div className="popup">
            <div className="popup-content">
              <button className="close-button" onClick={closePopup}>
                &times;
              </button>
              <h2>{selectedItem.businessname}</h2>
              <p>
                <strong>Mobile:</strong>{" "}
                {maskMobileNumber(selectedItem.mobileno)}
              </p>
              <p>
                <strong>Product/Services:</strong> <br />
                {selectedItem.product}
              </p>
              <p>
                <strong>Address:</strong> {selectedItem.doorno},{" "}
                {selectedItem.city}, {selectedItem.pincode}
              </p>
              <div className="button-group">
                <a
                  href={`https://wa.me/${selectedItem.mobileno}`}
                  target="_blank"
                  rel="noreferrer"
                  className="popup-btn whatsapp-btn"
                >
                  WhatsApp
                </a>
                <a
                  href={`mailto:${
                    selectedItem.email || "business@example.com"
                  }`}
                  className="popup-btn mail-btn"
                >
                  Mail
                </a>
                <a
                  href={`tel:${selectedItem.mobileno}`}
                  className="popup-btn call-btn"
                >
                  Call
                </a>
                <a
                  href={`sms:${selectedItem.mobileno}?&body=${encodedMessage}`}
                  className="popup-btn sms-btn"
                >
                  SMS
                </a>
              </div>
            </div>
          </div>
        )}

      </div>

 
<br/>
<br/>
<h2>View your Ads:</h2>

<div className="card-images" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>

<Card style={{ width: "20rem", height: "30rem", margin: "5px" }}>
<Card.Img
          variant="top"
          src={imagesForFirstCard[currentImageIndexFirst]}
          alt="Slideshow First Card"
        />
        <Card.Body>
          <Card.Title>Full page size</Card.Title>
          <Card.Text>
            This is a slideshow that changes images automatically every 3 seconds.
          </Card.Text>
        </Card.Body>
      </Card>



<Card style={{ width: '28rem', height: '18rem', margin: '5px' }}>
      <Card.Img
          variant="top"
          src={imagesForSecondCard[currentImageIndexSecond]}
          alt="Slideshow Second Card"
        />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        
      </Card.Body>
    </Card>



<Card style={{ width: '18rem', height: '18rem', margin: '5px' }}>
<Card.Img
          variant="top"
          src={imagesForThirdCard[currentImageIndexThird]}
          alt="Slideshow Third Card"
        />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        
      </Card.Body>
    </Card>



<Card style={{ width: '28rem', height: '14rem', margin: '5px' }}>
<Card.Img
          variant="top"
          src={imagesForFourthCard[currentImageIndexFourth]}
          alt="Slideshow Fourth Card"
        />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        
      </Card.Body>
    </Card>



<Card style={{ width: '48rem', height: '11rem', margin: '5px' }}>
        <Card.Img
          variant="top"
          src={imagesForFifthCard[currentImageIndexFifth]}
          alt="Slideshow Fifth Card"
        />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        
      </Card.Body>
    </Card>



    <Card style={{ width: '28rem', height: '25rem', margin: '5px' }}>
    <Card.Img
          variant="top"
          src={imagesForSixthCard[currentImageIndexSixth]}
          alt="Slideshow Sixth Card"
        />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        
      </Card.Body>
    </Card>




 
</div>




<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>


   
</div>

   
  );
}
