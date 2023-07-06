import {range, step} from "./Utils";
import {getClosestRoundedTime} from "./BookingApi";
import {Dayjs} from "dayjs";

export const allHours = range(0, 24);
export const allMinutes = range(0, 60, step);

// type DisabledTime = (now: Dayjs) => {
//     disabledHours?: () => number[];
//     disabledMinutes?: (selectedHour: number) => number[];
//     disabledSeconds?: (selectedHour: number, selectedMinute: number) => number[];
// };

export function getDisabledHours(dates: Dayjs[]): number[] {
    let meetedHours: number[] = [];
    for (let hour of allHours) {

        for (let date of dates) {
            if (date.get('hour') === hour) {
                meetedHours.push(hour);
            }
        }

    }

    let disabledHours: number[] = allHours.filter((x: number) => !meetedHours.includes(x) || x < (new Dayjs()).get('hour'));
    for (let hour of range(7, 19)) {
        if (!disabledHours.includes(hour)) {
            disabledHours.push(hour)
        }
    }
    return disabledHours;
}

export function getDisabledMinutes(dates: Dayjs[], selectedHour: number): number[] {
    let meetedMinutes: number[] = [];
    for (let hour of allHours) {

        for (let date of dates) {
            if (date.get('hour') === hour && date.get('hour') === selectedHour) {
                meetedMinutes.push(hour);
            }
        }

    }

    let today: Dayjs = getClosestRoundedTime(new Dayjs(), step);

    return allMinutes.filter(x => !meetedMinutes.includes(x) || (selectedHour === today.get('hour') && x < today.get('minute')));
}

