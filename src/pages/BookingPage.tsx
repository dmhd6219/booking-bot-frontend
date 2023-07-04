import React, {useState} from 'react';
import {Button} from 'antd';
import styled from "styled-components";
// @ts-ignore
import {HashLink} from 'react-router-hash-link';

import {isDebug, tg} from "../utils/TelegramWebApp";
import ByTime from "../components/book/ByTime";
import ByRoom from "../components/book/ByRoom";
import Test from "../components/book/Test";

const HorizontalList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`

export default function BookingPage() {
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

                <HashLink to='#test-book'>
                    <Button type="primary" onClick={() => {
                        setChoice("test");
                        tg.expand();
                    }}>Test</Button>
                </HashLink>

            </HorizontalList>

            {choice === "time-start" && <ByTime typeOfTime={"Start"}/>}

            {choice === "room" && <ByRoom />}

            {choice === "test" && isDebug && <Test />}
        </div>
    )
}