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


