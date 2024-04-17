export default function formatTimeDifference(date) {
    const old = new Date(date);
    const now = new Date();
    const timeDifference = now - old;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
        return "just now";
    } else if (minutes < 60) {
        return `${minutes} minuts ago`;
    } else if (hours < 24) {
        return `${hours} hours ago`;
    } else {
        return `${days} days ago`;
    }
}

export function formatTime(date) {
    const newDate = new Date(date);
    // const options = {
    //   hour: 'numeric',
    //   minute: 'numeric',
    //   hour12: true,
    // };
    // return newDate.toLocaleTimeString('en-US', options);
    const hours = newDate.getHours() % 12 || 12; // 12-hour format (adjust for 24-hour if needed)
    const minutes = newDate.getMinutes().toString().padStart(2, "0");
    const period = newDate.getHours() >= 12 ? "pm" : "am";

    return `${hours}.${minutes} ${period}`;
}
