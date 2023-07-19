import axiosClient from './axiosClient';

const CheckoutAPI = {
  postEmail: (query) => {
    const url = `/email/${query}`;
    return axiosClient.post(url);
  },
  getOrderList: () => {
    const url = `orders`;
    return axiosClient.get(url);
  },
  getOrderByMonth: (query) => {
    const url = `orders/month/${query}`;
    return axiosClient.get(url);
  },
};

export default CheckoutAPI;
