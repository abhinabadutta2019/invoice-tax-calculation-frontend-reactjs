import axios from "axios";

const BASE_URL = "http://localhost:3012";

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

export const addServiceToInvoice = async (invoiceId, service) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/invoice/${invoiceId}/add-service`,
      service
    );
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

export const updateInvoice = async (id, invoice) => {
  try {
    const response = await axios.put(`${BASE_URL}/invoice/${id}`, invoice); // Used the router.put route
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};
