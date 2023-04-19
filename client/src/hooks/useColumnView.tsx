import { MouseEventHandler, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { columnViewAtom } from '@/store/atom/columnView';
import { dataframeAtom } from '@/store/atom/dataframe';

const useColumnView = (idx?: number, update = true) => {
  const [{ columns }] = useRecoilState(dataframeAtom);

  const [columnView, setColumnView] = useRecoilState(columnViewAtom);

  const { id } = useParams();

  useEffect(() => {
    if (!update) return;

    const initialState = Array.from({ length: columns.length }).fill(
      true,
    ) as boolean[];

    setColumnView(initialState);
  }, [id]);

  if (idx === undefined) return { columnView };

  const toggleColumnView: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();

    setColumnView((prev) => {
      const updated = [...prev];
      updated[idx] = !updated[idx];

      return updated;
    });
  };

  return { isVisualized: columnView[idx], toggleColumnView };
};

export { useColumnView };
