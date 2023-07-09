import React, {FunctionComponent, useEffect, useState} from 'react'
import {Input, Select, TimePicker, Typography} from "antd";
import {MainButton, useShowPopup} from "@vkruglikov/react-telegram-web-app";
import {Dayjs} from 'dayjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import {tg} from "../../utils/TelegramWebApp";

import {
    bookRoom, DateOption, DurationOption,
    getDurationsOptions,
    getOptionsOfDate,
    getRoomsOptions,
    RoomOption
} from "../../utils/BookingApi";
import {getUsersEmailByTgId} from "../../utils/Firebase";

import {range, step} from "../../utils/Utils";

dayjs.extend(customParseFormat);
const Test: FunctionComponent = () => {
    const [dateOptions, setDateOptions] = useState<DateOption[]>([]);
    const [durationOptions, setDurationOptions] = useState<DurationOption[]>([]);
    const [roomOptions, setRoomOptions] = useState<RoomOption[]>([]);

    const [dateSelected, setDateSelected] = useState(false);
    const [timeSelected, setTimeSelected] = useState(false);
    const [rangeSelected, setRangeSelected] = useState(false);
    const [, setRoomSelected] = useState(false);

    const [title, setTitle] = useState<string>("");
    const [date, setDate] = useState<string | null>(null);
    const [time, setTime] = useState<Dayjs | null>(null);
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
    useEffect(() => {
        setDateOptions(getOptionsOfDate());
    }, [])


    return (
        <div id={"time"}>

            <Typography.Title>Date</Typography.Title>
            <Select size={"large"} onSelect={(value: string) => {
                setDateSelected(true);
                console.log("On Select (Date) - " + value)
                setDate(value);
                setTime(null);
                setDuration(null);
                setRoom(null);
                setButtonState({text: "BOOK", show: false, progress: false, disable: false,});

                let cStartDate: Date = new Date(value);
                cStartDate.setHours(0, 0, 0, 0)

                setCompleteStartDate(cStartDate);
                setCompleteEndDate(null);

            }} value={date} options={dateOptions}>
            </Select>

            <Typography.Title>Time of Start</Typography.Title>
            <TimePicker inputReadOnly={true}
                        format={"HH:mm"}
                        minuteStep={step} size={"large"} onSelect={async (value: Dayjs) => {
                setTimeSelected(true);

                console.log(`On Select (Time) - ${value.toISOString()}`);
                setTime(value);
                setDuration(null);
                setRoom(null);
                setButtonState({text: "BOOK", show: false, progress: false, disable: false,});

                (completeStartDate as Date).setHours(value.hour(), value.minute());

                setCompleteStartDate(completeStartDate);
                setCompleteEndDate(null);

                setDurationOptions([]);
                setRoomOptions([]);
                setLoadingDurations(true);
                // TODO reload changes from backend
            }} disabled={!dateSelected} value={time} disabledTime={() => {
                return {
                    disabledHours: () => range(7, 19)
                }
            }} showNow={false} onOpenChange={async (open: boolean) => {
                if (!open) {
                    setDurationOptions(await getDurationsOptions((completeStartDate as Date), step).then((r: DurationOption[]) => {
                        setLoadingDurations(false);
                        return r;
                    }))
                }
            }}/>

            <Typography.Title>Duration of Booking</Typography.Title>
            <Select size={"large"} onSelect={async (value: number) => {
                setRangeSelected(true);
                console.log(`On Select (Range) - ${value}`);
                setDuration(value);
                setRoom(null);
                setButtonState({text: "BOOK", show: false, progress: false, disable: false,});

                let cEndDate: Date = new Date((completeStartDate as Date).toISOString());
                cEndDate.setMinutes((cEndDate as Date).getMinutes() + value);
                setCompleteEndDate(cEndDate);

                setRoomOptions([]);
                setLoadingRooms(true);
                // TODO reload changes from backend
            }} disabled={(!(dateSelected && timeSelected))} value={duration} options={durationOptions}
                    loading={loadingDurations} onDropdownVisibleChange={async (open: boolean) => {
                if (!open) {
                    setRoomOptions(await getRoomsOptions((completeStartDate as Date), duration as number).then((r: RoomOption[]) => {
                        setLoadingRooms(false);
                        return r;
                    }));
                }
            }}/>

            <Typography.Title>Room</Typography.Title>
            <Select size={"large"} onSelect={(value) => {
                setRoomSelected(() => {
                    setButtonState({text: "BOOK", show: true, progress: false, disable: false,});
                    return true;
                });
                setRoom(value);
            }} disabled={!(dateSelected && timeSelected && rangeSelected)} value={room} options={roomOptions}
                    loading={loadingRooms}/>

            <Typography.Title>Title</Typography.Title>
            <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="by-room-input"
            />


            <div>{buttonState?.show && <MainButton {...buttonState} onClick={async () => {
                // TODO change to tg.showConfirm
                showPopup({
                    title: `Confirm ${title}`,
                    message: `Book ${room} at ${(completeEndDate as Date).toLocaleTimeString(["en-US"], {
                        hour: '2-digit',
                        minute: '2-digit'
                    })} for ${duration} minutes?`,
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
                }).then(async (id) => {
                    if (id === "ok") {

                        bookRoom(room as string, title, (completeStartDate as Date).toISOString(), (completeEndDate as Date).toISOString(),
                            await getUsersEmailByTgId(tg.initDataUnsafe.user.id.toString())).then(r => console.log(r));
                        // TODO : make a book
                        setTimeout(() => tg.close(), 500);
                    }
                })
            }}/>}</div>

        </div>
    )
}

export default Test;