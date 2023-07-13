import axios, {AxiosResponse} from "axios";
import {lang, locale} from "./TelegramWebApp";
import {daysToChoose, UniversityEmail} from "./Utils";

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


export async function getRooms(): Promise<AxiosResponse<Room[] | ErrorType>> {
    console.log("Fetching rooms...");


    return await axios.get(roomsUrl, {headers: {"Accept-Language": locale}});
}

export type DateIso = string;

export async function getFreeRooms(start: DateIso, end: DateIso): Promise<AxiosResponse<Room[] | ErrorType>> {
    console.log("Fetching free rooms...");

    return await axios.post(freeRoomsUrl, JSON.stringify({
        start: start,
        end: end
    }), {headers: {"Accept-Language": locale}});

}


export interface Booking {
    id: string,
    title: string,
    start: string,
    end: string,
    room: Room,
    owner_email: UniversityEmail;
}

export async function bookRoom(id: string, title: string, start: DateIso, end: DateIso, owner_email: UniversityEmail): Promise<AxiosResponse<Booking | ErrorType>> {

    let body = JSON.stringify({
        title: title,
        start: start,
        end: end,
        owner_email: owner_email
    });

    return await axios.post(bookRoomUrl(id), body, {headers: {"Accept-Language": locale}});
}

export interface Filter {
    started_at_or_after?: DateIso,
    ended_at_or_before?: DateIso,
    room_id_in?: string[],
    owner_email_in?: UniversityEmail[]
}

export async function bookingsQuery(filter: Filter): Promise<AxiosResponse<Booking[] | ErrorType>> {
    console.log("Fetching books query...");


    let response: AxiosResponse = await axios.post(bookingsQueryUrl, JSON.stringify({filter: filter}), {headers: {"Accept-Language": locale}});
    console.log("Fetched query")
    return response;
}


export async function deleteBooking(id: string): Promise<AxiosResponse<string | ErrorType>> {
    console.log("Deleting rooms...");


    return await axios.delete(deleteBookingUrl(id), {headers: {"Accept-Language": locale}});
}

export interface ErrorType {
    detail: {
        loc: string,
        msg: string,
        type: string
    }[]
}


// actually logic

// By Start Time sorting
export function getClosestRoundedTime(date: Date, step: number): Date {
    date.setMinutes(Math.floor((date.getMinutes() + step) / step) * step)
    return date;
}

export async function getTimeByDate(date: Date, step: number): Promise<Date[]> {
    let today: Date = getClosestRoundedTime(new Date(date.toISOString()), step);
    today.setSeconds(0, 0);

    let tomorrow: Date = new Date(today.toISOString());
    tomorrow.setHours(0, 0, 0, 0);
    tomorrow.setDate(tomorrow.getDate() + 1);

    let freeSlots: Date[] = [];

    for (let temp: Date = new Date(today.toISOString()); temp < tomorrow; temp.setMinutes(temp.getMinutes() + step)) {
        let next: Date = new Date(temp.toISOString());
        next.setMinutes(next.getMinutes() + step)

        let response: AxiosResponse = await getFreeRooms(temp.toISOString(), next.toISOString());
        if (response.status === 200) {
            let freeRooms: Room[] = (response).data;
            if (!(freeRooms.length === 0)) {
                freeSlots.push(temp);
            }
        }

    }

    return freeSlots;
}


export async function getDurationByTime(date: Date, step: number): Promise<number[]> {
    let startDate: Date = new Date(date.toISOString());
    startDate.setSeconds(0, 0);

    let endDate: Date = new Date(startDate.toISOString());
    endDate.setHours(endDate.getHours() + 3);

    let freeMinutes: number[] = [];

    for (let temp: Date = new Date(startDate.toISOString()); temp <= endDate; temp.setMinutes(temp.getMinutes() + step)) {
        let response: AxiosResponse = await getFreeRooms(startDate.toISOString(), temp.toISOString());
        if (response.status === 200) {
            let freeRooms: Room[] = (response).data;

            if (!(freeRooms.length === 0)) {
                // @ts-ignore
                let diff: number = Math.abs((temp - startDate) / (1000 * 60));
                console.log("temp - " + temp.toISOString())
                if (diff > 0 && temp.getHours() > 18 && temp.getHours() < 7) {
                    freeMinutes.push(diff);
                }
            }
        }


    }

    return freeMinutes;
}

export async function getRoomByTimeAndDuration(date: Date, duration: number): Promise<Room[]> {
    let startDate: Date = new Date(date.toISOString());
    startDate.setSeconds(0, 0)

    let endDate: Date = new Date(startDate.toISOString());
    endDate.setMinutes(endDate.getMinutes() + duration);

    let availableRooms: Room[] = [];

    let response: AxiosResponse = await getFreeRooms(startDate.toISOString(), endDate.toISOString());
    if (response.status === 200) {
        let freeRooms: Room[] = (response).data;

        for (let room of freeRooms) {
            availableRooms.push(room);
        }

        return availableRooms;
    }

    return []

}

// Form valid options

export interface DateOption {
    label: string,
    value: string,
}

export function getOptionsOfDate(): DateOption[] {

    let options: DateOption[] = []

    let today: Date = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < daysToChoose; i++) {
        let next: Date = new Date(today.toISOString());
        next.setDate(next.getDate() + i);

        options.push({
            label: next.toLocaleDateString([locale],
                {year: 'numeric', month: 'long', day: 'numeric'}),
            value: next.toISOString()
        })
    }

    return options;
}

// export const disabledDateTime = (dates: Date[]): {
//     disabledHours: () => number[],
//     disabledMinutes: (selectedHour: number) => number[]
// } => ({
//     disabledHours: (): number[] => getDisabledHours(dates),
//     disabledMinutes: (selectedHour: number): number[] => getDisabledMinutes(dates, selectedHour),
// });

export interface DurationOption {
    label: string,
    value: number
}

function declOfMinutes(number: number): string {
    let words: string[] = ['минута', 'минуты', 'минут'];
    return words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10 : 5]];
}

function declOfHours(number: number): string {
    let words: string[] = ['час', 'часа', 'часов'];
    return words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10 : 5]];
}

export async function getDurationsOptions(date: Date, step: number): Promise<DurationOption[]> {
    let data: number[] = await getDurationByTime(date, step);

    return data.map((x: number): DurationOption => {


        let hours: number = Math.floor(x / 60);
        let minutes: number = x % 60;

        if (lang === "ru") {
            return {
                label: `${hours > 0 ? hours + ` ${declOfHours(hours)}` : ""} ${minutes > 0 ? minutes + ` ${declOfMinutes(minutes)}` : ""}`,
                value: x
            }
        } else {
            return {
                label: `${hours > 0 ? hours + " Hour" + (hours > 1 ? "s " : "") : ""} ${minutes > 0 ? minutes + " Minutes" : ""}`,
                value: x
            }
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