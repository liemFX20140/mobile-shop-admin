import axiosClient from './axiosClient';

const ProductAPI = {
  getAPI: () => {
    const url = '/products';
    return axiosClient.get(url);
  },

  getCategory: (query) => {
    const url = `/products/category/${query}`;
    return axiosClient.get(url);
  },

  getDetail: (id) => {
    const url = `/products/detail/${id}`;
    return axiosClient.get(url);
  },

  getPagination: (query) => {
    const url = `/products/pagination/${query}`;
    return axiosClient.get(url);
  },
  addNewProduct: (query, body) => {
    const url = `/newproduct/`;
    return axiosClient.post(url, body);
  },
  editNewProduct: (query, body) => {
    const url = `/editproduct/${query}`;
    return axiosClient.post(url, body);
  },
  delProduct: (query) => {
    const url = `delproduct/${query}`;
    return axiosClient.delete(url);
  },
};

export default ProductAPI;
