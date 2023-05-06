const express = require('express');
const mongoose = require('mongoose');
const connectToDatabase = require("./db.js")

const app = express();

require("dotenv").config()

app.use(express.json());

/* connect to database */
connectToDatabase();

app.get('/', (req, res) => {
    res.send("Hello Api");
});


const PORT = process.env.PORT || 4000;
app.listen(PORT , () => {
    console.log(`Server listening on ${PORT}`);
});
