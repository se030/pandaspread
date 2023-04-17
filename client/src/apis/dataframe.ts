import { api } from './core';

export const postDataframe: PostDataframeRequest = async (formData) => {
  const headers = { 'Content-Type': 'multipart/formdata' };

  const { data: res } = await api.post('/dataframe', formData, {
    headers,
  });
  const { id, data } = res;

  return { id, data: JSON.parse(data) };
};

type PostDataframeRequest = (
  formData: FormData,
) => Promise<PostDataframeResponse>;
type PostDataframeResponse = { id: string; data: Dataframe };

export const getDataframe: GetDataframeRequest = async (id) => {
  const { data: res } = await api.get(`/dataframe/${id}`);
  const { data } = res;

  return { data: JSON.parse(data) };
};

type GetDataframeRequest = (id: string) => Promise<GetDataframeResponse>;
type GetDataframeResponse = { data: Dataframe };

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
