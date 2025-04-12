import axios from 'axios';

const option = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  timeout: 10000,
};

const API = axios.create(option);

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { data, status } = error.response;
    if (data === 'Unauthorized' && status === 401) {
    }
    if (status === 405) {
      return Promise.reject({ message: `Method not allowed ${error}` });
    }
    return Promise.reject({ ...data });
  },
);

export default API;
