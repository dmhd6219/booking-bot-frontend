const uri = `${process.env.REACT_APP_NOTIFICATIONS_URL}`

export function sendNotification() {
    let connection = new WebSocket(uri);
    connection.onopen = () => {
        connection.send('asda');
    }


}