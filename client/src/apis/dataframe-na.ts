import { api } from './core';

export const getNACount: GetNACountRequest = async (id) => {
  const { data: res } = await api.get(`/dataframe/${id}/na`);
  const { data } = res;

  return { data };
};

type GetNACountRequest = (id: string) => Promise<GetNACountResponse>;
type GetNACountResponse = { data: number[] };

export const deleteNA: DeleteNARequest = async (id, column) => {
  const { data: res } = await api.delete(`/dataframe/${id}/na`, {
    params: {
      column,
    },
  });
  const { data } = res;

  return { data: JSON.parse(data) };
};

type DeleteNARequest = (
  id: string,
  column: string,
) => Promise<DeleteNAResponse>;
type DeleteNAResponse = { data: Dataframe };
