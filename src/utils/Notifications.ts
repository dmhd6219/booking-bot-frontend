import WebSocket from 'ws';

const ws = new WebSocket(`${process.env.REACT_APP_NOTIFICATIONS_URL}`);


export function sendNotification() {
    ws.send(0)
}