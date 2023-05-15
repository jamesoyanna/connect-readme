import React, { useState } from "react";
import logo from "../images/logo.png";
import { useNavigate  } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [invoiceData, setInvoiceData] = useState({
    companyName: "",
    companyAddress: "",
    billTo: "",
    phoneNumber: "",
    emailAddress: "",
    issuedDate: "",
    dueDate: "",
    items: [{ description: "", quantity: "", price: "" }],
    note: "",
  });

  const navigateTo = (route) => {
    navigate(route);
  };

  const handleCreateInvoice = () => {
    // Perform any necessary data processing or validation

    // Navigate to the InvoiceDetails page
    navigateTo("/invoice-details");
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
  };

  const handleAddItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, { description: "", quantity: "", price: "" }],
    });
  };

  const handleRemoveItem = (index) => {
    const newItems = [...invoiceData.items];
    newItems.splice(index, 1);
    setInvoiceData({ ...invoiceData, items: newItems });
  };

  const getTotalQuantity = () => {
    return invoiceData.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalAmount = () => {
    return invoiceData.items.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-3xl p-4 bg-white shadow-md rounded-lg mt-8">
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <img src={logo} alt="Logo" className="h-12 mb-2" />
              <h1 className="text-2xl font-medium">{invoiceData.companyName}</h1>
              <p>Hilton Way, Ikeja, Lagos</p>
            </div>
            <div className="flex items-start">
              <div className="ml-auto">
                <p className="font-medium">Invoice No:</p>
               
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
                id="billTo"
                name="billTo"
                type="text"
                value={invoiceData.billTo}
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
              name="description"
              type="text"
              value={item.description}
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
              name="price"
              type="number"
              value={item.price}
              onChange={(e) => handleItemChange(index, e)}
              className="w-full px-2 py-1 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter price"
              />
              </td>
              <td className="border border-gray-400 px-4 py-2">{item.quantity * item.price}</td>
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
           id="note"
           name="note"
           value={invoiceData.note}
           onChange={handleInputChange}
           className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
           placeholder="Enter note/payment info"
         />
</div>
              <div>
              <h3 className="text-lg font-medium">
              Invoice Summary:</h3>
<p>Total Quantity: {getTotalQuantity()}</p>
<p>Total Amount: {getTotalAmount()}</p>
</div>

</div>
<div className="flex justify-center">
<button onClick={handleCreateInvoice}
         type="submit"
         className="px-8 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
       >
Create Invoice
</button>
</div>
</div>
</div>
);
};

export default Dashboard;