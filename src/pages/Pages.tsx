import React from 'react'
import {Route, Routes, useLocation} from "react-router-dom";
import BookingPage from "./BookingPage";
import RulesPage from "./RulesPage";
import NavigationPage from './NavigationPage';
import MyBookingsPage from "./MyBookingsPage";
import AvailableRooms from "./AvailableRooms";
import TestPage from "./TestPage";

const Pages: React.FC = () => {
    const location = useLocation();

    return (
        <Routes location={location} key={location.pathname}>
            <Route path="/" element={<NavigationPage/>}/>
            <Route path="/book" element={<BookingPage/>}/>
            <Route path="/rules" element={<RulesPage/>}/>
            <Route path="/my" element={<MyBookingsPage/>}/>
            <Route path="/rooms" element={<AvailableRooms/>}/>
            <Route path="/test" element={<TestPage/>}/>
        </Routes>
    )
}

export default Pages