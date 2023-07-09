import React, {useEffect} from 'react'
import {Card, Typography} from "antd";
import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom";
import {isTelegramWindow, tg} from "../utils/TelegramWebApp";

const CenteredSpace = styled.div`
display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
`

const CenteredTitle = styled(Typography.Title)`
  text-align: center;
`

const CardWithPadding = styled(Card)`
  margin-top:5px;
  margin-bottom: 5px;
`
export default function RulesPage() {

    const navigate = useNavigate();

    useEffect(() => {
        console.log("opened 1st time");
        if (isTelegramWindow) {
            tg.expand();
            tg.BackButton.show();
            tg.BackButton.offClick(() => {console.log("clicked");navigate("/")});
        }
    }, [navigate]);

    return (
        <div>
            <CenteredTitle>Rules</CenteredTitle>
            <CenteredSpace>
                <CardWithPadding title="Booking time" style={{ width: 300 }}>
                    <p>Booking is not allowed anytime because of university classes</p>
                    <p>Usually you cannot book a room from 7:00 to 19:00</p>
                </CardWithPadding>
                <CardWithPadding title="Available rooms" extra={<Link to="/rooms">See rooms</Link>} style={{ width: 300 }}>
                    <p>You can book only rooms with Yellow access</p>
                    <p>You can see available for booking rooms by clicking "See rooms"</p>
                </CardWithPadding>
                <CardWithPadding title="Booking time" style={{ width: 300 }}>
                    <p>You can book one room not more than 3 horus per day</p>
                    <p>In case you need more, other people can book it again</p>
                </CardWithPadding>
                <CardWithPadding title="Please respect" style={{ width: 300 }}>
                    <p>Your booking can be removed by administrators for some important events or classes</p>
                    <p>You will be informed in this case</p>
                </CardWithPadding>
            </CenteredSpace>
        </div>
    )
}

