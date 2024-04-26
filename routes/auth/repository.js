const { usersCollection } = require('../../utils/database.js')
const users_db = usersCollection()

const isEmailExists = async (email) => {
    try {
        const users_db = await usersCollection()
        const resultDb = await users_db.find({ email: email }).toArray()

        if(resultDb.length > 0) {
            return true
        } else { 
            return false
        }

    } catch(error) {
        console.error(error)
        return false
    }

}

const createUser = async (email, hashedPassword) => {
    try {
        users_db.insertOne({
            'date': Date.now(),
            'email': email,
            'password': hashedPassword,
        })

        return true

    } catch(error) {
        console.error(error)
        return false
    }

}


const getHashedPassword = async (email) => {
    const users_db = await usersCollection()
    const result = await users_db.find({ email:email }).toArray()
    if(result.length > 0) {
        return result[0].password
    } else {
        return false
    }
}


module.exports = {
    isEmailExists,
    createUser,
    getHashedPassword,
}