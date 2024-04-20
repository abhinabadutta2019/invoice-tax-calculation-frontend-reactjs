import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateInvoice, getInvoice } from "../services/api";
import ServiceForm from "./ServiceForm";

const InvoiceEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [services, setServices] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [totalTaxAmount, setTotalTaxAmount] = useState(0);
  const [totalDiscountAmount, setTotalDiscountAmount] = useState(0);
  const [errors, setErrors] = useState({});

  const fetchInvoice = async () => {
    try {
      const response = await getInvoice(id);
      const invoice = response;
      setInvoiceNumber(invoice.invoiceNumber);
      setCustomerName(invoice.customerName);
      setInvoiceDate(invoice.invoiceDate.slice(0, 10));
      setDueDate(invoice.dueDate.slice(0, 10));
      setPaymentMethod(invoice.paymentMethod);
      setServices(invoice.services);
      setTotalAmount(invoice.totalAmount.toFixed(2));
      setTotalTaxAmount(invoice.totalTaxAmount.toFixed(2));
      setTotalDiscountAmount(invoice.totalDiscountAmount.toFixed(2));
    } catch (error) {
      console.error("Error fetching invoice:", error);
    }
  };

  useEffect(() => {
    fetchInvoice();
  }, []);

  const validateForm = () => {
    const errors = {};

    if (!customerName) {
      errors.customerName = "Customer Name is required";
    }

    if (!invoiceDate) {
      errors.invoiceDate = "Invoice Date is required";
    }

    if (!dueDate) {
      errors.dueDate = "Due Date is required";
    }

    if (!paymentMethod) {
      errors.paymentMethod = "Payment Method is required";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateOrUpdateInvoice = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const invoiceData = {
        customerName,
        invoiceDate,
        dueDate,
        invoiceNumber,
        paymentMethod,
        services,
        totalAmount: parseFloat(totalAmount),
        totalTaxAmount: parseFloat(totalTaxAmount),
        totalDiscountAmount: parseFloat(totalDiscountAmount),
      };

      await updateInvoice(id, invoiceData);
      setIsEditMode(false);
    } catch (error) {
      console.error("Error updating invoice:", error);
    }
  };

  const handleClearInvoice = () => {
    navigate("/all-invoice");
  };

  return (
    <div>
      <h6>Edit Invoice</h6>

      <form id="invoiceForm" onSubmit={handleCreateOrUpdateInvoice}>
        <div className="form-group">
          <label htmlFor="invoiceNumber">Invoice Number:</label>
          <input
            id="invoiceNumber"
            placeholder="Invoice Number"
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="customerName">Customer Name:</label>
          <input
            id="customerName"
            placeholder="Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
            disabled={!isEditMode}
          />
          {errors.customerName && (
            <p className="error">{errors.customerName}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="invoiceDate">Invoice Date:</label>
          <input
            id="invoiceDate"
            placeholder="Invoice Date"
            type="date"
            value={invoiceDate}
            onChange={(e) => setInvoiceDate(e.target.value)}
            required
            disabled={!isEditMode}
          />
          {errors.invoiceDate && <p className="error">{errors.invoiceDate}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="dueDate">Due Date:</label>
          <input
            id="dueDate"
            placeholder="Due Date"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
            disabled={!isEditMode}
          />
          {errors.dueDate && <p className="error">{errors.dueDate}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="paymentMethod">Payment Method:</label>
          <select
            id="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
            disabled={!isEditMode}
          >
            <option value="">Select Payment Method</option>
            <option value="Cash">Cash</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Other">Other</option>
          </select>
          {errors.paymentMethod && (
            <p className="error">{errors.paymentMethod}</p>
          )}
        </div>

        {/* <div style={{ display: "flex", justifyContent: "space-between" }}> */}
        {isEditMode ? (
          <>
            {/* <button type="button" onClick={() => setIsEditMode(false)}>
              View Invoice
            </button> */}
            <button type="submit" form="invoiceForm">
              Update Invoice
            </button>
          </>
        ) : (
          <button type="button" onClick={() => setIsEditMode(true)}>
            Edit Invoice
          </button>
        )}
        {/* </div> */}
      </form>

      {/* Service component */}
      <ServiceForm
        _id={id}
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

      {/* Start Fresh Button */}
      <button
        type="button"
        onClick={handleClearInvoice}
        style={{ marginTop: "20px" }}
      >
        Finish and Back to Invoice List
      </button>
    </div>
  );
};

export default InvoiceEdit;
