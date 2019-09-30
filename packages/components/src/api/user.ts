import axios from 'axios';

import { T_AUTH_RESP, T_Device, T_Occurrence, T_Profile } from '../types';

const proxy = 'https://thankful-newt.glitch.me/';

const instance = axios.create({ baseURL: proxy });
instance.interceptors.request.use(config => {
  config.headers['Sky-X-Forwarded-for'] = 'test';
 
  // if (state.auth.token) {
  //   config.headers['Sky-X-Access-Token'] = state.auth.token;
  // }
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

const auth = {
  login: async (payload: { username: string; password: string }) => {
    const { data } = await instance.post<T_AUTH_RESP>(
      '/auth/skygo/token/v1/authenticate',
      {
        ...payload,
        deviceDetails: 'test',
        deviceID: 'pvt-test',
        deviceIP: '127.0.0.1',
      },
      {}
    );
    return data;
  },
};

const profile = {
  get: async (profileId: string) => {
    const { data } = await instance.get<T_Profile>(
      `/users/v1/${profileId}?appName=awsTest`
    );
    return data;
  },
  update: async (payload: any) => {
    const { data } = await instance.put<T_Profile>(`/users/v1`, payload);
    return data;
  },
};
const devices = {
  get: async () => {
    const { data } = await instance.get<{ data: T_Device[] }>(
      `/devices/v1?product=skygo`
    );
    return data.data;
  },
  update: async (profileId: string, deviceId: string, payload: any) => {
    const { data } = await instance.put(
      `/devices/v1/${deviceId}?product=skygo&profileId=${profileId}`,
      payload
    );
    return data;
  },
  delete: async (profileId: string, deviceId: string) => {
    const { data } = await instance.delete(
      `/devices/v1/${deviceId}?product=skygo&profileId=${profileId}&forceDelete=false`,
    );
    return data;
  },
};
const occurrences = {
  get: async () => {
    const { data } = await instance.get<{ occurrences: T_Occurrence[] }>(
      `/occurrences/v1`
    );
    return data.occurrences;
  },
};
const subscription = {
  get: async () => {
    const { data } = await instance.get(
      `/entitlements/v2/onlineSubscriptions?profileId=whatever`
    );
    return data;
  },
};
const entitlements = {
  get: async () => {
    const { data } = await instance.get(`/entitlements/v2`);
    return data;
  },
};
const parentalPin = {
  reset: async (profileId: string) => {
    const { data } = await instance.put(
      `/users/v1/${profileId}/emailResetParentalPin?appName=skygo`
    );
    return data;
  },
};
const detail = {
  get: async (profileId: string) => {
    const { data } = await instance.get<T_Profile>(
      `/frontend-service/v1/user/${profileId}?fields=onlineSubscriptions,entitlements,occurrences`
    );
    return data;
  },
};
export default {
  auth,
  profile,
  occurrences,
  subscription,
  entitlements,
  devices,
  detail,
  parentalPin,
};
