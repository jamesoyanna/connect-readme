const express = require('express');
const connectToDatabase = require("./db.js");
const { Novu } = require('@novu/node');
const puppeteer = require('puppeteer');
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
  res.send("Welcome to connect me Novu API.")
})

let options = { format: 'A4' };

app.post('/send-pdf', async (req, res) => {
  const { email } = req.body;

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Generate PDF content using pdfTemplate function
    const content = pdfTemplate(req.body);

    // Set the HTML content of the page
    await page.setContent(content);

    // Generate the PDF
    const pdfBuffer = await page.pdf({ format: 'A4' });

    // Close the browser
    await browser.close();

    const novu = new Novu(process.env.NOVU_API_KEY);

    novu.trigger('invoice-notification', {
      to: {
        subscriberId: '63695b559e04bb11b56924df',
        email: email
      },
      payload: {
        attachments: [
          {
            file: pdfBuffer.toString('base64'),
            name: 'invoice.pdf',
            mime: 'application/pdf',
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while generating the PDF.' });
  }
});

app.post('/create-pdf', async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Generate PDF content using pdfTemplate function
    const content = pdfTemplate(req.body);

    // Set the HTML content of the page
    await page.setContent(content);

    // Generate the PDF
    const pdfBuffer = await page.pdf({ format: 'A4' });

    // Close the browser
    await browser.close();

    // Save the PDF to a file
    fs.writeFileSync('invoice.pdf', pdfBuffer);

    res.send('PDF created successfully.');
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while generating the PDF.');
  }
});

app.get('/fetch-pdf', (req, res) => {
  res.sendFile(`${__dirname}/invoice.pdf`);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
