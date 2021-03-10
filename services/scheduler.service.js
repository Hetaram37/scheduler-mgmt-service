'use strict'

const {
  findOne,
  find,
  createOne
} = require('../repository/commonRepository')
const Scheduler = require('../model/scheduler')
const joi = require('joi')
const AppError = require('../utils/appError')
const { range } = require('lodash')
const SERVICE_CON = 'SMS_S_S_'

const addSlotSchema = joi.object({
  day: joi.string().allow('SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT').required(),
  start_time: joi.number().min(0).max(22),
  end_time: joi.number().min(1).max(23)
})

const addNewSlot = async (body) => {
  await validateStudentInput(body, addSlotSchema)
  const timeSlots = await findOne(querySlots(body), projectionSlots(), Scheduler)
  if (timeSlots && timeSlots._id) {
    throw new AppError(null, SERVICE_CON + 400, 'Slot not available', 'Slot not available')
  } else {
    const savedSlot = await createOne(body, Scheduler)
    return savedSlot
  }
}

function querySlots (body) {
  const query = {}
  query.day = body.day
  query.$or = []

  const innerRange = {}
  innerRange.start_time = {}
  innerRange.start_time.$gt = body.start_time
  innerRange.end_time = {}
  innerRange.end_time.$lt = body.end_time

  const outerRange = {}
  outerRange.start_time = {}
  outerRange.start_time.$lt = body.start_time
  outerRange.end_time = {}
  outerRange.end_time.$gt = body.end_time
  query.$or.push(innerRange)
  query.$or.push(outerRange)
  return query
}

function projectionSlots () {
  return {
    _id: true
  }
}

const slotList = async () => {
  const slotsData = await find({}, slotListProjection(), Scheduler)
  const slotDetails = prepareTimeSlots(slotsData)
  return slotDetails
}

function prepareTimeSlots (slotsData) {
  const slots = {}
  slotsData.forEach(slot => {
    if (!slots[slot.day]) {
      slots[slot.day] = {}
      slots[slot.day].hours = []
    }
    slots[slot.day].day = slot.day
    const slotArray = range(slot.start_time, slot.end_time + 1)
    slots[slot.day].hours.push(...slotArray)
  })
  console.log('Slots data after modification: %j', slots)
  const slotArray = []
  for (const slot in slots) {
    slotArray.push(slots[slot])
  }
  return slotArray
}

function slotListProjection () {
  return {
    day: true,
    end_time: true,
    start_time: true
  }
}

async function validateStudentInput (body, schema) {
  try {
    const validation = await schema.validateAsync(body)
    return validation
  } catch (error) {
    throw new AppError(null, SERVICE_CON + 206, 'Partial content', error)
  }
}

module.exports = {
  addNewSlot,
  slotList
}
