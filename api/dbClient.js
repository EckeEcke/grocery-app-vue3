import { MongoClient } from 'mongodb'

const uri = `mongodb+srv://ceckardt254:${process.env.DATABASE_PASSWORD}@cluster0.sent83.mongodb.net/?retryWrites=true&w-majority&appName=Cluster0`
let client

export const connectToDatabase = async () => {
  if (!client) {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    await client.connect()
  }
  return client.db('mealplanner')
}