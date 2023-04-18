import { api } from './core';

export const getDescription: GetDescriptionRequest = async (id) => {
  const { data: res } = await api.get(`/dataframe/${id}/describe`);
  const { data } = res;

  return { data };
};

type GetDescriptionRequest = (id: string) => Promise<GetDescriptionResponse>;
type GetDescriptionResponse = { data: Description[] };
