const mongoose = require('mongoose');
const Events = require('../models/events');

module.exports = {};

module.exports.create = async (calendarId, event) => {
    return await Events.create({ calendarId: new mongoose.Types.ObjectId(calendarId), ...event });
};

module.exports.getAll = async (calendarId) => {
    return await Events.find({ calendarId: new mongoose.Types.ObjectId(calendarId) });
};

module.exports.getById = async (calendarId, id) => {
    try {
        const event = await Events.findOne({ calendarId: new mongoose.Types.ObjectId(calendarId), _id: id });
        return event;
    } catch (e) {
        return null;
    }
};

module.exports.updateById = async (calendarId, id, newData) => {
    try {
        const event = await Events.findOneAndUpdate({ calendarId: new mongoose.Types.ObjectId(calendarId), _id: id }, newData, { new: true }).lean();
        return event;
    } catch (e) {
        return null;
    }
};

module.exports.removeById = async (calendarId, id) => {
    try {
        const event = await Events.deleteOne({ calendarId: new mongoose.Types.ObjectId(calendarId), _id: id }).lean();
        return event;
    } catch (e) {
        return null;
    }
};