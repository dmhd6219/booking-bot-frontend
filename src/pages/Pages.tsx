import React from 'react'
import {Route, Routes, useLocation} from "react-router-dom";

import BookingPage from "./BookingPage";
import RulesPage from "./RulesPage";
import TestPage from "./TestPage";

const Pages: React.FC = () => {
    const location = useLocation();

    return (
        <Routes location={location} key={location.pathname}>
            <Route path="/" element={<BookingPage/>}/>
            <Route path="/rules" element={<RulesPage/>}/>
            <Route path="/test" element={<TestPage/>}/>
        </Routes>
    )
}

export default Pages