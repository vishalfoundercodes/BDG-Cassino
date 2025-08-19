import { io } from "socket.io-client";

const domain = "https://aviatorudaan.com/";
export const socket = io(domain);
