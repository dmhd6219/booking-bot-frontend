import React, {useEffect, useState} from 'react'
import {Input, Select, TimePicker, Typography} from "antd";
import {BackButton, MainButton, useShowPopup} from "@vkruglikov/react-telegram-web-app";
import {Dayjs} from 'dayjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {useNavigate} from "react-router-dom";

import {isTelegramWindow, tg} from "../../utils/TelegramWebApp";
import {
    bookRoom, getDurationsOptions, getOptionsOfDate, getRoomsOptions,
    DateOption, DurationOption, RoomOption
} from "../../utils/BookingApi";
import {getUsersEmailByTgId} from "../../utils/Firebase";
import {LOCALE, range, step, timezone} from "../../utils/Utils";

dayjs.extend(customParseFormat);
export default function ByTime() {
    const lang: "en" | "ru" = tg.initDataUnsafe.user.language_code === "ru" ? "ru" : "en";
    const locale: "ru-RU" | "en-US" = lang === "ru" ? "ru-RU" : "en-US";

    const [dateOptions, setDateOptions] = useState<DateOption[]>([]);
    const [durationOptions, setDurationOptions] = useState<DurationOption[]>([]);
    const [roomOptions, setRoomOptions] = useState<RoomOption[]>([]);

    const [title, setTitle] = useState<string>("");
    const [date, setDate] = useState<string | null>(null);
    const [time, setTime] = useState<Dayjs | null>(null);
    const [duration, setDuration] = useState<number | null>(null);
    const [room, setRoom] = useState<string | null>(null);

    const [completeStartDate, setCompleteStartDate] = useState<Date | null>(null);
    const [completeEndDate, setCompleteEndDate] = useState<Date | null>(null);
    const [loadingDurations, setLoadingDurations] = useState<boolean>(false);
    const [loadingRooms, setLoadingRooms] = useState<boolean>(false);

    // Define Telegram Interface items
    const [mainButtonState, setMainButtonState] = useState({
        text: "",
        show: false,
        progress: false,
        disable: false,
    });
    const navigate = useNavigate();
    const [backButtonState,] = useState<{ show: boolean }>({show: true});
    const showPopup = useShowPopup();

    useEffect(() => {
        setDateOptions(getOptionsOfDate());
        if (isTelegramWindow) {
            tg.expand();
            tg.BackButton.show();
        }
    }, [])

    // Handlers of changing values
    const handleDateChange = (value: string): void => {
        setDate(value);
        setTime(null);
        setDuration(null);
        setRoom(null);
        setMainButtonState({text: "", show: false, progress: false, disable: false,});

        let cStartDate: Date = new Date(value);
        cStartDate.setHours(0, 0, 0, 0);

        setCompleteStartDate(cStartDate);
        setCompleteEndDate(null);
    }

    const handleTimeChange = async (value: Dayjs): Promise<void> => {
        setTime(value);
        setDuration(null);
        setRoom(null);
        setMainButtonState({text: "", show: false, progress: false, disable: false,});

        (completeStartDate as Date).setHours(timezone + value.hour(), value.minute());

        setCompleteStartDate(completeStartDate);
        setCompleteEndDate(null);

        setDurationOptions([]);
        setRoomOptions([]);
        setLoadingDurations(true);
    }

    const handleDurationChange = async (value: number): Promise<void> => {
        setDuration(value);
        setRoom(null);
        setMainButtonState({text: "BOOK", show: false, progress: false, disable: false,});

        let cEndDate: Date = new Date((completeStartDate as Date).toISOString());
        cEndDate.setMinutes((cEndDate as Date).getMinutes() + value);
        setCompleteEndDate(cEndDate);

        setRoomOptions([]);
        setLoadingRooms(true);
    }

    const handleRoomChange = (value: string): void => {
        setMainButtonState({
            text: LOCALE[lang].Book.Book.toUpperCase(),
            show: true,
            progress: false,
            disable: false,
        });

        setRoom(value);
    }

    // loaders of dynamic data

    /**
     * Loads available rooms
     */
    const loadRooms = async (): Promise<void> => {
        setRoomOptions(await getRoomsOptions((completeStartDate as Date), duration as number).then((r: RoomOption[]) => {
            setLoadingRooms(false);
            return r;
        }));
    }

    /**
     * Loads available durations
     */
    const loadDurations = async (): Promise<void> => {
        setDurationOptions(await getDurationsOptions((completeStartDate as Date), step).then((r: DurationOption[]) => {
            setLoadingDurations(false);
            return r;
        }))
    }


    /**
     * Generates content for confirmation button
     */
    const generateConfirmParams = () => {
        let cStartDate: Date = new Date((completeStartDate as Date).toISOString());
        cStartDate.setHours(cStartDate.getHours() - timezone);

        return {
            title: `${LOCALE[lang].Book.Confirm} ${title}`,
            message: `${LOCALE[lang].Book.Book} ${room} ${LOCALE[lang].Book.At.toLowerCase()} ${cStartDate.toLocaleTimeString([locale], {
                hour: '2-digit',
                minute: '2-digit'
            })} ${LOCALE[lang].Book.For.toLowerCase()} ${duration} ${LOCALE[lang].Book.Minutes.toLowerCase()}?`,
            buttons: [
                {
                    id: "ok",
                    type: 'ok',
                },
                {
                    id: "cancel",
                    type: 'destructive',
                    text: LOCALE[lang].Book.Cancel,
                },
            ],
        }
    }

    /**
     * Handles click on Main Button
     * If button is pressed => room will be booked
     */
    const handleMainButtonClick = async () => {
        showPopup(generateConfirmParams()).then(async (id: string) => {
            if (id === "ok") {
                bookRoom(room as string, title, (completeStartDate as Date).toISOString(), (completeEndDate as Date).toISOString(),
                    await getUsersEmailByTgId(tg.initDataUnsafe.user.id.toString())).then(r => {
                    console.log(r);
                    navigate("/");
                });
            }
        })
    }

    return (
        <div id={"time"}>
            {backButtonState.show &&
                <BackButton onClick={() => navigate("/")}/>
            }

            <Typography.Title>{LOCALE[lang].Book.Date}</Typography.Title>
            <Select size={"large"} onSelect={handleDateChange} value={date} options={dateOptions}>
            </Select>

            <Typography.Title>{LOCALE[lang].Book.Time}</Typography.Title>
            <TimePicker inputReadOnly={true}
                        format={"HH:mm"}
                        minuteStep={step}
                        size={"large"}
                        onSelect={handleTimeChange}
                        disabled={date === null}
                        value={time} disabledTime={() => {
                return {
                    disabledHours: () => range(7, 19)
                }
            }} showNow={false}
                // on close => start loading durations
                        onOpenChange={async (open: boolean) => {
                            if (!open) {
                                loadDurations();
                            }
                        }}/>

            <Typography.Title>{LOCALE[lang].Book.Duration}</Typography.Title>
            <Select size={"large"} onSelect={handleDurationChange}
                    disabled={(date === null) && (time === null)}
                    value={duration} options={durationOptions}
                    loading={loadingDurations}

                // on close => start loading rooms
                    onDropdownVisibleChange={async (open: boolean) => {
                        if (!open) {
                            loadRooms();
                        }
                    }}/>

            <Typography.Title>{LOCALE[lang].Book.Room}</Typography.Title>
            <Select size={"large"} onSelect={handleRoomChange}
                    disabled={(date === null) && (time === null) && (duration === null)}
                    value={room}
                    options={roomOptions}
                    loading={loadingRooms}/>

            <Typography.Title>{LOCALE[lang].Book.Title}</Typography.Title>
            <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />


            {mainButtonState?.show &&
                <MainButton {...mainButtonState} onClick={handleMainButtonClick}/>
            }

        </div>
    )
}
