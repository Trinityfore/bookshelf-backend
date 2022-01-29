require ('dotenv').config()
const (PORT=3001, DATABASE_URL ) = process.env 
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

const Book = mongoose.model('Book, bookSchema')