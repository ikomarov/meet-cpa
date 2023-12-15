import {config} from 'dotenv'

config()

import mongoose from 'mongoose'
import {logError} from '../../utils/logger.js'

let db;

(async () => {
  const mongoDB = process.env.MONGODB

  try {
    await mongoose.connect(mongoDB)
  } catch (err){
    logError( 'MongoDB', err )
  }

  mongoose.Promise = global.Promise

  db = mongoose.connection

  db.on('error', (error) => logError( 'MongoDB', error ))
})()

export default mongoose
