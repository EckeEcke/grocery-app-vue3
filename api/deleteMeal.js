import { connectToDatabase } from './dbClient.js'

const deleteMeal = async (entryId, id) => {
  const db = await connectToDatabase()
  const collection = db.collection('listsById')

  const result = await collection.updateOne(
    { _id: entryId },
    {
      $pull: {
        'data.mealPlan': { id }
      }
    }
  )

  if (result.matchedCount === 0) {
    throw new Error('No entry found with the specified id')
  }

  return result
}

const getUpdatedList = async (entryId) => {
  const db = await connectToDatabase()
  const collection = db.collection('listsById')
  const updatedDocument = await collection.findOne({ _id: entryId })
  return updatedDocument
}

export default async (req, res) => {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { entryId, id } = req.body

  if (!entryId || !id) {
    return res.status(400).json({ message: 'Invalid request data' })
  }

  try {
    const result = await deleteMeal(entryId, id)
    const updatedList = await getUpdatedList(entryId)

    return res.status(200).json({ message: 'Meal deleted', result, updatedList })
  } catch (error) {
    console.error('Error deleting meal:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
