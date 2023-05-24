const express = require('express');
const connectToDatabase = require("./db.js");
const { Novu } = require('@novu/node');
const PDFDocument = require('pdfkit');
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

  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream('invoice.pdf'));

  // Generate PDF content using pdfTemplate function
  const content = pdfTemplate(req.body);

  // Write PDF content to the document
  doc.text(content);

  // Finalize the PDF and close the document stream
  doc.end();

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

  // Create the response data to be returned
  const responseData = {
    message: 'Invoice sent successfully.',
    email: email,
    invoiceData: req.body
  };

  // Send the response with the data
  res.json(responseData);
});

app.post('/create-pdf', (req, res) => {
  const doc = new PDFDocument();

  // Generate PDF content using pdfTemplate function
  const content = pdfTemplate(req.body);

  // Write PDF content to the document
  doc.text(content);

  // Pipe the document stream to a file
  doc.pipe(fs.createWriteStream('invoice.pdf'));

  // Finalize the PDF and close the document stream
  doc.end();

  res.send('PDF created successfully.');
});

app.get('/fetch-pdf', (req, res) => {
  res.sendFile(`${__dirname}/invoice.pdf`);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
