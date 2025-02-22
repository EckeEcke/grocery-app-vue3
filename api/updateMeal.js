import { connectToDatabase } from './dbClient.js'

const updateMeal = async (db, entryId, id, updatedData) => {
  const collection = db.collection('listsById')

  const result = await collection.updateOne(
    { _id: entryId, 'data.mealPlan.id': id },
    {
      $set: {
        'data.mealPlan.$.name': updatedData.name,
        'data.mealPlan.$.planned': updatedData.planned,
        'data.mealPlan.$.ingredients': updatedData.ingredients,
        'data.mealPlan.$.recipe': updatedData.recipe
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

  const { entryId, id, name, planned, ingredients, recipe } = req.body

  if (!entryId || !id || !name || typeof planned !== 'boolean') {
    return res.status(400).json({ message: 'Invalid request data' })
  }

  try {
    const db = await connectToDatabase()
    const updatedData = { name, planned, ingredients, recipe }
    const result = await updateMeal(db, entryId, id, updatedData)
    const updatedList = await getUpdatedList(entryId)

    return res.status(200).json({ message: 'Meal updated', result, updatedList })
  } catch (error) {
    console.error('Error updating meal:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
