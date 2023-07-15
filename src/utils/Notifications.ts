import axios from "axios";

const url = `${process.env.REACT_APP_BOT_URL}`

export function sendNotification() {
    axios.get(url).then(r => {
        console.log(r)
    })
}