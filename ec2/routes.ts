// @ts-ignore
import express from 'express';
import LoveNote from "./schema";

const getRouter = (io) => {
    const router = express.Router();


// define a route handler for receiving commands over POST
    router.post('/command', (req, res) => {
        console.log(req.body);
        io.sockets.emit('command', req.body.command);
        res.send('OK');
    });

// Insert new love note into database
    router.post('/api/insert', async (req, res) => {
        try {
            const newNote = new LoveNote({
                note: req.body.note,
                timestamp: Date.now()
            });
            await newNote.save();

            if (req.body.printNow) {
                io.sockets.emit('note', req.body.note);
            }

            res.send('OK');
        } catch (e) {
            console.error('Error inserting love note:', e);
            res.status(500).send('An error occurred');
        }
    });


    router.get('/api/notes', async (req, res) => {
        try {
            const notes = await LoveNote.find({});
            res.send(notes);
        } catch (e) {
            console.error('Error fetching notes:', e);
            res.status(500).send('An error occurred');
        }
    });


// delete a note using the id
    router.post('/api/delete', async (req, res) => {
        if (req.body.id === undefined) {
            res.status(400).send('Missing id');
            return;
        }

        try {
            const result = await LoveNote.findByIdAndDelete(req.body.id);
            if (result) {
                res.send('Note deleted');
            } else {
                res.status(404).send('Note not found');
            }
        } catch (e) {
            console.error('Error deleting note:', e);
            res.status(500).send('Error deleting note');
        }
    });

    return router;

}

export default getRouter;