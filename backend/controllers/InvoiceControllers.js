const mongoose = require('mongoose');
const InvoiceModel = require('../models/InvoiceModel');

function generateRandomNumber() {
  const min = 100000;
  const max = 999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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


//Create an invoice
const createInvoice = async (req, res) => {
  try {
    const { notes,dueDate,issuedDate,phoneNumber, name,totalQuantity, email,totalAmount, items } = req.body;
    const invoiceNumber = `INV${generateRandomNumber()}`; // generate a random 6-digit invoice number with the prefix "INV"

    const newInvoice = await InvoiceModel.create({notes,dueDate,issuedDate,phoneNumber, name,totalQuantity, email,totalAmount, items ,items, invoiceNumber // add the generated invoice number to the invoice
    });

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

// Edit invoice
const editInvoice = async (req, res) => {
  const { id: _id } = req.params;
  const invoice = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send('No invoice with that id');
  }

  const updatedInvoice = await InvoiceModel.findByIdAndUpdate(
    _id,
    { ...invoice, _id },
    { new: true }
  );

  res.json(updatedInvoice);
};




module.exports = { getInvoice, createInvoice, getInvoices, getTotalCount, editInvoice };
