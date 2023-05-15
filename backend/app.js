const express = require('express');
const connectToDatabase = require("./db.js")
const { Novu } = require('@novu/node');

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

let options = { format: 'A4' };
app.post('/send-pdf', (req, res) => {
    const { email } = req.body

    pdf.create(pdfTemplate(req.body), options).toFile('invoice.pdf', (err) => {
        
const novu = new Novu(process.env.NOVU_API_KEY);
novu.trigger('event-name', {
  to: {
    subscriberId: '...',
  },
  payload: {
    attachments: [
      {
        file: fs.readFileSync(__dirname + '/invoice.pd').toString('base64'),
        name: 'invoice.pdf',
        mime: 'application/octet-stream',
      },
    ],
  },
  overrides: {
    email: {
      to: [`${email}`],
      from: 'jamesoyanna@gmail.com',
      text: 'Invoice from James',
      replyTo: 'no-reply@engrjayt200@gmail.com',
    },
  },
});
})

})








const PORT = process.env.PORT || 4000;
app.listen(PORT , () => {
    console.log(`Server listening on ${PORT}`);
});
