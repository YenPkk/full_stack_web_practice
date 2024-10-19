require('dotenv').config();
require('express-async-errors'); // 用來取代asyncWrapper的功能

const express = require('express');
const app = express();

const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')


const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

// middleware
app.use(express.json())

//routes

app.get('/', (req, res) =>{
    res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>')
})
app.get('/test', (req, res) => {
    res.send('check')
})

app.use('/api/v1/products', productsRouter)


const port = process.env.PORT || 3000

// product rotues
app.use(notFoundMiddleware)
app.use(errorMiddleware)

const start = async () => {
    try {
        // connect DB
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening port ${port}`))
    } catch (error) {
        console.log(error)        
    }
}

start()
