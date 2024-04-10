import io from "socket.io-client"; // Add this

let socket;

const connectSocket = (user_id) => {
    try {
        socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
            query: `user_id=${user_id}`,
        });
    } catch (error) {
      console.log("socket connection error: ",error)
    }
    return socket;
}; // Add this -- our server will run on port 4000, so we connect to it from here

export { socket, connectSocket };
