import React, {useState} from 'react'
import {Select, TimePicker, Typography} from "antd";
import {WidthSelect} from "../WidthSelect";
import {disabledDateTime} from "../TimeDisabler";
import {MainButton} from "@vkruglikov/react-telegram-web-app";

function ByRoom() {
    const [roomSelected, setRoomSelected] = useState(false);
    const [dateSelected, setDateSelected] = useState(false);
    const [timeSelected, setTimeSelected] = useState(false);
    const [, setRangeSelected] = useState(false);

    const [room, setRoom] = useState(null);
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const [range, setRange] = useState(null);

    const [buttonState, setButtonState] = useState({
        text: 'BUTTON TEXT',
        show: false,
        progress: false,
        disable: false,
    });

    return (
        <div id={"sort-by-room"}>
            <Typography.Title>Select Room</Typography.Title>
            <WidthSelect onChange={value => {
                setRoom(value);
                setDate(null);
                setTime(null);
                setRange(null);
                setButtonState({text: "BOOK", show: false, progress: false, disable: false,});
                // TODO reload changes from backend
            }} onSelect={() => {
                setRoomSelected(true);
                console.log("On Select (Room)")
            }} options={[
                {value: '304', label: '304'},
                {value: '305', label: '305'}
            ]} size={"large"} value={room}/>

            <Typography.Title>Select Date</Typography.Title>
            <WidthSelect onChange={value => {
                setDate(value);
                setTime(null);
                setRange(null);
                setButtonState({text: "BOOK", show: false, progress: false, disable: false,});
                // TODO reload changes from backend
            }} onSelect={() => {
                setDateSelected(true);
                console.log("On Select (Date)")
            }} size={"large"} disabled={!roomSelected} value={date}>
                <Select.Option value="20.06.2022">20.06.2022</Select.Option>
                <Select.Option value="21.06.2022">21.06.2022</Select.Option>
                <Select.Option value="22.06.2022">22.06.2022</Select.Option>
            </WidthSelect>

            <Typography.Title>Select Time of Start</Typography.Title>
            <TimePicker onChange={(value) => {
                setTime(value);
                setRange(null);
                setButtonState({text: "BOOK", show: false, progress: false, disable: false,});
                // TODO reload changes from backend
            }} onSelect={() => {
                setTimeSelected(true);
                console.log("On Select (Time)")
            }} inputReadOnly={true}
                        disabledTime={disabledDateTime} format={"HH:mm"} minuteStep={5} size={"large"}
                        disabled={!(roomSelected && dateSelected)} value={time}/>

            <Typography.Title>Select Period of Booking</Typography.Title>
            <WidthSelect onChange={value => {
                setRange(value);
            }} onSelect={() => {
                setRangeSelected(() => {
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
            ]} size={"large"} disabled={!(roomSelected && dateSelected && timeSelected)} value={range}/>

            <div>{buttonState?.show && <MainButton {...buttonState} onClick={() => {
                showPopup({
                    title: "Confirm",
                    message: `Book ${room} at ${time} for ${range} minutes?`,
                    buttons: [
                        {
                            type: 'ok',
                        },
                        // {
                        //     type: 'close',
                        // },
                        {
                            type: 'destructive',
                            text: 'Cancel',
                        },
                    ],
                })
            }}/>}</div>

        </div>
    )
}

export default ByRoom
