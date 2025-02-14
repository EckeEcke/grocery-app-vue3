import { connectToDatabase } from './dbClient.js'

const deleteGroceryItem = async (entryId, groceryItemId) => {
  const db = await connectToDatabase()
  const collection = db.collection('listsById')

  const result = await collection.updateOne(
    { _id: entryId },
    {
      $pull: {
        'data.groceryList': { id: groceryItemId }
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

  const { entryId, groceryItemId } = req.body

  if (!entryId || !groceryItemId) {
    return res.status(400).json({ message: 'Invalid request data' })
  }

  try {
    const result = await deleteGroceryItem(entryId, groceryItemId)
    const updatedList = await getUpdatedList(entryId)

    return res.status(200).json({ message: 'Grocery item deleted', result, updatedList })
  } catch (error) {
    console.error('Error deleting grocery item:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}