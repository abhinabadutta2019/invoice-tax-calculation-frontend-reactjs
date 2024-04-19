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

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const savedId = localStorage.getItem("_id");
        if (savedId) {
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
          setTotalAmount(invoice.totalAmount.toString());
          setIsEditMode(false);
        } else {
          setIsEditMode(true);
        }
      } catch (error) {
        console.error("Error fetching invoice:", error);
      }
    };

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

      <form onSubmit={isEditMode ? handleCreateInvoice : handleUpdateInvoice}>
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
        <input
          placeholder="Total Amount"
          type="number"
          value={totalAmount}
          onChange={(e) => setTotalAmount(e.target.value)}
          disabled={!isEditMode}
          required
        />
        {!isEditMode ? (
          <button type="submit">Update Invoice</button>
        ) : (
          <button type="button" onClick={handleCreateInvoice}>
            Create Invoice
          </button>
        )}
        {!isEditMode && (
          <button type="button" onClick={handleEdit}>
            Edit Invoice
          </button>
        )}
      </form>

      <ServiceForm invoiceNumber={invoiceNumber} setServices={setServices} />
    </div>
  );
};

export default InvoiceCreate;
