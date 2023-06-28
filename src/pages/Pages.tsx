import React from 'react'
import {Route, Routes, useLocation} from "react-router-dom";
import BookingPage from "./BookingPage";
import RulesPage from "./RulesPage";

const Pages: React.FC = () => {
    const location = useLocation();

    return (
        <Routes location={location} key={location.pathname}>
            <Route path="/" element={<BookingPage/>}/>
            <Route path="/rules" element={<RulesPage/>}/>
        </Routes>
    )
}

export default Pages