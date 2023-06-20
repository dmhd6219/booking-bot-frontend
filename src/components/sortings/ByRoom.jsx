import React, {useState} from 'react'
import {Select, TimePicker, Typography} from "antd";
import {WidthSelect} from "../WidthSelect";
import {disabledDateTime} from "../TimeDisabler";
import {MainButton} from "@vkruglikov/react-telegram-web-app";

function ByRoom() {
    const [room, setRoom] = useState(false);
    const [date, setDate] = useState(false);
    const [time, setTime] = useState(false);
    const [, setRange] = useState(false);

    const [buttonState, setButtonState] = useState({
        text: 'BUTTON TEXT',
        show: false,
        progress: false,
        disable: false,
    });

    return (
        <div id={"sort-by-room"}>
            <Typography.Title>Select Room</Typography.Title>
            <WidthSelect onChange={value => console.log(value)} onSelect={() => {
                setRoom(true);
                console.log("On Select (Room)")
            }} options={[
                {value: '304', label: '304'},
                {value: '305', label: '305'}
            ]} size={"large"}/>

            <Typography.Title>Select Date</Typography.Title>
            <WidthSelect onChange={value => console.log(value)} onSelect={() => {
                setDate(true);
                console.log("On Select (Date)")
            }} size={"large"} disabled={!room}>
                <Select.Option value="20.06.2022">20.06.2022</Select.Option>
                <Select.Option value="21.06.2022">21.06.2022</Select.Option>
                <Select.Option value="22.06.2022">22.06.2022</Select.Option>
            </WidthSelect>

            <Typography.Title>Select Period of Start</Typography.Title>
            <TimePicker onChange={(value) => console.log(value)} onSelect={() => {
                setTime(true);
                console.log("On Select (Time)")
            }} inputReadOnly={true}
                        disabledTime={disabledDateTime} format={"HH:mm"} minuteStep={5} size={"large"} disabled={!(room && date)}/>

            <Typography.Title>Select Period of Booking</Typography.Title>
            <WidthSelect onChange={value => console.log(value)} onSelect={() => {
                setRange(() => {
                    setButtonState({text: "BOOK", show: true, progress: false, disable: false,});
                    return true;
                });
            }} options={[
                {value: '30', label: '30 Minutes'},
                {value: '60', label: '1 Hour'},
                {value: '90', label: '1.5 Hours'},
                {value: '120', label: '2 Hours'},
                {value: '150', label: '2.5 Hours'},
                {value: '180', label: '3 Hours'},
            ]} size={"large"} disabled={!(room && date && time)}/>

            <div>{buttonState?.show && <MainButton {...buttonState} />}</div>

        </div>
    )
}

export default ByRoom
