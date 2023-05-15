const { Schema, model } = require('mongoose');

const InvoiceSchema = new Schema({
    dueDate: Date,
    items: [ { itemName: String, unitPrice: String, quantity: String} ],
    total: Number,
    subTotal: Number,
    notes: String,
    status: String,
    invoiceNumber: String,
    type: String,
    creator: [String],
    totalAmountReceived: Number,
    client: { name: String, email: String, address: String },
    paymentRecords: [ {amountPaid: Number, datePaid: Date, paymentMethod: String, note: String, paidBy: String } ],
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports = model("Invoice", InvoiceSchema);