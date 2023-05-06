const express = require('express');
const connectToDatabase = require("./db.js")

const app = express();

require("dotenv").config()

app.use(express.json());

/* connect to database */
connectToDatabase();

// Routes
const userRoutes = require('./routes/userRoutes.js');
const invoiceRoutes = require('./routes/invoiceRoute.js')

app.use('/api/user', userRoutes);
app.use('/api/invoices', invoiceRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT , () => {
    console.log(`Server listening on ${PORT}`);
});
