// @ts-ignore
export const tg = window.Telegram.WebApp;
// const user: number = window.Telegram.WebApp.initData.user.id;

console.log(tg);

export const isTelegramWindow : boolean = tg.initData !== "";