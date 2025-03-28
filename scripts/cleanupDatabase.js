import { MongoClient } from 'mongodb'

async function deleteOldEntries() {
  const uri = `mongodb+srv://ceckardt254:${process.env.DATABASE_PASSWORD}@cluster0.sen83.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  const client = new MongoClient(uri)

  try {
    await client.connect()
    const db = client.db('mealplanner')
    const collection = db.collection('listsById')

    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    const result = await collection.deleteMany({
      lastUsage: { $lt: sixMonthsAgo }
    })

    console.log(`Deleted ${result.deletedCount} old entries.`)
  } catch (error) {
    console.error('Error deleting old entries:', error)
  } finally {
    await client.close()
  }
}

deleteOldEntries().then(() => console.log('Task complete'))
