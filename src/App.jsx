import React from "react";
import Homepage from "./Components/Homepage";
import Navigationpage from "./Components/Navigationpage";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Aboutpage from "./Components/Aboutpage";
import Contactus from "./Components/Contactus";
import "../src/App.css";
import Signup from "./Components/Signup";
import Auth from "./Components/Auth";
import MediaPartner from "./Components/MediaPartner";
import UserProfile from "./Components/UserProfile ";
import NearbyPromotion from "./Components/Nearbypromotion";
import NavbarWithDrawer from "./Components/NavbarWithDrawer ";
import EditableDropdowns from "./Components/EditableDropdowns";
import SearchAndSendSMS from "./Components/SearchAndSendSMS";
import PopupFilter from "./Components/PopupFilter";
import Nearbypromotion from "./Components/Nearbypromotion";
import TextAnimation from "./Components/TextAnimation";
import AdminPage from "./Components/Admin/AdminPage"
import Datas from "./Components/Admin/Datas"
import Team from "./Components/Admin/Team";
import Chat from "./Components/Admin/Chat";

export default function App() {
  return (
    <div>
      <div>
        <Auth>
          <Navigationpage />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/NearbyPromotion" element={<PopupFilter />} />
            <Route path="/SearchandSendSms" element={<SearchAndSendSMS />} />
            <Route path="/PrefixandPicode" element={<NearbyPromotion />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profilePage" element={<UserProfile />} />
            <Route path="/about" element={<Aboutpage />} />
            <Route path="/contactus" element={<Contactus />} />
            <Route path="/MediaPartner" element={<MediaPartner />} />
            <Route path="/AdminPage" element={<AdminPage />} />
            <Route path="/datas" element={<Datas />} />
            <Route path="/team" element={<Team />} />
            <Route path="/chat" element={<Chat />} />

          </Routes>
        </Auth>  

      </div>
    </div>
  );
}
