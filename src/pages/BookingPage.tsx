import React, {useState} from 'react';
import {Button} from 'antd';
import styled from "styled-components";
// @ts-ignore
import {HashLink} from 'react-router-hash-link';
import {tg} from "../TelegramWebApp";
import ByTime from "../components/book/ByTime"
import ByRoom from "../components/book/ByRoom";

const HorizontalList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`

function BookingPage() {
    const [choice, setChoice] = useState<string>("time-start");

    return (
        <div>
            <HorizontalList>
                <HashLink to="#sort-by-start-time">
                    <Button type="primary" onClick={() => {
                        setChoice("time-start");
                        tg.expand();
                    }}>By Start Time</Button>
                </HashLink>

                <HashLink to='#sort-by-room'>
                    <Button type="primary" onClick={() => {
                        setChoice("room");
                        tg.expand();
                    }}>By Room</Button>
                </HashLink>

                <HashLink to='#sort-by-end-time'>
                    <Button type="primary" onClick={() => {
                        setChoice("time-end");
                        tg.expand();
                    }}>By End Time</Button>
                </HashLink>
            </HorizontalList>

            {choice === "time-start" && <ByTime typeOfTime={"Start"}/>}

            {choice === "room" && <ByRoom/>}

            {choice === "time-end" && <ByTime typeOfTime={"End"}/>}
        </div>
    )
}

export default BookingPage
