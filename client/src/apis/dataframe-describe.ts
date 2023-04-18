import { api } from './core';

export const getDescription: GetDescriptionRequest = async (id) => {
  const { data: res } = await api.get(`/dataframe/${id}/describe`);
  const { data } = res;

  return {
    data: data.map((row: Description) => {
      return Object.entries(row).reduce((prev, [key, value]) => {
        return {
          ...prev,
          [key]: ['type', 'top', 'data'].includes(key) ? value : Number(value),
        };
      }, {});
    }),
  };
};

type GetDescriptionRequest = (id: string) => Promise<GetDescriptionResponse>;
type GetDescriptionResponse = { data: Description[] };
