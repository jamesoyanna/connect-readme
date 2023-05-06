const express = require('express');
const { getTotalCount, createInvoice, getInvoice } = require('../controllers/InvoiceControllers');

const router = express.Router();

router.get('/:id', getInvoice);
router.post('/', createInvoice);
router.get('/count', getTotalCount);

module.exports = router;
