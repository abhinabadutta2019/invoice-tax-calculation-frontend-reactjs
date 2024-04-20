import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateInvoice, getInvoice } from "../services/api";
import ServiceForm from "./ServiceForm";
import Footer from "../shared/Footer";

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
    <>
      <div className="container pb-4">
        <h4 className="text-center">Edit Invoice</h4>

        <form id="invoiceForm" onSubmit={handleCreateOrUpdateInvoice}>
          <div className="mb-3">
            <label htmlFor="invoiceNumber" className="form-label">
              Invoice Number:
            </label>
            <input
              id="invoiceNumber"
              className="form-control"
              placeholder="Invoice Number"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              disabled
            />
          </div>
          <div className="mb-3">
            <label htmlFor="customerName" className="form-label">
              Customer Name:
            </label>
            <input
              id="customerName"
              className="form-control"
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
          <div className="mb-3">
            <label htmlFor="invoiceDate" className="form-label">
              Invoice Date:
            </label>
            <input
              id="invoiceDate"
              className="form-control"
              type="date"
              value={invoiceDate}
              onChange={(e) => setInvoiceDate(e.target.value)}
              required
              disabled={!isEditMode}
            />
            {errors.invoiceDate && (
              <p className="error">{errors.invoiceDate}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="dueDate" className="form-label">
              Due Date:
            </label>
            <input
              id="dueDate"
              className="form-control"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
              disabled={!isEditMode}
            />
            {errors.dueDate && <p className="error">{errors.dueDate}</p>}
          </div>
          <div className="mb-3">
            <label htmlFor="paymentMethod" className="form-label">
              Payment Method:
            </label>
            <select
              id="paymentMethod"
              className="form-control"
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

          {isEditMode ? (
            <>
              <button type="submit" className="btn btn-primary me-2">
                Update Invoice
              </button>
            </>
          ) : (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setIsEditMode(true)}
            >
              Edit Invoice
            </button>
          )}
        </form>

        {/* Service component */}
        <ServiceForm
          _id={id}
          setServices={setServices}
          fetchInvoice={fetchInvoice}
        />

        {/* Display section for totalAmount, totalTaxAmount, and totalDiscountAmount */}
        {/* <div className="mt-4">
          <h6>Invoice Totals</h6>
          <p>Total Amount: ${totalAmount}</p>
          <p>Total Tax Amount: ${totalTaxAmount}</p>
          <p>Total Discount Amount: ${totalDiscountAmount}</p>
        </div> */}
        <div className="mt-4">
          <h6>Invoice Totals</h6>
          <table className="table">
            <tbody>
              <tr>
                <td style={{ textAlign: "right", fontWeight: "bold" }}>
                  Total Amount:
                </td>
                <td style={{ fontWeight: "bold" }}>${totalAmount}</td>
              </tr>
              <tr>
                <td style={{ textAlign: "right" }}>Total Tax Amount:</td>
                <td>${totalTaxAmount}</td>
              </tr>
              <tr>
                <td style={{ textAlign: "right" }}>Total Discount Amount:</td>
                <td>${totalDiscountAmount}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Start Fresh Button */}
        <button
          type="button"
          className="btn btn-danger mt-4"
          onClick={handleClearInvoice}
        >
          Finish and Back to Invoice List
        </button>
      </div>

      <Footer />
    </>
  );
};

export default InvoiceEdit;
