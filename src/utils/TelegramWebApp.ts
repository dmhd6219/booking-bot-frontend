// @ts-ignore
export const tg = window.Telegram.WebApp;
// const user: number = window.Telegram.WebApp.initData.user.id;

console.log(tg);

export const isTelegramWindow : boolean = tg.initData !== "";

export const lang: "en" | "ru" = tg.initDataUnsafe.user.language_code === "ru" ? "ru" : "en";
export const locale: "ru-RU" | "en-US" = lang === "ru" ? "ru-RU" : "en-US";