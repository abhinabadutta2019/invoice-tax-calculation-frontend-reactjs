import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TaxCreate from "./components/TaxCreate";
import InvoiceCreate from "./components/InvoiceCreate";
import Navbar from "./shared/Navbar";
import InvoiceList from "./components/InvoiceList";
import InvoiceEdit from "./components/InvoiceEdit";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<InvoiceCreate />} />
        <Route path="/all-invoice" element={<InvoiceList />} />
        <Route path="/add-tax" element={<TaxCreate />} />
        <Route path="/edit-invoice/:id" element={<InvoiceEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
