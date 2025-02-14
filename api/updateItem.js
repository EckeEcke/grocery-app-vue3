import { connectToDatabase } from './dbClient.js'

const updateGroceryItem = async (db, entryId, groceryItemId, updatedData) => {
  const collection = db.collection('listsById')

  const result = await collection.updateOne(
    { _id: entryId, 'data.groceryList.id': groceryItemId },
    {
      $set: {
        'data.groceryList.$.name': updatedData.name,
        'data.groceryList.$.planned': updatedData.planned,
        'data.groceryList.$.quantity': updatedData.quantity
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
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { entryId, groceryItemId, name, planned, quantity } = req.body

  if (!entryId || !groceryItemId || !name || typeof planned !== 'boolean') {
    return res.status(400).json({ message: 'Invalid request data' })
  }

  try {
    const db = await connectToDatabase()
    const updatedData = { name, planned, quantity }
    const result = await updateGroceryItem(db, entryId, groceryItemId, updatedData)
    const updatedList = await getUpdatedList(entryId)

    return res.status(200).json({ message: 'Grocery item updated', result, updatedList })
  } catch (error) {
    console.error('Error updating grocery item:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
