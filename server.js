require ('dotenv').config()
const { PORT=3001, DATABASE_URL } = process.env 
const express = require ('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const morgan = require ('morgan')
const { application } = require('express')

//database connection ///
mongoose.connect(DATABASE_URL)

mongoose.connection
.on('open', () => console.log('connected'))
.on('close', ()=> console.log('disconnected'))
.on('error', ()=> console.log('error'))

//models

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    image: String,
})

const Book = mongoose.model('Book', bookSchema)

/// middleware ///

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

///routes///

app.get('/bookshelf', async(req,res)=> {
    try {
        res.json(await Book.find({}))
    } catch (error) {
        res.status (400).json(error)
    }
})

app.post('/bookshelf', async (req,res) => {
    try{
        res.json(await Book.create (req.body))
    } catch (error) {
        res.status(400).json(error)
    }
})

app.delete('/bookshelf/:id', async (req,res) => {
    try{
        res.json(await Book.findByIdAndDelete (req.params.id))
    } catch (error) {
        res.status(400).json(error)
    }
})

app.put('/bookshelf/:id', async(req,res)=> {
    try{
        res.json(await Book.findByIdAndUpdate(req.params.id, req.body, { new : true }))
    } catch (error) {
        res.status(400).json(error)
    }
})



app.listen(PORT, ()=> console.log (`listening on PORT ${PORT}`))