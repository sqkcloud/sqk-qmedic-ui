import axios from 'axios';

export const apiClient = axios.create({
  baseURL: '/api/dcm4chee',
  timeout: 20000,
  headers: {
    Accept: 'application/json',
  },
});

export function isHttpStatus(error: unknown, status: number) {
  return axios.isAxiosError(error) && error.response?.status === status;
}

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const payload = error?.response?.data;
    if (status !== 404) {
      console.error('API error', { status, payload, url: error?.config?.url });
    }
    return Promise.reject(error);
  },
);

export function getArchiveAet() {
  return process.env.NEXT_PUBLIC_DCM4CHEE_AET || 'DCM4CHEE';
}
