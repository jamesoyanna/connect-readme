const { Schema, model } = require('mongoose');

const InvoiceSchema = new Schema({
    dueDate: Date,
    issuedDate: Date,
    items: [ { itemName: String, unitPrice: String, quantity: String} ],
    notes: String,
    status: String,
    invoiceNumber: String,
    type: String,
    creator: [String],
    totalAmountReceived: Number,
    name: String,
    phoneNumber: String,
    email: String,
    totalQuantity: Number,
    totalAmount: Number,

    createdAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports = model("Invoice", InvoiceSchema);