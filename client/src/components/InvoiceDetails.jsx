import React from "react";
import { useNavigate  } from "react-router-dom";

const InvoiceDetails = ({ invoiceData }) => {
  const navigate = useNavigate ();

  const navigateTo = (route) => {
    navigate(route);
  };

  const handleGoBack = () => {
    navigateTo("/");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-3xl p-4 bg-white shadow-md rounded-lg mt-8">
        {/* Same layout and styling as the Invoice component */}
        {/* Display the submitted invoice data */}
        {/* Use the invoiceData prop to access the data */}
        {/* Add the necessary HTML and CSS for displaying the data */}
        
        {/* Button to go back to the Invoice component */}
        <div className="flex justify-center mt-4">
          <button
            onClick={handleGoBack}
            className="px-8 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
