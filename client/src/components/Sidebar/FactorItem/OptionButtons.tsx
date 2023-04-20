import { css, useTheme } from '@emotion/react';
import { MouseEventHandler, useState } from 'react';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { FaSortAmountUpAlt, FaSortAmountDown } from 'react-icons/fa';
import { FiTrash2 } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { deleteNA } from '@/apis/dataframe-na';
import { putSortBy } from '@/apis/dataframe-sort';
import TinyLoader from '@/components/_common/Loader/TinyLoader';
import { useColumnView } from '@/hooks/store/useColumnView';
import { useColumnVisibility } from '@/hooks/store/useColumnVisibility';
import { dataframeAtom } from '@/store/atom/dataframe';
import { ThemeColor } from '@/styles/theme';

interface Props {
  idx: number;
}

export const ViewButton = ({ idx }: Props) => {
  const { isVisualized, toggleColumnView } = useColumnView(idx);

  const { color } = useTheme();

  return (
    <button css={[style.button(color), style.text]} onClick={toggleColumnView}>
      {isVisualized ? 'vis' : 'raw'}
    </button>
  );
};

export const VisibilityButton = ({ idx }: Props) => {
  const { isVisible, toggleColumnVisibility } = useColumnVisibility(idx);

  const { color } = useTheme();

  return (
    <button css={style.button(color)} onClick={toggleColumnVisibility}>
      {isVisible ? (
        <BsEyeFill className="icon" />
      ) : (
        <BsEyeSlashFill className="icon" />
      )}
    </button>
  );
};

interface CleanseButtonProps {
  column: string;
  naCount: number | null;
}

export const CleanseButton = ({ column, naCount }: CleanseButtonProps) => {
  const { id } = useParams();
  const [, setDataframe] = useRecoilState(dataframeAtom);

  const [isLoading, setIsLoading] = useState(false);

  const onCleanse: MouseEventHandler = async (e) => {
    e.stopPropagation();

    if (!id) return;

    setIsLoading(true);

    const { data } = await deleteNA(id, column);
    setDataframe(data);

    setIsLoading(false);
  };

  const { color } = useTheme();

  return (
    <button css={style.button(color)} className="cleanse" onClick={onCleanse}>
      {isLoading ? (
        <TinyLoader />
      ) : (
        <>
          {naCount === null ? '' : naCount}
          <FiTrash2 className="icon" />
        </>
      )}
    </button>
  );
};

export const SortButton = ({ column }: { column: string }) => {
  const { id } = useParams();
  const [, setDataframe] = useRecoilState(dataframeAtom);

  const [isAscending, setIsAscending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { color } = useTheme();

  const sortDataframe = async (id: string, isAsc: boolean) => {
    const { data } = await putSortBy(id, column, isAsc);
    setDataframe(data);

    setIsLoading(false);
  };

  const onSort: MouseEventHandler = (e) => {
    e.stopPropagation();

    if (!id) return;

    setIsAscending((prev) => {
      setIsLoading(true);

      sortDataframe(id, !prev);

      const { currentTarget } = e;

      document.querySelectorAll('.sort-button').forEach((el) => {
        if (el === currentTarget) el.classList.add('active');
        else el.classList.remove('active');
      });

      return !prev;
    });
  };

  return (
    <button css={style.button(color)} onClick={onSort} className="sort-button">
      {
        // eslint-disable-next-line no-nested-ternary
        isLoading ? (
          <TinyLoader />
        ) : isAscending ? (
          <FaSortAmountUpAlt className="icon" />
        ) : (
          <FaSortAmountDown className="icon" />
        )
      }
    </button>
  );
};

const style = {
  button: ({ primaryDark, gray100, gray300, black }: ThemeColor) =>
    css({
      color: gray300,
      fontSize: '0.75rem',
      lineHeight: '1rem',
      padding: '0.25rem',
      border: `1px solid ${gray100}`,
      borderRadius: '4px',

      '& > .icon': {
        transform: 'translateY(1.5px)',
      },

      '&:hover': {
        color: black,
        border: `1px solid ${gray300}`,
      },

      '&.active': {
        color: primaryDark,
      },

      '&.cleanse': {
        fontSize: '0.6rem',
        '.icon': {
          transform: 'translateY(1.15px)',
        },
      },
    }),
  text: css({
    width: '2rem',
  }),
};
