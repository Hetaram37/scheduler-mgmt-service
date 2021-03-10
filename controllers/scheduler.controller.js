'use strict'

const {
  addNewSlot,
  slotList
} = require('../services/scheduler.service')
const {
  getStatusCode
} = require('../utils/statusCode')
const CONTROLLER_CONS = 'CMS_AC_'

const addSlot = async (req, res) => {
  try {
    const respose = await addNewSlot(req.body)
    res.status(201).json({
      data: respose,
      status_code: CONTROLLER_CONS + 200,
      status_message: 'Slot added successfully.',
      errors: null
    })
  } catch (error) {
    console.error('Error while adding slot: %s %j', error, error)
    if (getStatusCode(error.status_code)) {
      res.status(getStatusCode(error.status_code)).send(error)
    } else {
      let errors = error
      if (error.errors) {
        errors = error.errors
      }
      res.status(500).json({
        data: null,
        status_code: CONTROLLER_CONS + 500,
        status_message: 'Server error',
        errors: errors
      })
    }
  }
}

const getSlotList = async (req, res) => {
  try {
    const respose = await slotList()
    res.status(200).json({
      data: respose,
      status_code: CONTROLLER_CONS + 200,
      status_message: 'Got slot list successfully.',
      errors: null
    })
  } catch (error) {
    console.error('Error while getting slot list: %s %j', error, error)
    if (getStatusCode(error.status_code)) {
      res.status(getStatusCode(error.status_code)).send(error)
    } else {
      let errors = error
      if (error.errors) {
        errors = error.errors
      }
      res.status(500).json({
        data: null,
        status_code: CONTROLLER_CONS + 500,
        status_message: 'Server error',
        errors: errors
      })
    }
  }
}

module.exports = {
  addSlot,
  getSlotList
}
