import React from "react";
import logo from "../images/logo-dark.png";
import { Link } from "react-router-dom";

const InvoiceHeader = ({ invoiceNumber }) => {
  return (
    <div className="flex items-start justify-between mb-4">
      <div>
        <Link to="/">
          <img src={logo} alt="Logo" className="h-12 mb-2" />
        </Link>
        <h1 className="text-2xl font-medium">Novu Hackathon Invoice</h1>
        <p>Lagos, Nigeria</p>
      </div>
      <div className="flex items-start">
        <div className="ml-auto">
          <p className="font-medium">Invoice No:</p>
          {invoiceNumber}
        </div>
      </div>
    </div>
  );
};

export default InvoiceHeader;
