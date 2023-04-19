import { api } from './core';

export const putSortBy: PutSortByRequest = async (id, column, ascending) => {
  const { data: res } = await api.put(`/dataframe/${id}/sort`, {
    column,
    ascending: ascending ? 1 : 0,
  });
  const { data } = res;

  return { data: JSON.parse(data) };
};

type PutSortByRequest = (
  id: string,
  column: string,
  ascending: boolean,
) => Promise<PutSortByResponse>;
type PutSortByResponse = { data: Dataframe };
