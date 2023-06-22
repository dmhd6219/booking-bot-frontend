import React, {useState} from 'react';
import {Button} from 'antd';
import styled from "styled-components";
import { HashLink } from 'react-router-hash-link';
import {tg} from "../tg";
import ByEndTime from "../components/sortings/ByEndTime";
import ByRoom from "../components/sortings/ByRoom";
import ByStartTime from "../components/sortings/ByStartTime";



const HorizontalList = styled.div`

    width: 100%;
    display: flex;
    
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;

`



const DateChooseOld = () => {
    const [choice, setChoice] = useState("time-start");

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

            {choice === "time-start" && <ByStartTime/>}

            {choice === "room" && <ByRoom/>}

            {choice === "time-end" && <ByEndTime/>}
        </div>
    )
}

export default DateChooseOld;
