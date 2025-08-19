import io from "socket.io-client";

const domain = "https://aviatorudaan.com/";
const socket = io(domain);

export default socket;
