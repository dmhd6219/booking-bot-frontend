# InnoBookingFrontend
![License](https://img.shields.io/github/license/dmhd6219/SocialNetwork)
![React](https://img.shields.io/badge/React-blue.svg)
![Telegram Web App](https://img.shields.io/badge/Telegram%20Web%20App-brightgreen.svg)

Please note that you should replace "yourusername" in the links with your actual GitHub username or the organization name where the repositories are hosted. Also, make sure to update the React version in the badge with the version you are using in your project. For Telegram Web App, you can update the "Latest" text with the appropriate version number. And don't forget to replace the license with the one you are using for each project.
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
