import {fullTime} from "./TimeDisabler";

export const apiUrl: string = `${process.env.REACT_APP_API_URL}`;
export const roomsUrl: string = `${apiUrl}/rooms`;
export const freeRoomsUrl: string = `${roomsUrl}/free`

export const bookRoomUrl = (room_id: string) => `${roomsUrl}/${room_id}/book`

export const bookingsQueryUrl: string = `${apiUrl}/bookings/query`

export const deleteBookingUrl = (booking_id: string) => `${apiUrl}/bookings/${booking_id}`

interface Room {
    name: string,
    id: string,
    type: string,
    capacity: number
}

export async function getRooms(): Promise<Room[]> {
    let response = await fetch(roomsUrl);

    let json: Room[] = await response.json();
    return json;

}

async function getFreeRooms(start: Date, end: Date): Promise<Room[]> {
    let response = await fetch(freeRoomsUrl, {
        method: 'POST',
        body: JSON.stringify({start: start, end: end})
    });

    let json: Room[] = await response.json();
    return json;
}

interface bookRoom {
    title: string,
    start: string,
    end: string,
    owner: string
}

async function bookRoom(id: string, room: bookRoom): Promise<QueryResponse> {
    let response = await fetch(bookRoomUrl(id), {
        method: 'POST',
        body: JSON.stringify(room)
    });

    let json: QueryResponse = await response.json();
    return json;
}

interface QueryFilter {
    filter: {
        started_at_or_after?: string,
        ended_at_or_before?: string,
        room_id_in?: string[],
        owner_email_in?: string[]
    }
}

interface QueryResponse {
    id: string,
    title: string,
    start: string,
    end: string,
    room: Room,
    owner_email: string
}

async function getQuery(filter: QueryFilter): Promise<QueryResponse[]> {
    let response = await fetch(bookingsQueryUrl, {
        method: 'POST',
        body: JSON.stringify(filter)
    });

    let json: QueryResponse[] = await response.json();
    return json;
}

async function deleteBooking(id: string): Promise<boolean> {
    let response = await fetch(deleteBookingUrl(id), {
        method: 'DELETE'
    });

    return response.ok;
}


export async function getAvailableTime(date: Date): Promise<string[]> {

    date.setHours(0, 0, 0, 0);
    let today: Date = new Date(date.getTime());

    date.setDate(date.getDate() + 1);
    let tomorrow: Date = new Date(date.getTime());


    let json: QueryResponse[] = await getQuery({
        filter: {
            started_at_or_after: today.toISOString(),
            ended_at_or_before: tomorrow.toISOString(),
            owner_email_in: [],
            room_id_in: []
        }
    });


    let bookedTime: Date[] = []

    for (const room of json) {
        const startTime = new Date(room.start);
        const endTime = new Date(room.end);
        // Round the start and end times to the nearest 15 minute interval.
        const roundedStartTime = new Date(
            startTime.getTime() +
            (Math.ceil((endTime.getTime() - startTime.getTime()) / 15) * 15),
        );
        const roundedEndTime = new Date(
            endTime.getTime() - (endTime.getTime() % 15),
        );
        // Add all available times between the rounded start and end times.
        for (let time = roundedStartTime; time < roundedEndTime; time.setMinutes(time.getMinutes() + 15)) {
            bookedTime.push(time);
        }
    }

    return bookedTime.filter(item => !fullTime.includes(`${item.getUTCHours()}:${item.getUTCMinutes()}`)).map(
        item => `${item.getUTCHours()}:${item.getUTCMinutes()}`
    )
}

export async function getDuration(date: Date, time: string) {

}