import axios from "axios";

const url = `${process.env.REACT_APP_BOT_URL}/ntfctn`

export function sendNotification() {
    axios.post(url).then(r => {
        console.log(r);
        console.log(r.status);
        console.log(r.data);
    })
}