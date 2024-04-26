const repository = require('./repository')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
let result 

const signup = async (body) => {
    const { email, password } = body
    const hashedPassword = await bcrypt.hash(password, 10)

    result = await repository.isEmailExists(email)

    if(!result) {
        result = await repository.createUser(email, hashedPassword)
        if(result) {
            return { status: 201, jsonData: { success: true, message: 'User created successfully.' } }
        } else {
            return { status: 500, jsonData: { success: false, message: 'An error occurred during user registration.' } }
        }
    } else {
        return { status: 400, jsonData: { success: false, message: 'That email is already taken.'} }
    }
}


const login = async (body) => {
    const { email, password } = body
    const result = await repository.getHashedPassword(email)

    if(result) {
        const resultCompare = await bcrypt.compare(password, result)

        if(resultCompare) {
            const token = jwt.sign({
                email: email   
            }, process.env.API_SECRET, {
                expiresIn: 3600
            })

            return { status: 200, jsonData: { success: true, mesage: '', accessToken: token } }

        } else {
            return { status: 401, jsonData: { success: false, message: 'Invalid email or password.' } }
        }
    } else {
        return { status: 401, jsonData: { success: false, message: 'Invalid email or password.' } }
    }
}




module.exports = {
    signup,
    login,
}

