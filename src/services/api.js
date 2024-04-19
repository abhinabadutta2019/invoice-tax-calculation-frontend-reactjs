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
