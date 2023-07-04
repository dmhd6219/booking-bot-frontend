const durations = [
    {value: 15, label: '15 Minutes'},
    {value: 30, label: '30 Minutes'},
    {value: 45, label: '45 Minutes'},
    {value: 60, label: '1 Hour'},
    {value: 75, label: '1 Hour 15 Minutes'},
    {value: 90, label: '1 Hour 30 Minutes'},
    {value: 105, label: '1 Hour 45 Minutes'},
    {value: 120, label: '2 Hours'},
    {value: 135, label: '2 Hours 15 Minutes'},
    {value: 150, label: '2 Hours 30 Minutes'},
    {value: 165, label: '2 Hours 45 Minutes'},
    {value: 180, label: '3 Hours'}
]


const rooms = [
    {label: "Lecture Room 301", value: 301},
    {label: "Lecture Room 303", value: 303},
    {label: "Lecture Room 304", value: 304},
    {label: "Lecture Room 305", value: 305},
    {label: "Lecture Room 312", value: 312},
    {label: "Lecture Room 313", value: 313},
    {label: "Lecture Room 314", value: 314},
    {label: "Lecture Room 318", value: 318},
    {label: "Lecture Room 320", value: 320},
    {label: "Meeting Room 3.1", value: 3.1},
    {label: "Meeting Room 3.2", value: 3.2},
    {label: "Meeting Room 3.3", value: 3.3},
    {label: "Meeting Room 3.4", value: 3.4},
    {label: "Meeting Room 3.5", value: 3.5},

]

let today = new Date();
today.setHours(0, 0, 0, 0);

let tomorrow = new Date(today.toISOString());
tomorrow.setDate(today.getDate() + 1);

let dayAfterTomorrow = new Date(tomorrow.toISOString());
dayAfterTomorrow.setDate(tomorrow.getDate() + 1);

export function getTestDates() {
    return [
        {
            label: today.toLocaleDateString(["en-US"], {year: 'numeric', month: 'long', day: 'numeric'}),
            value: today.toISOString()
        },
        {
            label: tomorrow.toLocaleDateString(["en-US"], {year: 'numeric', month: 'long', day: 'numeric'}),
            value: tomorrow.toISOString()
        },
        {
            label: dayAfterTomorrow.toLocaleDateString(["en-US"], {year: 'numeric', month: 'long', day: 'numeric'}),
            value: dayAfterTomorrow.toISOString()
        }
    ]
}

export function getTestDurations() {
    return durations;
}

export function getTestRooms(){
    return rooms;
}