import axiosInstance from './ajax';
export const reqLogin = (username,password) => axiosInstance.post('/login',{username,password});
export  const reqValidataUser = (id) => axiosInstance.post('/validate/user', {id});