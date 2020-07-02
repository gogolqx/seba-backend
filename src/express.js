import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import userRoutes from './routes/user'
import authRoutes from './routes/auth'

const app = express()


// parse body params and attache them to req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
// enable CORS - Cross Origin Resource Sharing
app.use(cors())


// mount routes
app.use('/', userRoutes)
app.use('/', authRoutes)



// Catch unauthorised errors
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({"error" : err.name + ": " + err.message})
    }else if (err) {
        res.status(400).json({"error" : err.name + ": " + err.message})
        console.log(err)
    }
})

export default app
