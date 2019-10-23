const express = require('express');
const router = express.Router();
const {EventEmitter} = require('events');
const eventEmitter = new EventEmitter();


router.get('/long-polling', (req, res) => {
    try {
        return eventEmitter.once('event', (status = 200) => {
            return res.sendStatus(status);
        })
    } catch (error) {
        res.status(400).send({
            message: 'Error in long polling!',
            error
        })
    }
});


router.get('/long-polling-trigger', (req, res) => {
    try {
        eventEmitter.emit('event', 200);
        res.sendStatus(200);
    } catch (error) {
        res.status(400).send({
            message: 'Error in long polling trigger!',
            error: error.message
        })
    }
});

module.exports = router;
