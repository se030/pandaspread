import { api } from './core';

export const postDataframe: PostDataframeRequest = async (formData) => {
  const headers = { 'Content-Type': 'multipart/formdata' };

  const { data } = await api.post('/dataframe', formData, {
    headers,
  });

  return data as PostDataframeResponse;
};

type PostDataframeRequest = (
  formData: FormData,
) => Promise<PostDataframeResponse>;

type PostDataframeResponse = { id: string; data: string };

export const getDataframe: GetDataframeRequest = async (id) => {
  const { data } = await api.get(`/dataframe/${id}`);

  return data as Dataframe;
};

type GetDataframeRequest = (id: string) => Promise<Dataframe>;
