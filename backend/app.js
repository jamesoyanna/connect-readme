const express = require('express');
const connectToDatabase = require("./db.js");
const { Novu } = require('@novu/node');
const pdf = require('html-pdf');
const cors = require('cors');
const fs = require('fs');

const pdfTemplate = require('./documents/index.js');

const app = express();

require("dotenv").config();

app.use(express.json());

// Enable CORS middleware
app.use(cors());

/* connect to database */
connectToDatabase();

// Routes
const userRoutes = require('./routes/userRoutes.js');
const invoiceRoutes = require('./routes/invoiceRoute.js');

app.use('/api/user', userRoutes);
app.use('/api/invoices', invoiceRoutes);

app.get('/', (req, res) => {
  res.send("Welcome to connect me Novu API");
});

app.post('/send-pdf', (req, res) => {
  const { email } = req.body;
  const pdfOptions = { format: 'A4' };

  // Generate PDF content using pdfTemplate function
  const content = pdfTemplate(req.body);

  pdf.create(content, pdfOptions).toFile('invoice.pdf', (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'An error occurred while generating the PDF.' });
    }

    const novu = new Novu(process.env.NOVU_API_KEY);

    novu.trigger('invoice-notification', {
      to: {
        subscriberId: '63695b559e04bb11b56924df',
        email: `${email}`
      },
      payload: {
        attachments: [
          {
            file: fs.readFileSync('invoice.pdf').toString('base64'),
            name: 'invoice.pdf',
            mime: 'application/octet-stream',
          },
        ],
      },
    });

    // Create the response data to be returned
    const responseData = {
      message: 'Invoice sent successfully.',
      email: email,
      invoiceData: req.body
    };

    // Send the response with the data
    res.json(responseData);
  });
});

app.post('/create-pdf', (req, res) => {
  const pdfOptions = { format: 'A4' };

  // Generate PDF content using pdfTemplate function
  const content = pdfTemplate(req.body);

  pdf.create(content, pdfOptions).toFile('invoice.pdf', (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('An error occurred while generating the PDF.');
    }

    res.send('PDF created successfully.');
  });
});

app.get('/fetch-pdf', (req, res) => {
  res.sendFile(`${__dirname}/invoice.pdf`);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
