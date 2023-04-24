const Events = require('../models/events');

module.exports = {};

module.exports.create = async (calendarId, event) => {
    return await Events.create({ calendarId: calendarId, ...event });
};

module.exports.getAll = async (calendarId) => {
    return await Events.find({ calendarId: calendarId });
};

module.exports.getById = async (id) => {
    try {
        const event = await Events.findOne({ _id: id }).lean();
        return event;
    } catch (e) {
        return null;
    }
};

module.exports.updateById = async (calendarId, id, newData) => {
    try {
        const event = await Events.findOneAndUpdate({ calendarId: calendarId, _id: id }, newData, { new: true }).lean();
        return event;
    } catch (e) {
        return null;
    }
};

module.exports.removeById = async (calendarId, id) => {
    try {
        const event = await Events.deleteOne({ calendarId: calendarId, _id: id }).lean();
        return event;
    } catch (e) {
        return null;
    }
};