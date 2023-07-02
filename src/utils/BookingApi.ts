export const apiUrl: string = `${process.env.REACT_APP_API_URL}`;
export const roomsUrl: string = `${apiUrl}/rooms`;
export const freeRoomsUrl: string = `${roomsUrl}/free`

export const bookRoomUrl: string = `${roomsUrl}/{room_id}/book`

export const bookingsQueryUrl: string = `${apiUrl}/bookings/query`

export const deleteBooking: string = `${apiUrl}/bookings/{booking_id}`

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