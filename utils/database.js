const { MongoClient } = require('mongodb')
const dotenv = require('dotenv')

dotenv.config({ path: '../' })
const url = process.env.DB_ADDRESS
const dbName = 'crm'
const client = new MongoClient(url, ({ useUnifiedTopology: true }))

const connect = async () => {
    try {
        await client.connect()
        const db = client.db(dbName)
        return db
    } catch(error) {
        console.error('Connection to MongoDb failed:', error)
    }
}

const usersCollection = async () => {
    const db = await connect()
    return db.collection('users')
}

module.exports = {
    usersCollection
}




