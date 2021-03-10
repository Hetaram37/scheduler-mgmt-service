'use strict'

exports.find = async (query, projection, collection) => {
  console.debug('Find() query: %j, projection: %j, collection: ', query, projection, collection)
  try {
    const doc = await collection.find(query, projection).lean()
    return doc
  } catch (error) {
    console.error(`Error while getting data from ${collection}: %s %j`, error, error)
    throw error
  }
}

exports.findOne = async (query, projection, collection) => {
  console.debug('FindOne() query: %j, projection: %j, collection: ', query, projection, collection)
  try {
    const doc = await collection.findOne(query, projection).lean()
    return doc
  } catch (error) {
    console.error(`Error while getting data from ${collection}: %s %j`, error, error)
    throw error
  }
}

exports.createOne = async (data, collection) => {
  try {
    const doc = await collection.create(data)
    return doc
  } catch (error) {
    console.error(`Error while saving data to ${collection}: %s %j`, error, error)
    throw error
  }
}
