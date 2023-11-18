import 'dotenv/config';
// @ts-ignore
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import LoveNote from './schema';
import getRouter from "./routes";
import {Agenda} from "agenda";

// Create a new Express application instance
const app = express();
app.use(express.json());

// Create a new HTTP server and bind the Express app to it
const server = createServer(app);

// Initialize Socket.IO with the HTTP server instance
const io = new Server(server);

// set up agenda
const agenda = new Agenda({db: {address: 'mongodb://localhost:27017/agenda'}});

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/ILoveYou").then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.log(err);
});

app.use(getRouter(io));



// define the job
agenda.define('print note', async job => {
    // get all notes from the db that have sent = false
    const notes = await LoveNote.find({ sent: false });
    if (notes.length > 0) {
        // pick a random note from the list, set sent = true, and print it
        const noteIndex = Math.floor(Math.random() * notes.length);
        const note = notes[noteIndex];
        note.sent = true;
        await note.save();
        io.sockets.emit('note', note.note);
        console.log(`Printed note:  \n ${note.note}`);
    } else {
        console.log('No unsent notes available');
    }

});

// Once agenda is ready...
agenda.on('ready', async () => {
    try {
        // Schedule the job
        // await agenda.every('1 minute', 'print note'); //For testing
        // at 10:00 AM every day
        await agenda.every('0 10 * * *', 'print note');

        // Start agenda
        await agenda.start();
        console.log('Agenda started and job scheduled.');

    } catch (error) {
        console.error('Scheduling failed:', error);
    }
});

// Catch job processing errors
agenda.on('fail', (err, job) => {
    console.error(`Job failed with error: ${err.message}`);
});

// Keep the Node.js process alive
process.stdin.resume();



// Whenever a client connects to the server through Socket.IO
io.on('connection', (socket) => {
    console.log('A user connected');


    io.to(socket.id).emit('message', 'Hello from server');
    // Handling disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });






});

// Start the server
const PORT =  3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
