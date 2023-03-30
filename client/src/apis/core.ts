import axios, { AxiosError } from 'axios';

import env from '@/config';

const api = axios.create();

api.defaults.baseURL = env.SERVER_PATH;

const onError = (error: AxiosError) => {
  const { response } = error;
  if (!response) throw new Error('Invalid Api call');

  const { status, statusText } = response;
  const data = response?.data as { message: string } | undefined;

  throw new Error(data?.message ?? `${status} ${statusText}`);
};
api.interceptors.response.use(null, onError);

export { api };
