import React from 'react'
import {BrowserRouter} from "react-router-dom";
import BookingPage from "./BookingPage";

const Pages: React.FC = () => {
    return (
        <BrowserRouter>
            <BookingPage></BookingPage>
        </BrowserRouter>
    )
}

export default Pages