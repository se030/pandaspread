import { css, useTheme } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import Th from './Th';

import { getDescription } from '@/apis/dataframe-describe';
import { useColumnVisibility } from '@/hooks/store/useColumnVisibility';
import { columnOrderAtom } from '@/store/atom/columnOrder';
import { dataframeAtom } from '@/store/atom/dataframe';
import { ThemeColor } from '@/styles/theme';

const Thead = () => {
  const [{ data, columns }] = useRecoilState(dataframeAtom);
  const { columnVisibility } = useColumnVisibility();

  const { id } = useParams();
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [descriptions, setDescriptions] = useState<Description[] | null>(null);

  const loadDescriptions = async () => {
    if (id === undefined) return;

    const { data } = await getDescription(id);
    setDescriptions(data);
  };

  useEffect(() => {
    loadDescriptions();
  }, [columns]);

  const { color } = useTheme();

  const [columnOrder] = useRecoilState(columnOrderAtom);

  return (
    <thead
      css={style.thead(color)}
      onClick={() => setIsDescriptionOpen((prev) => !prev)}
      className={isDescriptionOpen ? '' : 'hide'}
    >
      <tr>
        <th>
          Index<p>{data.length}</p>
        </th>
        {columnOrder.map((idx, i) => {
          const col = columns[idx];

          return (
            <Th
              key={`${col}-${i}`}
              title={col}
              description={descriptions?.[idx]}
              hidden={!columnVisibility?.[idx]}
              idx={idx}
            />
          );
        })}
      </tr>
    </thead>
  );
};

export default Thead;

const style = {
  thead: ({ gray100, gray300, offwhite }: ThemeColor) =>
    css({
      position: 'sticky',
      top: 0,
      zIndex: 1,
      backgroundColor: offwhite,
      boxShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
      cursor: 'pointer',

      th: {
        minHeight: '100px',
        padding: '2rem 1rem 1.5rem 1rem',
        fontWeight: 'bold',

        p: {
          width: 'fit-content',
          margin: 'auto',
          marginTop: '0.5rem',
          whiteSpace: 'nowrap',

          color: gray300,
          fontSize: '0.75rem',
          lineHeight: '1rem',
          padding: '0.25rem',
          border: `1px solid ${gray100}`,
          borderRadius: '4px',

          '&:nth-of-type(1)': {
            color: gray300,
          },
        },
      },

      '&.hide': {
        th: {
          paddingBottom: 0,
        },

        p: {
          visibility: 'hidden',
          height: 0,
          marginTop: 0,
        },

        svg: {
          visibility: 'hidden',
          height: 0,
        },
      },
    }),
  button: ({ gray100, gray300 }: ThemeColor) =>
    css({
      color: gray300,
      fontSize: '0.75rem',
      lineHeight: '1rem',
      padding: '0.25rem',
      border: `1px solid ${gray100}`,
      borderRadius: '4px',
    }),
};
