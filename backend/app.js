const express = require('express');
const connectToDatabase = require("./db.js")
const { Novu } = require('@novu/node');
const pdf = require('html-pdf');
const cors = require('cors');
const fs = require('fs');

const pdfTemplate = require('./documents/index.js')

const app = express();

require("dotenv").config()

app.use(express.json());

// Enable CORS middleware
app.use(cors());

/* connect to database */
connectToDatabase();

// Routes
const userRoutes = require('./routes/userRoutes.js');
const invoiceRoutes = require('./routes/invoiceRoute.js')

app.use('/api/user', userRoutes);
app.use('/api/invoices', invoiceRoutes);

let options = { format: 'A4' };
app.post('/send-pdf', (req, res) => {
    const { email } = req.body
    pdf.create(pdfTemplate(req.body), options).toFile('invoice.pdf', (err) => {
        
const novu = new Novu(process.env.NOVU_API_KEY);

novu.trigger('invoice-notification', {
    to: {
      subscriberId: '63695b559e04bb11b56924df',
      email: `${email}`
    },
    payload: {
      attachments: [
        {
          file: fs.readFileSync(__dirname + '/invoice.pdf').toString('base64'),
          name: 'invoice.pdf',
          mime: 'application/octet-stream',
        },
      ],
    },
  });

})

})

//CREATE AND SEND PDF INVOICE
app.post('/create-pdf', (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile('invoice.pdf', (err) => {
      if(err) {
          res.send(Promise.reject());
      }
      res.send(Promise.resolve());
  });
});

//SEND PDF INVOICE
app.get('/fetch-pdf', (req, res) => {
   res.sendFile(`${__dirname}/invoice.pdf`)
})


const PORT = process.env.PORT || 4000;
app.listen(PORT , () => {
    console.log(`Server listening on ${PORT}`);
});
