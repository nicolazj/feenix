import axios from 'axios';

import {
    T_ADDR_LOOKUP, T_AUTH_RESP, T_Device, T_Occurrence, T_Profile
} from '../types';

const proxy = 'https://stcoorfi73.execute-api.ap-southeast-2.amazonaws.com/dev';

const instance = axios.create({ baseURL: proxy });
instance.interceptors.request.use(config => {
  config.headers['x-api-key'] = 'me3sqhH3Jz28jskT26iIr6iEbHg2fIcm94OaGSl3';
  return config;
});

// instance.interceptors.response.use(
//   resp => resp,
//   err => {
//     if (
//       err.response &&
//       (err.response.status === 401 || err.response.status === 403)
//     ) {
//       Auth.reset();
//       // history.push('/login');
//       NavigationService.navigate({routeName:"Auth"})
//     }
//     return Promise.reject(err);
//   }
// );

const address = {
  lookup: async (address: string) => {
    const { data } = await instance.get<T_ADDR_LOOKUP[]>('/addresses', {
      params: { q: address },
    });
    return data;
  },
  prequal: async (id: string) => {
    const { data } = await instance.get(`/addressPrequal/${id}`);
    return data;
  },
};
export default {
  address,
};
