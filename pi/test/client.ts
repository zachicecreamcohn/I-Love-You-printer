import io from 'socket.io-client';
const socket = io("ws://ec2-18-224-181-157.us-east-2.compute.amazonaws.com:3000", {
    reconnectionDelayMax: 10000
});

// if the socket is connected, then print a message
socket.on("connect", () => {
    console.log("Connected to server");
});

socket.on("message", (msg) => {
    console.log(msg);
});

socket.on("command", (cmd) => {
    console.log(cmd);

});