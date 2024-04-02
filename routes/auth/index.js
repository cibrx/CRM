const express = require('express')
const router = express.Router()
const { MongoClient } = require('mongodb')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
const controller = require('./controller')
const { validateUserCreation, validateUserLogin } = require('../../models/authValidation')

dotenv.config({ path: '../../' })

router.post('/signup', validateUserCreation, controller.signup)
router.post('/login', validateUserLogin, controller.login)








router.prefix =  "/auth/"
module.exports = router

