import axiosClient from './axiosClient';

const UserAPI = {
  getAllData: () => {
    const url = '/users';
    return axiosClient.get(url);
  },
  getClient: () => {
    const url = `users/clients`;
    return axiosClient.get(url);
  },
  getDetailData: (id) => {
    const url = `/users/${id}`;
    return axiosClient.get(url);
  },

  getSessionSignIn: () => {
    const url = `users/login`;
    return axiosClient.get(url);
  },

  postSignUp: (query) => {
    const url = `/users/signup/${query}`;
    return axiosClient.post(url);
  },
  postLogIn: (query) => {
    const url = `/users/adminlogin/${query}`;
    return axiosClient.post(url);
  },
  postLogOut: () => {
    return axiosClient.post(`/users/logout`);
  },
};

export default UserAPI;
