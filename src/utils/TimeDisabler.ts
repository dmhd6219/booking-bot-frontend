import {range, step} from "./Utils";
import {getClosestRoundedTime} from "./BookingApi";
import {Dayjs} from "dayjs";
import {Moment} from "moment/moment";
import moment from "moment";

export const allHours = range(0, 24);
export const allMinutes = range(0, 60, step);

// type DisabledTime = (now: Dayjs) => {
//     disabledHours?: () => number[];
//     disabledMinutes?: (selectedHour: number) => number[];
//     disabledSeconds?: (selectedHour: number, selectedMinute: number) => number[];
// };

export function getDisabledHours(dates: Date[]): number[] {
    let meetedHours: number[] = [];
    for (let hour of allHours) {

        for (let date of dates) {
            if (date.getHours() === hour) {
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

export function getDisabledMinutes(dates: Date[], selectedHour: number): number[] {
    let meetedMinutes: number[] = [];
    for (let hour of allHours) {

        for (let date of dates) {
            if (date.getHours() === hour && date.getHours() === selectedHour) {
                meetedMinutes.push(hour);
            }
        }

    }

    let today: Date = getClosestRoundedTime(new Date(), step);

    return allMinutes.filter(x => !meetedMinutes.includes(x) || (selectedHour === today.getHours() && x < today.getMinutes()));
}

