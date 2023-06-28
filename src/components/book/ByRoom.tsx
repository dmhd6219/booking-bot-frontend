import React, {FunctionComponent, useState} from 'react'
import {Input, Select, TimePicker, Typography} from "antd";
import {disabledDateTime} from "../TimeDisabler";
import {MainButton, useShowPopup} from "@vkruglikov/react-telegram-web-app";
import {tg} from "../../TelegramWebApp";
import type {Dayjs} from 'dayjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);
const ByRoom: FunctionComponent = () => {
    const [roomSelected, setRoomSelected] = useState(false);
    const [dateSelected, setDateSelected] = useState(false);
    const [timeSelected, setTimeSelected] = useState(false);
    const [, setRangeSelected] = useState(false);


    // const [title,] = useState<string>("");
    const [room, setRoom] = useState<string | null>(null);
    const [date, setDate] = useState<string | null>(null);
    const [time, setTime] = useState<undefined | null | Dayjs>(null);
    const [range, setRange] = useState<string | null>(null);


    const [buttonState, setButtonState] = useState({
        text: 'BUTTON TEXT',
        show: false,
        progress: false,
        disable: false,
    });

    const showPopup = useShowPopup();
    // const [popupState, setPopupState] = useState<
    //     Pick<ShowPopupParams, 'title' | 'message'>
    //   >({
    //     title: 'title',
    //     message: 'message',
    //   });


    return (
        <div id={"sort-by-start-time"}>
            <Typography.Title>Title</Typography.Title>
            <Input size={"large"} id={"booking-title"}/>

            <Typography.Title>Room</Typography.Title>
            <Select options={[
                {value: '304', label: '304'},
            ]} size={"large"} onSelect={(value) => {
                setRoomSelected(true);
                console.log("On Select (Room)")
                setRoom(value);
                setDate(null);
                setTime(null);
                setRange(null);
                setButtonState({text: "BOOK", show: false, progress: false, disable: false,});
                // TODO reload changes from backend
            }} value={room}/>

            <Typography.Title>Date</Typography.Title>
            <Select size={"large"} onSelect={(value) => {
                setDate(value);
                setDateSelected(true);
                console.log("On Select (Date)");
                setTime(null);
                setRange(null);
                setButtonState({text: "BOOK", show: false, progress: false, disable: false,});
                // TODO reload changes from backend
            }} disabled={!roomSelected} value={date}>
                <Select.Option value="20.06.2022">20.06.2022</Select.Option>
                <Select.Option value="21.06.2022">21.06.2022</Select.Option>
                <Select.Option value="22.06.2022">22.06.2022</Select.Option>
            </Select>

            <Typography.Title>Time of Start</Typography.Title>
            <TimePicker inputReadOnly={true}
                        disabledTime={disabledDateTime} format={"HH:mm"}
                        minuteStep={5} size={"large"} onSelect={(value) => {
                setTimeSelected(true);
                console.log("On Select (Time)");
                setTime(value);
                setRange(null);
                setButtonState({text: "BOOK", show: false, progress: false, disable: false,});
                // TODO reload changes from backend
            }} disabled={!(roomSelected && dateSelected)} value={time}/>

            <Typography.Title>Duration of Booking</Typography.Title>
            <Select options={[
                {value: '30', label: '30 Minutes'},
                {value: '60', label: '1 Hour'},
                {value: '90', label: '1.5 Hours'},
                {value: '120', label: '2 Hours'},
                {value: '150', label: '2.5 Hours'},
                {value: '180', label: '3 Hours'},
            ]} size={"large"} onSelect={(value) => {
                setRangeSelected(true);
                console.log("On Select (Range)");
                setRange(value);
                setButtonState({text: "BOOK", show: true, progress: false, disable: false,});
                // TODO reload changes from backend
            }} disabled={(!(dateSelected && timeSelected))} value={range}/>


            <Typography.Title>Title</Typography.Title>
            <Input size={"large"} id={"booking-title"}/>


            <div>{buttonState?.show && <MainButton {...buttonState} onClick={() => {
                let title = (document.getElementById("booking-title") as HTMLInputElement).value;
                // TODO change to tg.showConfirm
                showPopup({
                    title: `Confirm ${title}`,
                    message: `Book ${room} at ${time} for ${range} minutes?`,
                    buttons: [
                        {
                            id: "ok",
                            type: 'ok',
                        },
                        // {
                        //     type: 'close',
                        // },
                        {
                            id: "cancel",
                            type: 'destructive',
                            text: 'Cancel',
                        },
                    ],
                }).then(id => {
                    if (id === "ok") {
                        // TODO : make a book
                        setTimeout(() => tg.close(), 500);
                    }
                })
            }}/>}</div>

        </div>
    )
}


export default ByRoom;