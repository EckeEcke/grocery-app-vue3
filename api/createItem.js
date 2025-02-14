import { connectToDatabase } from './dbClient.js'

const createGroceryItem = async (entryId, newItem) => {
  const db = await connectToDatabase()
  const collection = db.collection('listsById')

  const result = await collection.updateOne(
    { _id: entryId },
    {
      $push: {
        'data.groceryList': newItem
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
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { entryId, name } = req.body

  if (!entryId || !name) {
    return res.status(400).json({ message: 'Invalid request data' })
  }

  try {
    const newItem = {
      id: new Date().getTime().toString(), // Generate a unique ID for the new item
      name,
      planned: true,
    }
    const result = await createGroceryItem(entryId, newItem)
    const updatedList = await getUpdatedList(entryId)

    return res.status(201).json({ message: 'Grocery item created', result, updatedList })
  } catch (error) {
    console.error('Error creating grocery item:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}