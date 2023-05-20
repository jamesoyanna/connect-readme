import React, {useState} from "react";
import logo from "../images/nov-logo.webp";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const InvoiceDetails = () => {
  const location = useLocation();
  const invoiceData = location.state?.invoiceData;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigateTo = (route) => {
    navigate(route);
  };

  const handleGoBack = () => {
    navigateTo("/");
  };

  const handleSendInvoice = async () => {
    try {
      setLoading(true);
      setError("");
  
      // Extract the email address from the invoiceData object
      const { email } = invoiceData;
  
      // Make a POST request to the send-pdf endpoint
      const response = await axios.post("http://localhost:5000/send-pdf", {
        email,
        invoiceData,
      });
  
      setLoading(false);
  
      // Handle the response
      console.log(response.data); // You can customize this based on your requirements
    } catch (error) {
      setLoading(false);
      setError("An error occurred while sending the invoice.");
      console.error(error);
    }
  };
  

      
  // Format the date to a readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toDateString();
  };


  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-3xl p-4 bg-white shadow-md rounded-lg mt-8">
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <img src={logo} alt="Logo" className="h-12 mb-2" />
              <h1 className="text-2xl font-medium">Novu hackathon Invoice</h1>
              <p>Hilton Way, Ikeja, Lagos</p>
            </div>
            <button
              onClick={handleGoBack}
              className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
            >
              Go Back
            </button>
            <div className="flex items-start">
                
              <div className="ml-auto">
                <p className="font-medium">Invoice No:</p>
                <p>{invoiceData.invoiceNumber}</p>
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
              <p>{invoiceData.name}</p>
            </div>
            <div>
              <div className="ml-8">
                <p className="font-medium">Issued Date:</p>
                <p>{formatDate(invoiceData.issuedDate)}</p>
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
              <p>{invoiceData.email}</p>
            </div>
            <div className="ml-8">
              <p className="font-medium">Due Date:</p>
              <p>{formatDate(invoiceData.dueDate)}</p>
            </div>
            <div>
              <label htmlFor="email" className="block mb-1 font-medium">
                Phone Number:
              </label>
              <p>{invoiceData.phoneNumber}</p>
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
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-400 px-4 py-2">{item.itemName}</td>
                <td className="border border-gray-400 px-4 py-2">{item.quantity}</td>
                <td className="border border-gray-400 px-4 py-2">{item.unitPrice}</td>
                <td className="border border-gray-400 px-4 py-2">{item.quantity * item.unitPrice}</td>
               
              </tr>
            ))}
          </tbody>
        </table>
       
        <div className="border-t border-b my-4"></div>
        <div className="flex items-start justify-between mb-4">
          <div>
            <label htmlFor="note" className="block mb-1 font-medium">
              Note/Payment Info:
            </label>
            <p>{invoiceData.notes}</p>
          </div>
          <div>
            <h3 className="text-lg font-medium">Invoice Summary:</h3>
            <p>Total Quantity: {invoiceData.totalQuantity}</p>
            <p>Total Amount: {invoiceData.totalAmount}</p>
          </div>
        </div>
        <div className="flex justify-center">
        {error && <p>{error}</p>}
          <button className="px-8 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none" onClick={handleSendInvoice} disabled={loading}>
            {loading ? "Sending..." : "Send Invoice"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
