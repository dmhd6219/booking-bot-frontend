import net from "net";

export function sendNotification() {
    const socket = new net.Socket()
    socket.connect(`${process.env.REACT_APP_NOTIFICATIONS_URL}`)

    socket.write("asda");
}