import { css } from '@emotion/react';
import { useEffect, useState } from 'react';

import { useSafeContext } from './useSafeContext';

import { ROW } from '@/constants/table-row';
import { ScrollContext } from '@/contexts/ScrollContext';

const useVirtualScroll = (maxIndex: number) => {
  const { scrollTop } = useSafeContext(ScrollContext);

  const [start, setStart] = useState(0);
  const offset = ROW.VISIBLE + ROW.PADDED;

  useEffect(() => {
    const startIndex = Math.floor(scrollTop / ROW.HEIGHT);
    const endIndex = startIndex + Math.ceil(window.outerHeight / ROW.HEIGHT);

    // current startIndex x cover visible nodes
    if (startIndex < start) {
      setStart(Math.max(0, startIndex - ROW.PADDED));
    }

    // current endIndex x cover visible nodes
    if (start + offset < endIndex) {
      setStart(Math.min(maxIndex, startIndex + ROW.PADDED));
    }
  }, [scrollTop]);

  const style = {
    dummy: (occupancy: number) =>
      css({
        height: ROW.HEIGHT * occupancy,
      }),
  };

  return { start, offset, style };
};

export default useVirtualScroll;
