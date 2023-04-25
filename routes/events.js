const { Router } = require("express");

const EventDAO = require('../daos/events')
const CalendarDAO = require('../daos/calendars')
const router = Router({ mergeParams: true });
const mongoose = require('mongoose');

module.exports = router;

router.post("/", async (req, res, next) => {
    const event = req.body;
    if (!event || JSON.stringify(event) === '{}'
        || !event.name || !event.date) {
        res.status(400).send('Event name and date are required');
    } else {
        const isCalendarFound = await CalendarDAO.getById(req.params.calendarId);
        if (!isCalendarFound) {
            res.status(400).send(`calendar with id ${req.params.calendarId} not found.`);
        } else {
            const savedEvent = await EventDAO.create(req.params.calendarId, event);
            res.json(savedEvent);
        }
    }
});


router.get("/", async (req, res, next) => {
    try {
        const isCalendarFound = await CalendarDAO.getById(req.params.calendarId);
        if (!isCalendarFound) {
            res.status(404).send(`calendar with id ${req.params.calendarId} not found.`);
        } else {
            const events = await EventDAO.getAll(req.params.calendarId);
            res.json(events);
        }
    } catch (e) {
        next(e);
    }
});

router.get("/:eventId", async (req, res, next) => {
    try {
        const isCalendarFound = await CalendarDAO.getById(req.params.calendarId);
        if (!isCalendarFound) {
            res.status(404).send(`calendar with id ${req.params.calendarId} not found.`);
        } else {
            const event = await EventDAO.getById(req.params.calendarId, req.params.eventId);
            event ? res.json(event) : res.sendStatus(404);
        }
    } catch (e) {
        next(e);
    }
});

router.put("/:eventId", async (req, res, next) => {
    const calendarId = req.params.calendarId;
    const eventId = req.params.eventId;
    const event = req.body;
    if (!event || JSON.stringify(event) === '{}'
        || !event.name || !event.date) {
        res.status(400).send('Event name and date are required');
    } else {
        const isCalendarFound = await CalendarDAO.getById(calendarId);
        if (!isCalendarFound) {
            res.status(400).send(`calendar with id ${calendarId} not found.`);
        }
        const updatedEvent = await EventDAO.updateById(calendarId, eventId, event);
        updatedEvent ? res.json(updatedEvent) : res.status(404).send(`event id ${eventId} not found.`)
    }
});

router.delete("/:eventId", async (req, res, next) => {
    try {
        const isCalendarFound = await CalendarDAO.getById(req.params.calendarId);
        if (!isCalendarFound) {
            res.status(404).send(`calendar with id ${req.params.calendarId} not found.`);
        } else {
            const event = await EventDAO.removeById(req.params.calendarId, req.params.eventId);
            event?.deletedCount > 0 ? res.sendStatus(200) : res.sendStatus(404);
        }
    } catch (e) {
        next(e);
    }
});