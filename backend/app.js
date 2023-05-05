const express = require('express');
const mongoose = require('mongoose');
const app = express();

require("dotenv").config()

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello Api");
});

/* connect to database */
mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log("Database Connected Successfully..."))
.catch(err=>console.log(err))

const PORT = process.env.PORT || 4000;
app.listen(PORT , () => {
    console.log(`Server listening on ${PORT}`);
});
