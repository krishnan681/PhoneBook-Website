import React from 'react'
import NavPage from './NavPage'
import DashBoard from './DashBoard'
import Datas from '../Admin/Datas'
import { Routes, Route } from "react-router-dom";
import Auth from '../Auth';
export default function AdminPage() {
  return (
    <div>
      <NavPage/>
      
      {/* <Datas/> */}
      <DashBoard/>

      <Auth>
        <Routes>

          <Route path="/Adminpage" element={<DashBoard />} /> 
          <Route path="/datas" element={<Datas />} /> 
        </Routes>
      </Auth>
    </div>
  )
}

