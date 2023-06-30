# InnoBookingFrontend

Telegram Web App for InnoBookingBot


## 🔴 Live Demo

You can try open demo telegram bot with React WebApp (for Booking page) [@web_app_react_test_bot](https://t.me/web_app_react_test_bot).
Also you can try open demo telegram bot with Rules page [@web_app_react_test2_bot](https://t.me/web_app_react_test2_bot).

## 🔧 Installation & Get started

:one: **Foremost**, you have to do [initializing web apps](https://core.telegram.org/bots/webapps#initializing-web-apps) step, because package has dependency of Telegram Web App context.

:two: **Install dependencies** by running:
```
yarn add react
yarn add react-router-dom
yarn add react-router-hash-link
yarn add antd
yarn add styled-components
yarn add @vkruglikov/react-telegram-web-app
yarn add firebase
```

:three: **Add API url** to .env file.
```
REACT_APP_API_URL='https://url.adress/'
```

:four: **Configure Google Firebase**.
Firestore should look like :
![Structure of database](https://prnt.sc/iuFQxdqmpS1M)

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
yarn start
```


## 🛣 Roadmap

Here's what's coming up:

- [ ] Localization.
- [ ] Page with all bookings.
- [ ] Page with user's bookings and availability to change them.
- [x] Page with rules.
- [x] Main booking features support.