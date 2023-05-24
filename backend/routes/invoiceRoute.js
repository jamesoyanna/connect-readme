const express = require('express');
const { getTotalCount, createInvoice, getInvoice, editInvoice } = require('../controllers/InvoiceControllers');

const router = express.Router();

router.get('/:id', getInvoice);
router.post('/', createInvoice);
router.patch('/:id', editInvoice);
router.get('/count', getTotalCount);

module.exports = router;
