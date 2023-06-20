const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
        result.push(i);
    }
    return result;
};
export const disabledDateTime = () => ({
    // disabledHours: () => range(0, 24).splice(4, 20),
    disabledHours: () => range(7, 19),
    disabledMinutes: () => [1, 2, 3, 4, 5],
});