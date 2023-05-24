import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import InvoiceDetails from './components/InvoiceDetails';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Invoice from './components/Invoice';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Invoice />,
  },
  {
    path: "/invoice-details",
    element: <InvoiceDetails/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);


