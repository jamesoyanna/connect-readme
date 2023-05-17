import React, { useState } from "react";
import logo from "../images/nov-logo.webp";
import { useNavigate  } from "react-router-dom";
import axios from 'axios';

const Invoice = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const [invoiceData, setInvoiceData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    issuedDate: "",
    dueDate: "",
    items: [{ itemName: "", quantity: "", unitPrice: "" }],
    notes: "",
    total: "",
    invoiceNumber:"",
    totalQuantity: 0, 
    totalAmount: 0,
  });

  const navigateTo = (route, state) => {
    navigate(route, { state });
  };

  const handleCreateInvoice = async () => {
    try {
      setIsLoading(true); // Set loading state to true
      // Make the POST request to create an invoice
      const response = await axios.post(
        "http://localhost:5000/api/invoices",
        invoiceData
      );

      // Handle the response or perform any necessary actions
      const createdInvoiceData = response.data;
      console.log("Invoice created:", createdInvoiceData);

      // Redirect to the InvoiceDetails page with the invoice data and invoice number
      navigateTo("/invoice-details", {invoiceData: createdInvoiceData,});
    } catch (error) {
      // Handle any errors
      console.error("Error creating invoice:", error);
    }
  };
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInvoiceData({ ...invoiceData, [name]: value });
  };

  const handleItemChange = (index, event) => {
    const { name, value } = event.target;
    const newItems = [...invoiceData.items];
    newItems[index][name] = value;
    setInvoiceData({ ...invoiceData, items: newItems });
    updateTotals(newItems);
  };

  const handleAddItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, { itemName: "", quantity: "", unitPrice: "" }],
    });
  };

 
  const handleRemoveItem = (index) => {
    const newItems = [...invoiceData.items];
    newItems.splice(index, 1);
    setInvoiceData({ ...invoiceData, items: newItems });
    updateTotals(newItems);
  };


  const updateTotals = (items) => {
    const totalQuantity = items.reduce((total, item) => total + parseInt(item.quantity || 0), 0);
    const totalAmount = items.reduce(
      (total, item) => total + (parseInt(item.quantity || 0) * parseFloat(item.unitPrice || 0)),
      0
    );
    setInvoiceData({ ...invoiceData, totalQuantity, totalAmount });
  };


  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-3xl p-4 bg-white shadow-md rounded-lg mt-8">
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <img src={logo} alt="Logo" className="h-12 mb-2" />
              <h1 className="text-2xl font-medium">Novu Hackathon Invoice</h1>
              <p>Hilton Way, Ikeja, Lagos</p>
            </div>
            <div className="flex items-start">
              <div className="ml-auto">
                <p className="font-medium">Invoice No:</p>
                {invoiceData.invoiceNumber}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-400 mb-4"></div>
        </div>
        <div className="mb-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="billTo" className="block mb-1 font-medium">
                Bill To:
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={invoiceData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                placeholder="Enter bill to"
              />
            </div>
            <div>
              <div className="ml-8">
                <p className="font-medium">Issued Date:</p>
                <input
                  type="date"
                  name="issuedDate"
                  value={invoiceData.issuedDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                />
              </div>
              
            </div>
          </div>
        </div>
        <div className="mb-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block mb-1 font-medium">
                Email Address:
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={invoiceData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                placeholder="Enter email address"
              />
            </div>
            <div className="ml-8">
                <p className="font-medium">Due Date:</p>
                <input
                  type="date"
                  name="dueDate"
                  value={invoiceData.dueDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
              <label htmlFor="email" className="block mb-1 font-medium">
                Phone Number:
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                value={invoiceData.phoneNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                placeholder="Enter email address"
              />
            </div>
          </div>
        </div>
              <table className="w-full border-collapse border border-gray-400 mb-4">
              <thead>
              <tr>
              <th className="border border-gray-400 px-4 py-2">Item Description</th>
              <th className="border border-gray-400 px-4 py-2">Quantity</th>
              <th className="border border-gray-400 px-4 py-2">Price</th>
              <th className="border border-gray-400 px-4 py-2">Amount</th>
              <th className="border border-gray-400 px-4 py-2">Actions</th>
              </tr>
              </thead>
              <tbody>
              {invoiceData.items.map((item, index) => (
              <tr key={index}>
              <td className="border border-gray-400 px-4 py-2">
              <input
              name="itemName"
              type="text"
              value={item.itemName}
              onChange={(e) => handleItemChange(index, e)}
              className="w-full px-2 py-1 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter item description"
              />
              </td>
              <td className="border border-gray-400 px-4 py-2">
              <input
              name="quantity"
              type="number"
              value={item.quantity}
              onChange={(e) => handleItemChange(index, e)}
              className="w-full px-2 py-1 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter quantity"
              />
              </td>
              <td className="border border-gray-400 px-4 py-2">
              <input
              name="unitPrice"
              type="number"
              value={item.unitPrice}
              onChange={(e) => handleItemChange(index, e)}
              className="w-full px-2 py-1 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter price"
              />
              </td>
              <td className="border border-gray-400 px-4 py-2">{item.quantity * item.unitPrice}</td>
              <td className="border border-gray-400 px-4 py-2">
              <button
              onClick={() => handleRemoveItem(index)}
              className="text-red-500 hover:text-red-700 focus:outline-none"
              >
              Remove
              </button>
              </td>
              </tr>
              ))}
              </tbody>
              </table>
              <div className="mb-4">
              <button
                       onClick={handleAddItem}
                       className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                     >
              Add Item
              </button>
              </div>
              <div className="border-t border-b my-4"></div>
              <div className="flex items-start justify-between mb-4">
              <div>
<label htmlFor="note" className="block mb-1 font-medium">Note/Payment Info:</label>
<textarea
           id="notes"
           name="notes"
           value={invoiceData.notes}
           onChange={handleInputChange}
           className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
           placeholder="Enter note/payment info"
         />
</div>
              <div>
              <h3 className="text-lg font-medium">
              Invoice Summary:</h3>
<p>Total Quantity: {invoiceData.totalQuantity}</p>
<p>Total Amount: {invoiceData.totalAmount}</p>
</div>

</div>
<div className="flex justify-center">
<button
      onClick={handleCreateInvoice}
      type="submit"
      className="px-8 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
      disabled={isLoading} // Disable the button while loading
    >
      {isLoading ? "Creating..." : "Create Invoice"}
    </button>
</div>
</div>
</div>
);
};

export default Invoice;