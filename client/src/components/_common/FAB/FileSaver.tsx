import { useTheme } from '@emotion/react';
import { MdOutlineSave } from 'react-icons/md';

const FileSaver = () => {
  const { color } = useTheme();
  const { offwhite } = color;

  return <MdOutlineSave size={'2rem'} color={offwhite} />;
};

export default FileSaver;
