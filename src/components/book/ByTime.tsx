import React, {FunctionComponent, useState} from 'react'
import {Input, Select, TimePicker, Typography} from "antd";
import {MainButton, useShowPopup} from "@vkruglikov/react-telegram-web-app";
import type {Dayjs} from 'dayjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import {tg} from "../../utils/TelegramWebApp";

dayjs.extend(customParseFormat);
const ByTime: FunctionComponent<{
    typeOfTime: string,
}> = ({
          typeOfTime = "Start",
      },) => {
    const [dateSelected, setDateSelected] = useState(false);
    const [timeSelected, setTimeSelected] = useState(false);
    const [rangeSelected, setRangeSelected] = useState(false);
    const [, setRoomSelected] = useState(false);

    const [title, setTitle] = useState<string>("");
    const [date, setDate] = useState<string | null>(null);
    const [time, setTime] = useState<undefined | null | Dayjs>(null);
    const [range, setRange] = useState<string | null>(null);
    const [room, setRoom] = useState<string | null>(null);


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
            <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="by-room-input"
            />

            <Typography.Title>Date</Typography.Title>
            <Select size={"large"} onSelect={(value: string) => {
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
            </Select>

            <Typography.Title>Time of {typeOfTime}</Typography.Title>
                {/*TODO make different versions that depend on time*/}
            <TimePicker inputReadOnly={true}
                        format={"HH:mm"}
                        minuteStep={5} size={"large"} onSelect={(value) => {
                setTimeSelected(true);
                console.log("On Select (Time)");
                setTime(value);
                setRange(null);
                setRoom(null);
                setButtonState({text: "BOOK", show: false, progress: false, disable: false,});
                // TODO reload changes from backend
            }} disabled={!dateSelected} value={time}/>

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
                setRoom(null);
                setButtonState({text: "BOOK", show: false, progress: false, disable: false,});
                // TODO reload changes from backend
            }} disabled={(!(dateSelected && timeSelected))} value={range}/>

            <Typography.Title>Room</Typography.Title>
            <Select options={[
                {value: '304', label: '304'},
            ]} size={"large"} onSelect={(value) => {
                setRoomSelected(() => {
                    setButtonState({text: "BOOK", show: true, progress: false, disable: false,});
                    return true;
                });
                setRoom(value);
            }} disabled={!(dateSelected && timeSelected && rangeSelected)} value={room}/>


            <div>{buttonState?.show && <MainButton {...buttonState} onClick={() => {
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

export default ByTime;
