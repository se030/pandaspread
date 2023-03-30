import { FormEventHandler, useState } from 'react';
import { BiUpload } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

import * as S from './style';

import { postDataframe } from '@/apis/dataframe';

const FileUploader = () => {
  const [filename, setFilename] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    if (!form) return;

    const formData = new FormData(form);

    try {
      const { id, data } = await postDataframe(formData);

      navigate(`/data/${id}`, { state: { data } });
    } catch (err) {
      console.error(err);
    }
  };

  const onFileInput: FormEventHandler<HTMLInputElement> = (e) => {
    const target = e.target as HTMLInputElement;
    if (!target) return;

    const files = target.files;
    if (!files) return;

    const { name } = files[0];

    setFilename(name);
  };

  return (
    <S.Form onSubmit={onSubmit}>
      <S.Label htmlFor="file">{filename ?? <BiUpload size={30} />}</S.Label>
      <S.HiddenInput
        type="file"
        id="file"
        name="file"
        accept="text/csv"
        onChange={onFileInput}
      />
      <S.Button>upload</S.Button>
    </S.Form>
  );
};

export default FileUploader;
