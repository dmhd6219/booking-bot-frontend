import React from 'react'
import {Route, Routes, useLocation} from "react-router-dom";
import BookingPage from "./BookingPage";
import RulesPage from "./RulesPage";
import NavigationPage from './NavigationPage';
import MyBookingsPage from "./MyBookingsPage";

const Pages: React.FC = () => {
    const location = useLocation();

    return (
        <Routes location={location} key={location.pathname}>
            <Route path="/" element={<NavigationPage/>}/>
            <Route path="/book" element={<BookingPage/>}/>
            <Route path="/rules" element={<RulesPage/>}/>
            <Route path="/my" element={<MyBookingsPage/>}/>
        </Routes>
    )
}

export default Pages