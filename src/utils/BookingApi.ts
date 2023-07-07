import {getDisabledHours, getDisabledMinutes} from "./TimeDisabler";
import {Dayjs} from "dayjs";
import {Moment} from "moment/moment";
import moment from "moment";

export const apiUrl: string = `${process.env.REACT_APP_API_URL}`;
export const roomsUrl: string = `${apiUrl}/rooms`;
export const freeRoomsUrl: string = `${roomsUrl}/free`

export const bookRoomUrl = (room_id: string): string => `${roomsUrl}/${room_id}/book`

export const bookingsQueryUrl: string = `${apiUrl}/bookings/query`

export const deleteBookingUrl = (booking_id: string): string => `${apiUrl}/bookings/${booking_id}`

interface Room {
    name: string,
    id: string,
    type: string,
    capacity: number
}

export async function getRooms(): Promise<Room[]> {
    console.log("Fetching rooms...");
    let response = await fetch(roomsUrl);

    return response.json();
}

// type DateIso = `${number}${number}${number}${number}-${number}${number}-
//         ${number}${number}T${number}${number}:${number}${number}:${number}${number}.${number}${number}${number}Z`
type DateIso = string;

export async function getFreeRooms(start: DateIso, end: DateIso): Promise<Room[]> {
    console.log("Fetching free rooms...");

    let response = await fetch(freeRoomsUrl, {
        method: 'POST',
        body: JSON.stringify({
            start: start,
            end: end
        })
    });

    return response.json();

}

type UniversityEmail = `${string}.${string}@innopolis.university`;

interface Booking {
    id: string,
    title: string,
    start: string,
    end: string,
    room: Room,
    owner_email: UniversityEmail;
}

export async function bookRoom(id: string, title: string, start: DateIso, end: DateIso, owner_email: UniversityEmail) {
    console.log("Fetching book rooms...");

    let body = JSON.stringify({
        title: title,
        start: start,
        end: end,
        owner_email: owner_email
    });

    console.log(body)

    let response = await fetch(bookRoomUrl(id), {
        method: 'POST',
        body: body
    });

    console.log(`Book response - ${response.status}`)

    return response.json();
}

interface Filter {
    started_at_or_after?: DateIso,
    ended_at_or_before?: DateIso,
    room_id_in?: string[],
    owner_email_in?: string[]
}

export async function bookingsQuery(filter: Filter): Promise<Booking[]> {
    console.log("Fetching books query...");

    let response = await fetch(bookingsQueryUrl, {
        method: 'POST',
        body: JSON.stringify({
            filter: filter
        })
    });

    return response.json();
}


export async function deleteBooking(id: string): Promise<boolean> {
    console.log("Deleting rooms...");

    let response = await fetch(deleteBookingUrl(id), {
        method: 'DELETE'
    });

    return response.ok;
}

// actually logic

// By Start Time sorting
export function getClosestRoundedTime(date: Date, step: number): Date {
    date.setMinutes(Math.floor((date.getMinutes() + step) / step) * step)
    return date;
}

export async function getTimeByDate(date: Date, step: number): Promise<Date[]> {
    let today: Date = getClosestRoundedTime(new Date(date), step);
    today.setSeconds(0, 0);

    let tomorrow: Date = new Date(today);
    tomorrow.setHours(0, 0, 0, 0);
    tomorrow.setDate(tomorrow.getDate() + 1);

    let freeSlots: Date[] = [];

    for (let temp: Date = new Date(today); temp < tomorrow; temp.setMinutes(temp.getMinutes() + step)) {
        let next: Date = new Date(temp);
        next.setMinutes(next.getMinutes() + step)

        let freeRooms: Room[] = await getFreeRooms(temp.toISOString(), next.toISOString());
        if (!(freeRooms.length === 0)) {
            freeSlots.push(temp);
        }
    }

    return freeSlots;
}


export async function getDurationByTime(date: Date, step: number): Promise<number[]> {
    let startDate: Date = new Date(date);
    startDate.setSeconds(0, 0);

    let endDate: Date = new Date(startDate);
    endDate.setHours(endDate.getHours() + 3);

    let freeMinutes: number[] = [];

    for (let temp: Date = new Date(startDate); temp <= endDate; temp.setMinutes(temp.getMinutes() + step)) {
        let freeRooms: Room[] = await getFreeRooms(startDate.toISOString(), temp.toISOString());

        if (!(freeRooms.length === 0)) {
            // @ts-ignore
            let diff: number = Math.abs((temp - startDate) / (1000 * 60));
            if (diff > 0) {
                freeMinutes.push(diff);
            }
        }

    }

    return freeMinutes;
}

export async function getRoomByTimeAndDuration(date: Date, duration: number): Promise<Room[]> {
    let startDate: Date = new Date(date);
    startDate.setSeconds(0,0)

    let endDate: Date = new Date(startDate);
    endDate.setMinutes(endDate.getMinutes() + duration);

    let availableRooms: Room[] = [];

    let freeRooms: Room[] = await getFreeRooms(startDate.toISOString(), endDate.toISOString());

    for (let room of freeRooms) {
        availableRooms.push(room);
    }

    return availableRooms;
}

// Form valid options

export interface DateOption {
    label: string,
    value: string,
}

export function getOptionsOfDate(): DateOption[] {
    let today: Date = new Date();
    today.setHours(0,0,0,0)

    let tomorrow: Date = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    let dayAfterTomorrow: Date = new Date(tomorrow);
    dayAfterTomorrow.setDate(tomorrow.getDate() + 1);

    return [
        {
            label: today.toLocaleDateString(["en-US"],
                {year: 'numeric', month: 'long', day: 'numeric'}),
            value: today.toISOString()
        },
        {
            label: tomorrow.toLocaleDateString(["en-US"],
                {year: 'numeric', month: 'long', day: 'numeric'}),
            value: tomorrow.toISOString()
        },
        {
            label: dayAfterTomorrow.toLocaleDateString(["en-US"],
                {year: 'numeric', month: 'long', day: 'numeric'}),
            value: dayAfterTomorrow.toISOString()
        }
    ]
}

export const disabledDateTime = (dates: Date[]): {
    disabledHours: () => number[],
    disabledMinutes: (selectedHour: number) => number[]
} => ({
    disabledHours: (): number[] => getDisabledHours(dates),
    disabledMinutes: (selectedHour: number): number[] => getDisabledMinutes(dates, selectedHour),
});

export interface DurationOption {
    label: string,
    value: number
}

export async function getDurationsOptions(date: Date, step: number): Promise<DurationOption[]> {
    let data: number[] = await getDurationByTime(date, step);

    return data.map((x: number): DurationOption => {
        let hours: number = Math.floor(x / 60);
        return {
            label: `${hours > 0 ? hours + " Hour" + (hours > 1 ? "s " : "") : ""} ${x % 60 > 0 ? x % 60 + " Minutes" : ""}`,
            value: x
        }
    })
}

export interface RoomOption {
    label: string,
    value: string,
}

export async function getRoomsOptions(date: Date, duration: number) {
    let data: Room[] = await getRoomByTimeAndDuration(date, duration);

    return data.map((x: Room) => {
        return {label: x.name, value: x.id}
    });
}