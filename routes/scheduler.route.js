const route = require('express').Router()

const { addSlot, getSlotList } = require('../controllers/scheduler.controller')

route.post('/', addSlot)
route.get('/', getSlotList)

module.exports = route