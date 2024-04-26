const { body } = require('express-validator')

const validateUserCreation = [
    body('email').isEmail().withMessage('Please enter a valid email address.'),
    body('password').isLength({ min: 6}).withMessage('Password must be at least 6 characters.')
]

const validateUserLogin = [
    body('email').isEmail().withMessage('Please enter a valid email address.'),
    body('password').isLength({ min: 6}).withMessage('Password must be at least 6 characters.')
]


module.exports = {
    validateUserCreation,
    validateUserLogin,
}