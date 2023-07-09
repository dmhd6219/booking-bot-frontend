import React, {useEffect, useState} from 'react'
import {Button, Card, Typography} from "antd";
import styled from "styled-components";
import {DeleteOutlined} from '@ant-design/icons';
import {Booking, bookingsQuery, deleteBooking, Filter} from "../utils/BookingApi";
import {LOCALE, timezone} from "../utils/Utils";
import {isTelegramWindow, tg} from "../utils/TelegramWebApp";
import {useNavigate} from "react-router-dom";
import {BackButton} from "@vkruglikov/react-telegram-web-app";
import {getUsersEmailByTgId} from "../utils/Firebase";

const CenteredSpace = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
`

const CenteredTitle = styled(Typography.Title)`
  text-align: center;
`

const CardWithPadding = styled(Card)`
  margin-top: 5px;
  margin-bottom: 5px;
`


export default function MyBookingsPage() {
    const lang: "en" | "ru" = tg.initDataUnsafe.user.language_code === "ru" ? "ru" : "en";
    const locale: "ru-RU" | "en-US" = lang === "ru" ? "ru-RU" : "en-US";

    const navigate = useNavigate();
    const [buttonState,] = useState<{ show: boolean }>({show: true});

    const [loading, setLoading] = useState(true);
    const [cards, setCards] = useState<Booking[]>([]);


    // const onChange = (checked: boolean) => {
    //     setLoading(!checked);
    // };
    //
    // let user: string;
    // let bookings: Booking[];

    const load = async () => {
        setLoading(true);

        let past = new Date();
        past.setFullYear(2020, 5, 5);

        let future = new Date();
        future.setFullYear(2024, 5, 5);

        const user = await getUsersEmailByTgId(tg.initDataUnsafe.user.id.toString());
        const filter: Filter = {
            started_at_or_after: (past).toISOString(),
            ended_at_or_before: (future).toISOString(),
            room_id_in: [],
            owner_email_in: [user]
        }
        const bookings: Booking[] = await bookingsQuery(filter);
        for (let book of bookings) {
            let start: Date = new Date(book.start);
            let end: Date = new Date(book.end);

            start.setHours(start.getHours() - timezone);
            end.setHours(end.getHours() - timezone);

            book.start = start.toISOString();
            book.end = end.toISOString();
        }
        console.log(bookings);
        setCards(bookings);

        setLoading(false);
    }

    useEffect(() => {
        if (isTelegramWindow) {
            tg.expand();
            tg.BackButton.show();
        }
        load()
    }, []);

    return (
        <div>
            {buttonState.show &&
                <BackButton onClick={() => {
                    navigate("/")
                }}/>
            }

            <CenteredTitle>{LOCALE[lang].My.Title}</CenteredTitle>
            <CenteredSpace>
                {loading && <CardWithPadding style={{width: 300}} loading={loading} actions={[<DeleteOutlined/>]}>
                </CardWithPadding>}

                {!loading && cards.length === 0 && <p>{LOCALE[lang].My.Empty}</p>}

                {!loading && cards.map((booking: Booking) =>
                    <CardWithPadding style={{width: 300}}
                                     actions={[<Button onClick={async () => {
                                         const result: boolean = await deleteBooking(booking.id);
                                         if (result) {
                                             setCards([]);
                                             load();
                                         }
                                     }}><DeleteOutlined/></Button>]}
                                     title={booking.title}
                                     key={booking.id}>
                        <ul>
                            <li>{LOCALE[lang].My.At} {(new Date(booking.start).toLocaleDateString([locale],
                                {year: 'numeric', month: 'long', day: 'numeric'}))}</li>
                            <li>{LOCALE[lang].My.From} {(new Date(booking.start)).toLocaleTimeString(["ru-RU"], {
                                hour: '2-digit',
                                minute: '2-digit'
                            })} {LOCALE[lang].My.To.toLowerCase()} {(new Date(booking.end)).toLocaleTimeString(["ru-RU"], {
                                hour: '2-digit',
                                minute: '2-digit'
                            })}</li>
                            <li>{LOCALE[lang].My.At} {booking.room.name}</li>
                        </ul>
                    </CardWithPadding>)}
            </CenteredSpace>
        </div>
    )
}

