const range = (start: number, end: number): number[] => {
    const result: number[] = [];
    for (let i = start; i < end; i++) {
        result.push(i);
    }
    return result;
};

export const disabledDateTime = (): { disabledHours: () => number[], disabledMinutes: () => number[] } => ({
    disabledHours: (): number[] => range(7, 19),
    disabledMinutes: (): number[] => [1, 2, 3, 4, 5],
});