import React, {useState} from 'react'
import {Select, TimePicker, Typography} from "antd";
import {WidthSelect} from "../WidthSelect";
import {disabledDateTime} from "../TimeDisabler";
import {MainButton} from "@vkruglikov/react-telegram-web-app";

function ByStartTime() {
    const [date, setDate] = useState(false);
    const [time, setTime] = useState(false);
    const [range, setRange] = useState(false);
    const [room, setRoom] = useState(false);

    const [buttonState, setButtonState] = useState({
        text: 'BUTTON TEXT',
        show: false,
        progress: false,
        disable: false,
    });

    const checkValues = () => {
        if (date && time && range && room) {
            setButtonState({
                text : "BOOK",
                show : true,
                progress: false,
                disable: false,
            })
        }
    }

    return (
        <div id={"sort-by-start-time"}>
            <Typography.Title>Select Date</Typography.Title>
            <WidthSelect onChange={
                value => console.log(value)} size={"large"} onSelect={() => setDate(true)}>
                <Select.Option value="20.06.2022">20.06.2022</Select.Option>
                <Select.Option value="21.06.2022">21.06.2022</Select.Option>
                <Select.Option value="22.06.2022">22.06.2022</Select.Option>
            </WidthSelect>

            <Typography.Title>Select Time of Start</Typography.Title>
            <TimePicker onChange={(value) => console.log(value)} inputReadOnly={true}
                        disabledTime={disabledDateTime} format={"HH:mm"}
                        minuteStep={5} size={"large"} onSelect={() => setTime(true)} disabled={!date}/>

            <Typography.Title>Select Time of Booking</Typography.Title>
            <WidthSelect onChange={value => console.log(value)} options={[
                {value: '30', label: '30 Minutes'},
                {value: '60', label: '1 Hour'},
                {value: '90', label: '1.5 Hours'},
                {value: '120', label: '2 Hours'},
                {value: '150', label: '2.5 Hours'},
                {value: '180', label: '3 Hours'},
            ]} size={"large"} onSelect={() => setRange(true)} disabled={(!(date && time))}/>

            <Typography.Title>Select Room</Typography.Title>
            <WidthSelect onChange={value => console.log(value)} options={[
                {value: '304', label: '304'},
            ]} size={"large"} onSelect={() => {setRoom(true); checkValues()}} disabled={!(date && time && range)}/>


            <div>{buttonState?.show && <MainButton {...buttonState} />}</div>

        </div>
    )
}

export default ByStartTime
