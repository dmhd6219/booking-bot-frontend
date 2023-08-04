# InnoBookingFrontend

Telegram Web App for InnoBookingBot. Made as project for SWP (Software Project) course at Innopolis University.


## 🔴 Live Demo

You can try open demo telegram bot with React WebApp (for Booking page) [@web_app_react_test_bot](https://t.me/web_app_react_test_bot).

## 🔧 Installation & Get started

:one: **Foremost**, you have to do [initializing web apps](https://core.telegram.org/bots/webapps#initializing-web-apps) step, because package has dependency of Telegram Web App context.

:two: **Install dependencies** by running:
```
npm install
```

:three: **Add API url** to .env file.
```
REACT_APP_API_URL='https://url.adress'
```

:four: **ADD url** for notification server to .env file.
```
REACT_APP_BOT_URL='https://url.adress'
```

:four: **Configure Google Firebase**.
Firestore should look like :
![Structure of database](https://i.ibb.co/sbBdyhG/Screenshot-1.png)

:five: **Add Firebase Variables** to .env file.
```
REACT_APP_FIREBASE_API_KEY='firebase API key'
REACT_APP_FIREBASE_AUTH_DOMAIN='firebase auth domain'
REACT_APP_FIREBASE_PROJECT_ID='firebase project id'
REACT_APP_FIREBASE_STORAGE_BUCKET='firebase storage bucket'
REACT_APP_FIREBASE_MESSAGING_SENDER_ID='firebase messaging sender id'
REACT_APP_FIREBASE_APP_ID='firebase app id'
```

:six: **Try it out** by running:
```
npm start
```


## 🛣 Roadmap

Here's what's coming up:

- [ ] Page with all bookings.
- [x] Localization.
- [x] Page with user's bookings and availability to delete them.
- [x] Page with rules.
- [x] Main booking features support.
