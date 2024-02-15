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
