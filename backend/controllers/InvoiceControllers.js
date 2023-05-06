const InvoiceModel = require('../models/InvoiceModel');

// Get all invoices
const getInvoices = async (req, res) => { 
  try {
    const invoices = await InvoiceModel.find().sort({ _id: -1 });
    res.json({ data: invoices });
  } catch (error) {    
    res.status(404).json({ message: error.message });
  }
};

// Get total account
const getTotalCount = async (req, res) => {
  const { searchQuery } = req.query;

  try {
    const totalCount = await InvoiceModel.countDocuments({ creator: searchQuery });
    res.status(200).json(totalCount);
  } catch (error) {    
    res.status(404).json({ message: error.message });
  }
};

// Create an invoice
const createInvoice = async (req, res) => {
  try {
    const newInvoice = await InvoiceModel.create(req.body);
    res.status(201).json(newInvoice);
  } catch (error) {
    res.status(409).json(error.message);
  }
};

// Get a single invoice
const getInvoice = async (req, res) => { 
  const { id } = req.params;

  try {
    const invoice = await InvoiceModel.findById(id);
    res.status(200).json(invoice);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

module.exports = { getInvoice, createInvoice, getInvoices, getTotalCount };
