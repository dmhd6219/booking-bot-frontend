import React, {useState} from 'react'
import {Select, TimePicker, Typography} from "antd";
import {WidthSelect} from "../WidthSelect";
import {disabledDateTime} from "../TimeDisabler";
import {MainButton} from "@vkruglikov/react-telegram-web-app";

function ByEndTime() {
    const [dateSelected, setDateSelected] = useState(false);
    const [timeSelected, setTimeSelected] = useState(false);
    const [rangeSelected, setRangeSelected] = useState(false);
    const [, setRoomSelected] = useState(false);

    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const [range, setRange] = useState(null);
    const [room, setRoom] = useState(null);

    const [buttonState, setButtonState] = useState({
        text: 'BUTTON TEXT',
        show: false,
        progress: false,
        disable: false,
    });


    return (
        <div id={"sort-by-start-time"}>
            <Typography.Title>Select Date</Typography.Title>
            <WidthSelect onChange={value => {
                setDate(value);
                setTime(null);
                setRange(null);
                setRoom(null);
                // TODO reload changes from backend
            }} size={"large"} onSelect={() => {
                setDateSelected(true);
                console.log("On Select (Date)")
            }} value={date}>
                <Select.Option value="20.06.2022">20.06.2022</Select.Option>
                <Select.Option value="21.06.2022">21.06.2022</Select.Option>
                <Select.Option value="22.06.2022">22.06.2022</Select.Option>
            </WidthSelect>

            <Typography.Title>Select Time of End</Typography.Title>
            <TimePicker onChange={(value) => {
                setTime(value);
                setRange(null);
                setRoom(null);
                // TODO reload changes from backend
            }} inputReadOnly={true}
                        disabledTime={disabledDateTime} format={"HH:mm"}
                        minuteStep={5} size={"large"} onSelect={() => {
                setTimeSelected(true);
                console.log("On Select (Time)")
            }} disabled={!dateSelected} value={time}/>

            <Typography.Title>Select Period of Booking</Typography.Title>
            <WidthSelect onChange={value => {
                setRange(value);
                setRoom(null);
                // TODO reload changes from backend
            }} options={[
                {value: '30', label: '30 Minutes'},
                {value: '60', label: '1 Hour'},
                {value: '90', label: '1.5 Hours'},
                {value: '120', label: '2 Hours'},
                {value: '150', label: '2.5 Hours'},
                {value: '180', label: '3 Hours'},
            ]} size={"large"} onSelect={() => {
                setRangeSelected(true);
                console.log("On Select (Range)")
            }} disabled={(!(dateSelected && timeSelected))} value={range}/>

            <Typography.Title>Select Room</Typography.Title>
            <WidthSelect onChange={value => setRoom(value)} options={[
                {value: '304', label: '304'},
            ]} size={"large"} onSelect={() => {
                setRoomSelected(() => {
                    setButtonState({text: "BOOK", show: true, progress: false, disable: false,});
                    return true;
                });
            }} disabled={!(dateSelected && timeSelected && rangeSelected)} value={room}/>


            <div>{buttonState?.show && <MainButton {...buttonState} />}</div>

        </div>
    )
}

export default ByEndTime
