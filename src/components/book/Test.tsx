import React, {FunctionComponent, useEffect, useState} from 'react'
import {Button, Input, Select, TimePicker, Typography} from "antd";
import {MainButton, useShowPopup} from "@vkruglikov/react-telegram-web-app";
import type {Dayjs} from 'dayjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import {isDebug, tg} from "../../utils/TelegramWebApp";
import {getTestDurations, getTestRooms} from "../../utils/TestData";
import {range} from "../../utils/Utils"

import {
    bookRoom,
    getDurationsOptions,
    getOptionsOfDate,
    getRooms,
    getRoomsOptions,
    getTimeByDate
} from "../../utils/BookingApi";
import {getUsersEmailByTgId} from "../../utils/Firebase";
import {getDisabledHours, getDisabledMinutes} from "../../utils/TimeDisabler";

import {step} from "../../utils/Utils";

dayjs.extend(customParseFormat);
const Test: FunctionComponent = () => {
    const [dateOptions, setDateOptions] = useState<{ label: string, value: string }[]>([]);
    const [durationOptions, setDurationOptions] = useState<{ label: string, value: number }[]>([]);
    const [roomOptions, setRoomOptions] = useState<{ label: string, value: string }[]>([]);

    const [dateSelected, setDateSelected] = useState(false);
    const [timeSelected, setTimeSelected] = useState(false);
    const [rangeSelected, setRangeSelected] = useState(false);
    const [, setRoomSelected] = useState(false);

    const [title, setTitle] = useState<string>("");
    const [date, setDate] = useState<string | null>(null);
    const [time, setTime] = useState<undefined | null | Dayjs>(null);
    const [duration, setDuration] = useState<number | null>(null);
    const [room, setRoom] = useState<string | null>(null);

    const [completeStartDate, setCompleteStartDate] = useState<Date | null>(null);
    const [completeEndDate, setCompleteEndDate] = useState<Date | null>(null);
    const [loadingDurations, setLoadingDurations] = useState<boolean>(false);
    const [loadingRooms, setLoadingRooms] = useState<boolean>(false);


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

    useEffect(() => {
        setDateOptions(getOptionsOfDate());
    }, [])


    return (
        <div id={"test-book"}>

            <Typography.Title>Test Date</Typography.Title>
            <Select size={"large"} onSelect={async (value: string) => {
                setDateSelected(true);
                console.log("On Select (Date)")
                setDate(value);
                setTime(null);
                setDuration(null);
                setRoom(null);
                setButtonState({text: "BOOK", show: false, progress: false, disable: false,});

                let completeStartDate = new Date(value);
                completeStartDate.setUTCHours(0, 0, 0, 0);
                setCompleteStartDate(completeStartDate);
                setCompleteEndDate(null);

                // TODO reload changes from backend
            }} value={date} options={dateOptions}>
            </Select>

            <Typography.Title>Test Time of Start</Typography.Title>
            <TimePicker inputReadOnly={true}
                        format={"HH:mm"}
                        minuteStep={step} size={"large"} onSelect={async (value) => {
                setTimeSelected(true);

                console.log("On Select (Time)");
                setTime(value);
                setDuration(null);
                setRoom(null);
                setButtonState({text: "BOOK", show: false, progress: false, disable: false,});

                (completeStartDate as Date).setUTCHours(value.hour(), value.minute(), 0, 0);
                setCompleteStartDate(completeStartDate);
                setCompleteEndDate(null);

                setDurationOptions([]);
                setRoomOptions([]);
                setLoadingDurations(true);
                // TODO reload changes from backend
            }} disabled={!dateSelected} value={time} disabledTime={(now: Dayjs) => {
                return {
                    disabledHours: () => range(7, 19)
                }
            }} showNow={false} onOpenChange={async (open: boolean) => {
                if (!open) {
                    setDurationOptions(await getDurationsOptions((completeStartDate as Date).toISOString(), step).then((r) => {
                        setLoadingDurations(false);
                        return r;
                    }))
                }
            }}/>

            <Typography.Title>Test Duration of Booking</Typography.Title>
            <Select size={"large"} onSelect={async (value) => {
                setRangeSelected(true);
                console.log("On Select (Range)");
                setDuration(value);
                setRoom(null);
                setButtonState({text: "BOOK", show: false, progress: false, disable: false,});

                let completeEndDate = new Date((completeStartDate as Date).toISOString());
                completeEndDate.setMinutes(completeEndDate.getMinutes() + (duration as number));
                setCompleteEndDate(completeEndDate);

                setRoomOptions([]);
                setLoadingRooms(true);
                // TODO reload changes from backend
            }} disabled={(!(dateSelected && timeSelected))} value={duration} options={durationOptions}
                    loading={loadingDurations} onDropdownVisibleChange={async (open: boolean) => {
                if (!open) {
                    setRoomOptions(await getRoomsOptions((completeStartDate as Date).toISOString(), duration as number).then((r) => {
                        setLoadingRooms(false);
                        return r;
                    }));
                }
            }}/>

            <Typography.Title>Test Room</Typography.Title>
            <Select size={"large"} onSelect={(value) => {
                setRoomSelected(() => {
                    setButtonState({text: "BOOK", show: true, progress: false, disable: false,});
                    return true;
                });
                setRoom(value);
            }} disabled={!(dateSelected && timeSelected && rangeSelected)} value={room} options={roomOptions}
                    loading={loadingRooms}/>

            <Typography.Title>Test Title</Typography.Title>
            <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="by-room-input"
            />

            {buttonState?.show && isDebug && <Button onClick={async () => {
                let completeStartDate = new Date(date as string);
                let timeISO = new Date(time?.toISOString() as string);
                completeStartDate.setUTCHours(timeISO.getUTCHours(), timeISO.getUTCMinutes(), 0, 0);
                let completeEndDate = new Date(completeStartDate.toISOString());
                completeEndDate.setMinutes(completeEndDate.getMinutes() + (duration as number));

                bookRoom(room as string, title, completeStartDate.toISOString(), completeEndDate.toISOString(),
                    "a.savchenko@innopolis.university").then(r => console.log(r));

                console.log(`Title - ${title}`)
                console.log(`Date - ${completeStartDate.toLocaleDateString(["en-US"], {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}`)
                console.log(`Time - ${time}`)
                console.log(`Duration - ${duration} minutes`)
                console.log(`Room - ${room}`)

                console.log(`Start - ${completeStartDate.toISOString()}`)
                console.log(`End - ${completeEndDate.toISOString()}`)

                console.log(await getUsersEmailByTgId())


                //completeStartDate.setHours((time?.toISOString() as number), time?.minute(), 0, 0);
                //let completeEndDate = new Date(completeStartDate.toISOString())


            }} type="primary">Test Book</Button>}


            <div>{buttonState?.show && <MainButton {...buttonState} onClick={() => {
                // TODO change to tg.showConfirm
                showPopup({
                    title: `Confirm ${title}`,
                    message: `Book ${room} at ${time} for ${duration} minutes?`,
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

                        bookRoom(room as string, title, (completeStartDate as Date).toISOString(), (completeEndDate as Date).toISOString(),
                            "a.savchenko@innopolis.university").then(r => console.log(r));
                        // TODO : make a book
                        setTimeout(() => tg.close(), 500);
                    }
                })
            }}/>}</div>

        </div>
    )
}

export default Test;