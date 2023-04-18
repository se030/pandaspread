import { css, useTheme } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { getDescription } from '@/apis/dataframe-describe';
import { ColumnContext } from '@/contexts/ColumnContext';
import { useColumnVisibility } from '@/hooks/useColumnVisibility';
import { useSafeContext } from '@/hooks/useSafeContext';
import { dataframeAtom } from '@/store/atom/dataframe';
import { ThemeColor } from '@/styles/theme';

const Thead = () => {
  const [{ data, columns }] = useRecoilState(dataframeAtom);
  const { columnVisibility } = useColumnVisibility();

  const { columnRefs } = useSafeContext(ColumnContext);

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
        {columns.map((col, idx) => (
          <th
            key={col}
            hidden={!columnVisibility?.[idx]}
            ref={(ref) => ref && columnRefs.current.push(ref)}
          >
            {col}
            {descriptions && getDescriptionElements(descriptions[idx])}
          </th>
        ))}
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
      boxShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
      cursor: 'pointer',

      th: {
        '&:nth-of-type(1)': {
          width: 'fit-content', // Index column
        },

        padding: '2rem 1rem 1.5rem 1rem',
        fontWeight: 'bold',
        backgroundColor: offwhite,

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
        paddingBottom: 0,

        p: {
          visibility: 'hidden',
          height: 0,
          marginTop: 0,
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

const getDescriptionElements = (desc: Description) => {
  if (desc.type === 'categorical') {
    const categoricalDesc = desc as CategoricalDescription;

    return (
      <>
        <p>{categoricalDesc.count}</p>
        <p>
          {categoricalDesc.freq} {categoricalDesc.top}
        </p>
      </>
    );
  } else {
    const numericalDesc = desc as NumericalDescription;
    return (
      <>
        <p>{numericalDesc.count}</p>
        <p>mean {numericalDesc.mean.toFixed(2)}</p>
        <p>std {numericalDesc.std.toFixed(2)}</p>
      </>
    );
  }
};
