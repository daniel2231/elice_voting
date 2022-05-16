// express js server
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const {MONGO_URI, PORT} = process.env


const app = express()