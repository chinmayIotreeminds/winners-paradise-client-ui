
export default function trimText(text, length) {
    if (text?.length > length) {
        return text.substring(0, length) + '...';
    }
    return text;
}


export function isPastDate(date) {
    const today = new Date().setHours(0, 0, 0, 0);
    const inputDate = new Date(date).setHours(0, 0, 0, 0);
    return inputDate < today;
}


