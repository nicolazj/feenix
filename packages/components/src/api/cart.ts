import axios from 'axios';

import { T_Marketing_Product, T_SKU } from '../types';

const proxy = 'https://sustaining-pram.glitch.me/';

const instance = axios.create({
  baseURL: proxy,
});
instance.interceptors.request.use(config => {
  config.headers['admin-token'] = 'jklKij8847ABC';
  return config;
});


const admin = {
  translator: async () => {
    const { data } = await instance.get<T_SKU[]>('/admin/translator');
    return data;
  },
  marketingProducts:async()=>{
    const { data } = await instance.get<T_Marketing_Product[]>('/admin/marketing/products');
    return data;
  }
};
export default { admin };
