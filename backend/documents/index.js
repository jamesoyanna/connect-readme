const moment = require('moment')

 const pdfTemplate =  (
  { name,
    phoneNumber,
     email,
     notes,
     items,
     dueDate,
     issuedDate,
     invoiceNumber,
     totalQuantity,
     totalAmount,
  }) => {
return `
<!DOCTYPE html>
<html>
<head>
<style>

.invoice-container {
   margin: 0;
   padding: 0;
   padding-top: 10px;
   font-family: 'Roboto', sans-serif;
   width: 530px;
   margin: 0px auto;
   }

table {
 font-family: Arial, Helvetica, sans-serif;
 border-collapse: collapse;
 width: 100%;
}

table td, table th {
 border: 1px solid rgb(247, 247, 247);
 padding: 10px;
}

table tr:nth-child(even){background-color: #f8f8f8;}

table tr:hover {background-color: rgb(243, 243, 243);}

table th {
 padding-top: 12px;
 padding-bottom: 12px;
 text-align: left;
 background-color: #FFFFFF;
 color: rgb(78, 78, 78);
}

.header {
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: 10px 5px;
   

}
.address {
   display: flex;
   align-items: center;
   flex-direction: column;
   justify-content: space-between;
   padding: 10px 0px 15px 0px;
   line-height: 10px;
   font-size: 12px;
   margin-top: -20px

}

.status {
   text-align: right;
}
.receipt-id {
   text-align: right;
}

.title {
   font-weight: 100px;
   text-transform: uppercase;
   color: gray;
   letter-spacing: 2px;
   font-size: 8px;
   line-height: 5px;
}

.summary {
   margin-top: 2px;
   margin-right: 0px;
   margin-left: 50%;
   margin-bottom: 15px;
}

img {
   width: 100px;
  
}

</style>
</head>
<body>
<div class="invoice-container">

<section  class="header">
<p style="font-size: 8px">
  Time issued:
<b>${moment().format('h:mm:ss a')}</b>
<p/>
       <div>
          <img src="https://res.cloudinary.com/startupbuz/image/upload/v1654250706/Amgray%20Assets/amgray-logo-sm-light.png" />
          <p style="font-size: 8px"> 6237 highway 6 south <br/>
          Houston, Texas 77083 <br/>
          Tel: 8326145180</p>
       </div>
</section>
<section class="address">
<div>
<p class="title">Shipper:</p>
<h4 style="font-size: 9px; line-height: 5px">${name}</h4>
<p style="font-size: 9px; line-height: 5px">${email}</p>
<p style="font-size: 9px; line-height: 5px">${phoneNumber}</p>
</div>
     <div style=" margin-bottom: 20px; margin-top: 20px">
     <p class="title">Consignee:</p>
     <h4 style="font-size: 9px; line-height: 5px">novu hackathon</h4>
     <p style="font-size: 9px; line-height: 5px">08038482848384</p>
     <p style="font-size: 9px; line-height: 5px">invoice@gmail.com</p>
     <p style="font-size: 9px; line-height: 5px"> <strong> Address: </strong>Lagos, Nigeria</p>
     </div>

   <div class="status" style="margin-top: -200px">
       <p class="title" style="font-size: 8px">Date Issued</p>
       <p  style="font-size: 9px" >${moment(issuedDate).format('ll')}</p>
       <p class="title" style="font-size: 8px">Due Date</p>
       <p  style="font-size: 9px" >${moment(dueDate).format('ll')}</p>
       <p class="title"  style="font-size: 8px">Amount</p>
       <h3 style="font-size: 12px"> $ ${totalAmount}</h3>
   </div>
</section>

<table>
 <tr>
   <th style="font-size: 9px">Item</th>
   <th style="font-size: 9px">Quantity</th>
   <th style="font-size: 9px">Price ($)</th>
 </tr>


</table>

<section class="summary">
   <table>
   <tr>
         <th style="font-size: 9px">Invoice Summary</th>
         <th></th>
       </tr>

       <tr>
           <td style="font-size: 10px">Total</td>
           <td style="text-align: right; font-size: 9px; font-weight: 700">${totalAmount}</td>
         </tr>

       <tr>
           <td style="font-size: 10px" >Paid</td>
           <td style="text-align: right; font-size: 9px; font-weight: 700"> $ ${totalQuantity}</td>
         </tr>

         <tr>
         <td style="font-size: 9px">Balance Due</td>
     
       </tr>
       
     </table>
 </section>
 <div>
     <hr>
     <h4 style="font-size: 9px">Note</h4>
     <p style="font-size: 9px">${notes}</p>
 </div>
</div>
</body>
</html>`
;
};

module.exports = pdfTemplate;