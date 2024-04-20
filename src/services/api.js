import axios from "axios";

const BASE_URL = "https://invoicely-nvq7.onrender.com";

//
export const downloadInvoicePdf = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/invoice/download/${id}`, {
      responseType: "blob", // Important
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `invoice_${id}.pdf`); // Filename
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};
//

export const addInvoice = async (invoice) => {
  try {
    const response = await axios.post(`${BASE_URL}/invoice/`, invoice);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};

export const deleteInvoice = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/invoice/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};

export const addServiceToInvoice = async (_id, service) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/invoice/${_id}/add-service`,
      service
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};

export const removeServiceFromInvoice = async (_id, serviceId) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/invoice/${_id}/remove-service/${serviceId}`
    );
    return response.data.updatedInvoice;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};

export const updateInvoice = async (id, invoice) => {
  try {
    const response = await axios.put(`${BASE_URL}/invoice/${id}`, invoice);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};

export const getInvoice = async (_id) => {
  try {
    const response = await axios.get(`${BASE_URL}/invoice/${_id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};

export const getAllInvoices = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/invoice/`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};

export const addTax = async (tax) => {
  try {
    const response = await axios.post(`${BASE_URL}/tax`, tax);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};

export const getAllTaxes = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/tax`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};

export const toggleTaxDisabled = async (id) => {
  try {
    const response = await axios.put(`${BASE_URL}/tax/${id}/toggle`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};
