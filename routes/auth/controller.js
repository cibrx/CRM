const service = require('./service')

const { validationResult } = require('express-validator')

const signup = async (req, res) => {
    // input validation
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: errors.array() })
    }

    const result = await service.signup(req.body)

    res.status(result.status).json(result.jsonData)
}


const login = async (req, res) => {
    // input validation
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: errors.array() })
    }

    const result = await service.login(req.body)

    res.status(result.status).json(result.jsonData)
}

module.exports = {
    signup,
    login,
}