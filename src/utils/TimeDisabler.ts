import {range} from "./Utils";
import {getClosestRoundedTime} from "./BookingApi";

export const allHours = range(0, 24);
export const allMinutes = range(0, 60, 15);

// type DisabledTime = (now: Dayjs) => {
//     disabledHours?: () => number[];
//     disabledMinutes?: (selectedHour: number) => number[];
//     disabledSeconds?: (selectedHour: number, selectedMinute: number) => number[];
// };

function getDisabledHours(dates: Date[]) {
    let meetedHours: number[] = [];
    for (let hour of allHours) {

        for (let date of dates) {
            if (date.getHours() === hour) {
                meetedHours.push(hour);
            }
        }

    }

    let disabledHours = allHours.filter(x => !meetedHours.includes(x) || x < (new Date()).getHours());
    for (let hour of range(7, 19)) {
        if (!disabledHours.includes(hour)) {
            disabledHours.push(hour)
        }
    }
    return disabledHours;
}

function getDisabledMinutes(dates: Date[], selectedHour: number) {
    let meetedMinutes: number[] = [];
    for (let hour of allHours) {

        for (let date of dates) {
            if (date.getHours() === hour && date.getHours() === selectedHour) {
                meetedMinutes.push(hour);
            }
        }

    }

    let today = getClosestRoundedTime(new Date(), 15);

    return allHours.filter(x => !meetedMinutes.includes(x) || (selectedHour === today.getHours() && x < today.getMinutes()));
}

export const disabledDateTime = (dates: Date[]): {
    disabledHours: () => number[],
    disabledMinutes: (selectedHour: number) => number[]
} => ({
    disabledHours: (): number[] => getDisabledHours(dates),
    disabledMinutes: (selectedHour: number): number[] => getDisabledMinutes(dates, selectedHour),
});
