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
    let response = await fetch(roomsUrl);

    return response.json();
}

// type DateIso = `${number}${number}${number}${number}-${number}${number}-
//         ${number}${number}T${number}${number}:${number}${number}:${number}${number}.${number}${number}${number}Z`
type DateIso = string;

export async function getFreeRooms(start: DateIso, end: DateIso): Promise<Room[]> {
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

export async function bookRoom(id: string, title: string, start: DateIso, end: DateIso, owner_email: UniversityEmail): Promise<Booking> {
    let response = await fetch(bookRoomUrl(id), {
        method: 'POST',
        body: JSON.stringify({
            title: title,
            start: start,
            end: end,
            owner_email: owner_email
        })
    });

    return response.json();
}

interface Filter {
    started_at_or_after?: DateIso,
    ended_at_or_before?: DateIso,
    room_id_in?: string[],
    owner_email_in?: string[]
}

export async function bookingsQuery(filter: Filter): Promise<Booking[]> {
    let response = await fetch(bookingsQueryUrl, {
        method: 'POST',
        body: JSON.stringify({
            filter: filter
        })
    });

    return response.json();
}


export async function deleteBooking(id: string): Promise<boolean> {
    let response = await fetch(deleteBookingUrl(id), {
        method: 'DELETE'
    });

    return response.ok;
}
