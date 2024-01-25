import axios from "axios";
const serverUrl = "http://localhost:8010/api";

export const postApiHandler = async (endpoint, payload) => {
  try {
    const res = await axios.post(serverUrl + endpoint, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authorization")}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
export const getApiHandler = async (endpoint) => {
  try {
    const res = await axios.get(serverUrl + endpoint, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authorization")}`,
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
export const putApiHandler = async (endpoint, payload) => {
  try {
    const res = await axios.put(serverUrl + endpoint, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authorization")}`,
      },
    });
    return res;
  } catch (error) {
    return error.response;
  }
};