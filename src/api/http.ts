import { getStorage } from '@/utils/storage';
import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import { BASE_CONFIG } from '../utils/config';

const instance: AxiosInstance = axios.create({
  baseURL: BASE_CONFIG.domain,
  timeout: 30 * 1000,
});

instance.interceptors.request.use(onBeforeRequest, onBeforeRequestError);
instance.interceptors.response.use(onResponse, onResponseError);

// Replace static class with object containing functions
export const Http = {
  async get(url: string, params?: any, config?: AxiosRequestConfig): Promise<any> {
    return instance.get(url, { params, ...config });
  },

  async delete(url: string, params?: any, config?: AxiosRequestConfig): Promise<any> {
    return instance.delete(url, { params, ...config });
  },

  async post(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
    return instance.post(url, data, config);
  },

  async put(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
    return instance.put(url, data, config);
  },

  async patch(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
    return instance.patch(url, data, config);
  },
};

async function onBeforeRequest(config: InternalAxiosRequestConfig) {
  config.headers = config.headers || {};
  config.headers.token =
    getStorage('TOKEN') ||
    // '9417d4640092471f812e0261f932d1c1' ||
    'b70377a792b749e9b7ba680000000000';
  console.log('token', config.headers.token);
  return config;
}
function onBeforeRequestError(error: any) {
  console.error('[Http] onBeforeRequestError', error);
}
function onResponse(response: AxiosResponse): any {
  return response.data;
}

interface ResponseError {
  code: string;
  msg: string;
  data?: any;
}
function onResponseError(error: any): Promise<ResponseError> {
  // 网络异常
  if (error.code === 'ERR_NETWORK') {
    return Promise.reject({ code: 0, msg: error.message });
  }
  const response = error.response;
  console.error(
    `[Http] onBeforeRequestError: status=${response?.status}, message=${
      error.message
    }, data=${JSON.stringify(response?.data)}`,
  );
  return Promise.reject({
    code: response?.status,
    msg: error.message,
    data: response?.data || error,
  });
}
