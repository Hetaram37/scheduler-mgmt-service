'use strict'

const mongoose = require('mongoose')

const schedulerSchema = new mongoose.Schema({
  day: {
    type: String,
    required: [true, 'Day is required'],
    enum: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  },
  start_time: {
    type: Number,
    required: [true, 'Start time slot is required']
  },
  end_time: {
    type: Number,
    required: [true, 'Start time slot is required']
  }
}, {
  timestamps: {
    createdAt: 'created_on',
    updatedAt: 'updated_on'
  },
  collection: 'scheduler'
})

module.exports = mongoose.model('scheduler', schedulerSchema)
