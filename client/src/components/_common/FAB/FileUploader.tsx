import { css, useTheme } from '@emotion/react';
import { FormEventHandler, useRef } from 'react';
import { MdOutlineFileUpload } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { postDataframe } from '@/apis/dataframe';

const FileUploader = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  const onFileInput: FormEventHandler<HTMLInputElement> = async (e) => {
    const target = e.target as HTMLInputElement;
    if (!target) return;

    const files = target.files;
    if (!files) return;

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    const { name } = files[0];
    formData.append('name', name);

    try {
      const { id, data } = await postDataframe(formData);

      navigate(`/data/${id}`, { state: { data } });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  const { color } = useTheme();
  const { offwhite } = color;

  return (
    <form ref={formRef}>
      <label htmlFor="file" css={style.label}>
        <MdOutlineFileUpload size={'2rem'} color={offwhite} />
      </label>
      <input
        css={style.input}
        type="file"
        id="file"
        name="file"
        accept="text/csv"
        onChange={onFileInput}
      />
    </form>
  );
};

export default FileUploader;

const style = {
  label: css({ width: '100%', height: '100%', cursor: 'pointer' }),
  input: css({ display: 'none' }),
};
