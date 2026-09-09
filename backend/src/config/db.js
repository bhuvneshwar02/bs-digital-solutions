import mongoose from 'mongoose'
import { env } from './env.js'

// strictQuery: silently drop filter fields not in the schema.
mongoose.set('strictQuery', true)

export async function connectDb(uri = env.mongoUri) {
  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10000,
    maxPoolSize: 10,
  })
  console.log(`MongoDB connected: ${mongoose.connection.name}`)
  return mongoose.connection
}

export async function disconnectDb() {
  await mongoose.disconnect()
}
