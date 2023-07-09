import React, {useEffect, useState} from 'react'
import {Button, Card, Typography} from "antd";
import styled from "styled-components";
import {DeleteOutlined} from '@ant-design/icons';
import {Booking, bookingsQuery, deleteBooking, Filter} from "../utils/BookingApi";
import {timezone} from "../utils/Utils";

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

    const [loading, setLoading] = useState(true);
    const [cards, setCards] = useState<Booking[]>([]);


    // const onChange = (checked: boolean) => {
    //     setLoading(!checked);
    // };
    //
    // let user: string;
    // let bookings: Booking[];

    const load = async () => {
        let past = new Date();
        past.setFullYear(2020, 5, 5);

        let future = new Date();
        future.setFullYear(2024, 5, 5);

        // const user = await getUsersEmailByTgId(tg.initDataUnsafe.user.id.toString());
        const filter: Filter = {
            started_at_or_after: (past).toISOString(),
            ended_at_or_before: (future).toISOString(),
            room_id_in: [],
            owner_email_in: ["s.sviatkin@innopolis.university"]
        }
        const bookings: Booking[] = await bookingsQuery(filter);
        for (let book of bookings) {
            let start: Date = new Date(book.start);
            let end: Date = new Date(book.end);

            start.setHours(start.getHours() - timezone);
            end.setHours(start.getHours() - timezone);
        }
        console.log(bookings);
        setCards(bookings);

        setLoading(false);
    }

    useEffect(() => {
        load()
    }, []);

    return (
        <div>
            <CenteredTitle>My Bookings</CenteredTitle>
            <CenteredSpace>
                {loading && <CardWithPadding style={{width: 300}} loading={loading} actions={[<DeleteOutlined/>]}>
                </CardWithPadding>}

                {!loading && cards.length === 0 && <p>You have no active bookings!</p>}

                {!loading && cards.map((booking: Booking) =>
                    <CardWithPadding style={{width: 300}}
                                     actions={[<Button onClick={async () => {
                                         const result: boolean = await deleteBooking(booking.id);
                                         if (result) {
                                             window.location.reload();
                                         }
                                     }}><DeleteOutlined/></Button>]}
                                     title={booking.title}
                                     key={booking.id}>
                        <ul>
                            <li>At {(new Date(booking.start).toLocaleDateString(["en-US"],
                                {year: 'numeric', month: 'long', day: 'numeric'}))}</li>
                            <li>From {(new Date(booking.start)).toLocaleTimeString(["ru-RU"], {
                                hour: '2-digit',
                                minute: '2-digit'
                            })} to {(new Date(booking.end)).toLocaleTimeString(["ru-RU"], {
                                hour: '2-digit',
                                minute: '2-digit'
                            })}</li>
                            <li>At {booking.room.name}</li>
                        </ul>
                    </CardWithPadding>)}
            </CenteredSpace>
        </div>
    )
}

