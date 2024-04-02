const express = require('express')
const jwt = require('jsonwebtoken') 
const app = express()
const fs = require('fs')
const port = 4040
const dotenv = require('dotenv')

dotenv.config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const routers = fs.readdirSync('./routes/')
routers.forEach(routerFile => {
    const file = require(`./routes/${routerFile}`);
    app.use(file.prefix, file)
});


app.get('/test', (req, res) => {
    if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        jwt.verify(req.headers.authorization.split(' ')[1], process.env.API_SECRET, (err, decode) => {
            if(err) {
                return res.status(401).json({ success: false, message: 'No JWT provided. Please include a JWT in the Authorization header.' })
            }
            res.status(200).json({ succes: true, message: 'secret --- test end-point ---' })
        })
    
    } else {
        res.status(401).json({ success: false, message: 'No JWT provided. Please include a JWT in the Authorization header.' })
    }
})

app.listen(port, () => {
    console.log(`Server is live on http://localhost:${port}`)
})