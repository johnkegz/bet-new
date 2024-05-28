
export const roundOff = (number: number, decimalPlace: number) => {
    const factor = Math.pow(10, decimalPlace);
    return Math.round(number * factor) / factor;
    };
