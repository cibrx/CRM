const express = require('express')
const router = express.Router()
const { MongoClient } = require('mongodb')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const controller = require('./controller')
const { validateUserCreation, validateUserLogin } = require('../../models/authValidation')


router.post('/signup', validateUserCreation, controller.signup)
router.post('/login', validateUserLogin, controller.login)








router.prefix =  "/auth/"
module.exports = router

