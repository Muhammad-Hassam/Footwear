import React from 'react';
import AdminNav from '../components/header/adminNav'
import Headertop from '../components/header/headertop';
import AdminCard from "../components/admincards/cards";
import Footer from "../components/footer/footer";




const AdminDashboard = (props) => {
  return (
    <>
<Headertop/>
<AdminNav/>
<AdminCard/>
<Footer/>
    </>
  );
}

export default AdminDashboard;