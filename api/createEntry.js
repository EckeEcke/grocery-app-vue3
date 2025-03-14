import { connectToDatabase } from './dbClient.js'

const generateRandomId = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  const charactersLength = characters.length
  for (let i = 0; i < 8; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

const checkIdExists = async (db, id) => {
  const collection = db.collection('listsById')
  const entry = await collection.findOne({ _id: id })
  return !!entry
}

const createEntry = async (db, id, reqBody) => {
  const collection = db.collection('listsById')
  const currentDate = new Date()
  const newEntry = { _id: id, data: reqBody, lastUsage: currentDate }
  await collection.insertOne(newEntry)
  return newEntry
}

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const db = await connectToDatabase()

    let id
    let exists = true
    let attempts = 0

    while (exists && attempts < 2) {
      id = generateRandomId()
      exists = await checkIdExists(db, id)
      attempts++
    }

    if (exists) {
      return res
        .status(500)
        .json({ message: 'Failed to generate a unique ID after multiple attempts' })
    }

    const newEntry = await createEntry(db, id, req.body)
    return res.status(201).json({ message: 'Entry created', entry: newEntry })
  } catch (error) {
    console.error('Error generating and creating entry:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
