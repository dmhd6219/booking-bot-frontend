import axios from "axios";

const uri = `${process.env.REACT_APP_NOTIFICATIONS_URL}`

export function sendNotification() {
    console.log("pressed")
    axios.get(uri).then(r => {
        console.log(r)
    })
}