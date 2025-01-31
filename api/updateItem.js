import { connectToDatabase } from './dbClient.js'

const updateGroceryItem = async (db, entryId, groceryItemId, updatedData) => {
  const collection = db.collection('listsById')

  // Update the grocery item with the new data
  const result = await collection.updateOne(
    { _id: entryId, "data.grocerylist.id": groceryItemId }, // Match by entryId and nested grocery item id
    { $set: {
        "data.grocerylist.$.name": updatedData.name,
        "data.grocerylist.$.planned": updatedData.planned,
        "data.grocerylist.$.quantity": updatedData.quantity
      }
    }
  )

  if (result.matchedCount === 0) {
    throw new Error('No entry found with the specified id')
  }

  return result
}

export default async (req, res) => {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { entryId, groceryItemId, name, planned, quantity } = req.body

  if (!entryId || !groceryItemId || !name || typeof planned !== 'boolean' || !quantity) {
    return res.status(400).json({ message: 'Invalid request data' })
  }

  try {
    const db = await connectToDatabase()
    const updatedData = { name, planned, quantity }
    const result = await updateGroceryItem(db, entryId, groceryItemId, updatedData)

    return res.status(200).json({ message: 'Grocery item updated', result })
  } catch (error) {
    console.error('Error updating grocery item:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}