import React, {useEffect, useState} from 'react'
import {List, Typography} from "antd";
import {BackButton} from "@vkruglikov/react-telegram-web-app";
import {useNavigate} from "react-router-dom";
import {isTelegramWindow, lang, tg} from "../utils/TelegramWebApp";
import styled from "styled-components";
import {LOCALE} from "../utils/Utils";
import {getAvailableRoomOptions, Room} from "../utils/BookingApi";

const CenteredTitle = styled(Typography.Title)`
  text-align: center;
`

export default function AvailableRooms() {
    const navigate = useNavigate();
    const [buttonState,] = useState<{ show: boolean }>({show: true});

    const [rooms, setRooms] = useState<Room[]>([]);
    const [loadingRooms, setLoadingRooms] = useState<boolean>(true);

    useEffect(() => {
        console.log("opened 1st time");
        if (isTelegramWindow) {
            tg.expand();
        }

        getAvailableRoomOptions().then((r: Room[]) => {
            setRooms(r);
            setLoadingRooms(false);
        });
    }, []);

    return (
        <div>
            {buttonState.show &&
                <BackButton onClick={() => {
                    navigate("/")
                }}/>
            }

            <CenteredTitle>{LOCALE[lang].Rooms.Title}</CenteredTitle>

            <List
                bordered
                dataSource={rooms}
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                            title={item.name}
                            description={`${LOCALE[lang].Rooms.Capacity} ${item.capacity} ${LOCALE[lang].Rooms.Places.toLowerCase()}.`}
                        />
                    </List.Item>
                )}
                loading={loadingRooms}
            />
        </div>

    )
}

