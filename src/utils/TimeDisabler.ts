import {range, step} from "./Utils";
import {getClosestRoundedTime} from "./BookingApi";

export const allHours = range(0, 24);
export const allMinutes = range(0, 60, step);

// type DisabledTime = (now: Dayjs) => {
//     disabledHours?: () => number[];
//     disabledMinutes?: (selectedHour: number) => number[];
//     disabledSeconds?: (selectedHour: number, selectedMinute: number) => number[];
// };

export function getDisabledHours(date: Date): number[] {
    let constantlyRemoved = range(7, 19);

    return allHours.filter((x: number) => constantlyRemoved.includes(x) ||
        (date.getDay() === (new Date()).getDay() && x < (new Date()).getHours()));
}

export function getDisabledMinutes(date: Date, selectedHour: number): number[] {
    let today: Date = getClosestRoundedTime(new Date(), step);

    return allMinutes.filter(x => (selectedHour === today.getHours() && x < today.getMinutes()));
}

