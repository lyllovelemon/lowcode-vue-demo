import { RuntimeOptionsConfig } from '@alilc/lowcode-datasource-types';
import axios from 'axios';
export enum DATA_TYPE {
  json = 'json',
  text = 'text'
}
export interface RequestOptions {
  url: string;
  headers?: AsObject;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD';
  data?: AsObject;
  timeout?: number;
  dataType?: DATA_TYPE;
}
export interface AsObject { [key: string]: string | number }
export function createAxiosHandler(config?: Record<string, unknown>) {
  return async function(options: RuntimeOptionsConfig) {
    const params = typeof options.params === 'object' ? JSON.stringify(options.params) : options.params;
    const requestConfig = {
      ...options,
      url: options.uri,
      method: (options.method as RequestOptions['method'])||'get',
      data: params,
      headers: options.headers as AsObject,
      ...config,
    };
    // @ts-ignore
    const response = await axios(requestConfig);
    return response;
  };
}
