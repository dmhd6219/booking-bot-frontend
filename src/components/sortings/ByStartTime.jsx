import React, {useState} from 'react'
import {Form, Input, Select, TimePicker, Typography} from "antd";
import {WidthSelect} from "../WidthSelect";
import {disabledDateTime} from "../TimeDisabler";
import {MainButton, useShowPopup} from "@vkruglikov/react-telegram-web-app";
import {tg} from "../../tg";

function ByStartTime() {
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

    const showPopup = useShowPopup();
    // const [popupState, setPopupState] = useState({title: 'title', message: 'message',});


    return (
        <div id={"sort-by-start-time"}>

            <Form onFinish={() => {
                // TODO change to tg.showConfirm
                showPopup({
                    title: "Confirm",
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
            }}>

                <Form.Item name="title" rules={[{ required: true }]}>
                    <Typography.Title>Enter title</Typography.Title>
                    <Input />
                </Form.Item>


                <Form.Item name="date" rules={[{ required: true }]}>
                    <Typography.Title>Select Date</Typography.Title>
                    <WidthSelect size={"large"} onSelect={(value) => {
                        setDateSelected(true);
                        console.log("On Select (Date)")
                        setDate(value);
                        setTime(null);
                        setRange(null);
                        setRoom(null);
                        setButtonState({text: "BOOK", show: false, progress: false, disable: false,});
                        // TODO reload changes from backend
                    }} value={date}>
                        <Select.Option value="20.06.2022">20.06.2022</Select.Option>
                        <Select.Option value="21.06.2022">21.06.2022</Select.Option>
                        <Select.Option value="22.06.2022">22.06.2022</Select.Option>
                    </WidthSelect>
                </Form.Item>

                <Form.Item name="time" rules={[{ required: true }]}>
                    <Typography.Title>Select Time of Start</Typography.Title>
                    <TimePicker inputReadOnly={true}
                                disabledTime={disabledDateTime} format={"HH:mm"}
                                minuteStep={5} size={"large"} onSelect={(value) => {
                        setTimeSelected(true);
                        console.log("On Select (Time)");
                        setTime(value);
                        setRange(null);
                        setRoom(null);
                        setButtonState({text: "BOOK", show: false, progress: false, disable: false,});
                        // TODO reload changes from backend
                    }} disabled={!dateSelected} value={time}/>
                </Form.Item>

                <Form.Item name="duration" rules={[{ required: true }]}>
                    <Typography.Title>Select Duration of Booking</Typography.Title>
                    <WidthSelect options={[
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
                        setRoom(null);
                        setButtonState({text: "BOOK", show: false, progress: false, disable: false,});
                        // TODO reload changes from backend
                    }} disabled={(!(dateSelected && timeSelected))} value={range}/>
                </Form.Item>

                <Form.Item name="room" rules={[{ required: true }]}>
                    <Typography.Title>Select Room</Typography.Title>
                    <WidthSelect options={[
                        {value: '304', label: '304'},
                    ]} size={"large"} onSelect={(value) => {
                        setRoomSelected(() => {
                            setButtonState({text: "BOOK", show: true, progress: false, disable: false,});
                            return true;
                        });
                        setRoom(value);
                    }} disabled={!(dateSelected && timeSelected && rangeSelected)} value={room}/>
                </Form.Item>

                <Form.Item name="submit">
                    <div>{buttonState?.show && <MainButton {...buttonState} />}</div>
                </Form.Item>

            </Form>

        </div>
    )
}

export default ByStartTime
