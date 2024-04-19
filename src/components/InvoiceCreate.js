import React, { useState, useEffect } from "react";
import axios from "axios";
import { addInvoice, updateInvoice } from "../services/api";
import ServiceForm from "./ServiceForm";

const InvoiceCreate = () => {
  const [customerName, setCustomerName] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [services, setServices] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isEditMode, setIsEditMode] = useState(true);
  const [totalTaxAmount, setTotalTaxAmount] = useState(0);
  const [totalDiscountAmount, setTotalDiscountAmount] = useState(0);

  const fetchInvoice = async () => {
    try {
      const savedId = localStorage.getItem("_id");
      if (savedId && savedId !== "null") {
        const response = await axios.get(
          `http://localhost:3012/invoice/${savedId}`
        );
        const invoice = response.data;
        setInvoiceNumber(invoice.invoiceNumber);
        setCustomerName(invoice.customerName);
        setInvoiceDate(invoice.invoiceDate.slice(0, 10));
        setDueDate(invoice.dueDate.slice(0, 10));
        setPaymentMethod(invoice.paymentMethod);
        setServices(invoice.services);
        setTotalAmount(invoice.totalAmount.toFixed(2));
        setTotalTaxAmount(invoice.totalTaxAmount.toFixed(2));
        setTotalDiscountAmount(invoice.totalDiscountAmount.toFixed(2));
        setIsEditMode(false);
      } else {
        setIsEditMode(true);
      }
    } catch (error) {
      console.error("Error fetching invoice:", error);
    }
  };

  useEffect(() => {
    fetchInvoice();
  }, []);

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleCreateInvoice = async () => {
    try {
      const invoice = {
        customerName,
        invoiceDate,
        dueDate,
        invoiceNumber,
        paymentMethod,
        services,
        totalAmount: parseFloat(totalAmount),
      };

      const createdInvoice = await addInvoice(invoice);
      setInvoiceNumber(createdInvoice.invoiceNumber);
      setIsEditMode(false);
      localStorage.setItem("_id", createdInvoice._id);
    } catch (error) {
      console.error("Error creating invoice:", error);
    }
  };

  const handleUpdateInvoice = async (e) => {
    e.preventDefault();
    try {
      const invoice = {
        customerName,
        invoiceDate,
        dueDate,
        invoiceNumber,
        paymentMethod,
        services,
        totalAmount: parseFloat(totalAmount),
      };

      const updatedInvoice = await updateInvoice(
        localStorage.getItem("_id"),
        invoice
      );
      setInvoiceNumber(updatedInvoice.invoiceNumber);
      setIsEditMode(false);
    } catch (error) {
      console.error("Error updating invoice:", error);
    }
  };

  return (
    <div>
      <h6>Create Invoice</h6>

      <form>
        <input
          placeholder="Invoice Number"
          value={invoiceNumber}
          onChange={(e) => setInvoiceNumber(e.target.value)}
          disabled
        />
        <input
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          disabled={!isEditMode}
          required
        />
        <input
          placeholder="Invoice Date"
          type="date"
          value={invoiceDate}
          onChange={(e) => setInvoiceDate(e.target.value)}
          disabled={!isEditMode}
          required
        />
        <input
          placeholder="Due Date"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          disabled={!isEditMode}
          required
        />
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          disabled={!isEditMode}
          required
        >
          <option value="">Select Payment Method</option>
          <option value="Cash">Cash</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Debit Card">Debit Card</option>
          <option value="Bank Transfer">Bank Transfer</option>
          <option value="Other">Other</option>
        </select>
        {/* <input
          placeholder="Total Amount"
          type="number"
          value={totalAmount}
          onChange={(e) => setTotalAmount(e.target.value)}
          disabled
        />
        <input
          placeholder="Total Tax Amount"
          type="number"
          value={totalTaxAmount}
          onChange={(e) => setTotalTaxAmount(e.target.value)}
          disabled
        />
        <input
          placeholder="Total Discount Amount"
          type="number"
          value={totalDiscountAmount}
          onChange={(e) => setTotalDiscountAmount(e.target.value)}
          disabled
        /> */}
        {localStorage.getItem("_id") ? (
          <button type="submit" onClick={handleUpdateInvoice}>
            Update Invoice
          </button>
        ) : (
          <button type="button" onClick={handleCreateInvoice}>
            Add Task to Invoice
          </button>
        )}
        {!isEditMode && (
          <button type="button" onClick={handleEdit}>
            Edit Invoice
          </button>
        )}
      </form>

      {/* Service component */}
      <ServiceForm
        _id={localStorage.getItem("_id")}
        setServices={setServices}
        fetchInvoice={fetchInvoice}
      />

      {/* Display section for totalAmount, totalTaxAmount, and totalDiscountAmount */}
      <div>
        <h6>Invoice Totals</h6>
        <p>Total Amount: ${totalAmount}</p>
        <p>Total Tax Amount: ${totalTaxAmount}</p>
        <p>Total Discount Amount: ${totalDiscountAmount}</p>
      </div>
    </div>
  );
};

export default InvoiceCreate;
