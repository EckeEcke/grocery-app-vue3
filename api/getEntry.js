import { connectToDatabase } from './dbClient.js'

export default async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { id } = req.query

  if (!id) {
    return res.status(400).json({ message: 'ID is required' })
  }

  try {
    const db = await connectToDatabase()
    const collection = db.collection('listsById')
    const entry = await collection.findOne({ _id: id })

    if (entry) {
      const currentDate = new Date()
      await collection.updateOne({ _id: id }, { $set: { lastUsage: currentDate } })
      return res.status(200).json({ exists: true, entry })
    } else {
      return res.status(200).json({ exists: false })
    }
  } catch (error) {
    console.error('Error checking entry:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
