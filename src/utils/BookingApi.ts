import {getDisabledHours, getDisabledMinutes} from "./TimeDisabler";
import {Dayjs} from "dayjs";

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

    let response = await fetch(bookRoomUrl(id), {
        method: 'POST',
        body: JSON.stringify({
            title: title,
            start: start,
            end: end,
            owner_email: owner_email
        })
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
export function getClosestRoundedTime(date: Dayjs, step: number): Dayjs {
    date.set('minute', Math.floor((date.get('minute') + step) / step) * step);
    return date;
}

export async function getTimeByDate(date: Dayjs, step: number): Promise<Dayjs[]> {
    let today: Dayjs = getClosestRoundedTime(new Dayjs(date), step);
    today.set('second', 0);
    today.set('millisecond', 0);

    let tomorrow: Dayjs = new Dayjs(today);
    tomorrow.set('hour', 0);
    tomorrow.set('minute', 0)
    tomorrow.set('day', tomorrow.get('day') + 1);

    let freeSlots: Dayjs[] = [];

    for (let temp: Dayjs = new Dayjs(today); temp < tomorrow; temp.set('minute', temp.get('minute') + step)) {
        let next: Dayjs = new Dayjs(temp);
        next.set('minute', next.get('minute') + step)

        let freeRooms: Room[] = await getFreeRooms(temp.toISOString(), next.toISOString());
        if (!(freeRooms.length === 0)) {
            freeSlots.push(temp);
        }
    }

    return freeSlots;
}


export async function getDurationByTime(date: Dayjs, step: number): Promise<number[]> {
    let startDate: Dayjs = new Dayjs(date);
    startDate.set('second', 0);
    startDate.set('millisecond', 0);

    let endDate: Dayjs = new Dayjs(startDate);
    endDate.set('hour', endDate.get('hour') + 3);

    let freeMinutes: number[] = [];

    for (let temp: Dayjs = new Dayjs(startDate); temp <= endDate; temp.set('minute', temp.get('minute') + step)) {
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

export async function getRoomByTimeAndDuration(date: Dayjs, duration: number): Promise<Room[]> {
    let startDate: Dayjs = new Dayjs(date);
    startDate.set('second', 0);
    startDate.set('millisecond', 0);

    let endDate: Dayjs = new Dayjs(startDate);
    endDate.set('minute', endDate.get('minute') + duration);

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
    value: Dayjs,
}

export function getOptionsOfDate(): DateOption[] {
    let today = new Dayjs(new Date());
    today.set('hour', 0);
    today.set('minute', 0);
    today.set('second', 0);
    today.set('millisecond', 0);

    let tomorrow: Dayjs = new Dayjs(today);
    tomorrow.set('day', today.get('day') + 1);

    let dayAfterTomorrow: Dayjs = new Dayjs(tomorrow);
    dayAfterTomorrow.set('day', tomorrow.get('day') + 1);

    return [
        {
            label: today.toDate().toLocaleDateString(["en-US"],
                {year: 'numeric', month: 'long', day: 'numeric'}),
            value: today
        },
        {
            label: tomorrow.toDate().toLocaleDateString(["en-US"],
                {year: 'numeric', month: 'long', day: 'numeric'}),
            value: tomorrow
        },
        {
            label: dayAfterTomorrow.toDate().toLocaleDateString(["en-US"],
                {year: 'numeric', month: 'long', day: 'numeric'}),
            value: dayAfterTomorrow
        }
    ]
}

export const disabledDateTime = (dates: Dayjs[]): {
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

export async function getDurationsOptions(date: Dayjs, step: number): Promise<DurationOption[]> {
    let data: number[] = await getDurationByTime(date, step);

    return data.map((x: number): DurationOption => {
        let hours: number = Math.floor(x / 60);
        return {
            label: `${hours > 0 ? hours + " Hour" + (hours > 1 ? "s " : "") : ""} ${x % 60 > 0 ? x % 60 + " Minutes" : ""}`,
            value: x
        }
    })
}

export interface RoomOption{
    label:string,
    value:string,
}
export async function getRoomsOptions(date: Dayjs, duration: number) {
    let data: Room[] = await getRoomByTimeAndDuration(date, duration);

    return data.map((x: Room) => {
        return {label: x.name, value: x.id}
    });
}