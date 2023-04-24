const { Router } = require("express");

const CalendarDAO = require('../daos/calendars');

const router = Router();

router.post("/", async (req, res, next) => {
  const calendar = req.body;
  if (!calendar || JSON.stringify(calendar) === '{}' || !calendar.name) {
    res.status(400).send('calendar and calendar name is required');
  } else {
    const savedCalendar = await CalendarDAO.create(calendar.name);
    res.json(savedCalendar);
  }
});

router.put("/:id", async (req, res, next) => {
  const calendarId = req.params.id;
  const calendar = req.body;
  if (!calendar || JSON.stringify(calendar) === '{}'  || !calendar.name) {
    res.status(400).send('calendar and calendar name is required');
  } else {
    const updatedCalendar = await CalendarDAO.updateById(calendarId, calendar);
    updatedCalendar ? res.json(updatedCalendar) : res.status(404).send(`calendar id ${calendarId} not found.`)
  }
});


router.get("/", async (req, res, next) => {
  try {
    const calendars = await CalendarDAO.getAll();
    res.json(calendars);
  } catch(e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const calendar = await CalendarDAO.getById(req.params.id);
    if (calendar) {
      res.json(calendar);
    } else {
      res.sendStatus(404);
    }
  } catch(e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const calendar = await CalendarDAO.removeById(req.params.id);
    if (calendar) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch(e) {
    next(e);
  }
});

module.exports = router;