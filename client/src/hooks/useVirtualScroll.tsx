import { css } from '@emotion/react';
import { useLayoutEffect, useState } from 'react';

import { useSafeContext } from './useSafeContext';

import { ROW } from '@/constants/table-row';
import { ScrollContext } from '@/contexts/ScrollContext';

const useVirtualScroll = (maxIndex: number) => {
  const { scrollTop } = useSafeContext(ScrollContext);

  const [start, setStart] = useState(0);
  const offset = ROW.VISIBLE + ROW.PADDED;

  useLayoutEffect(() => {
    const scrollBarHeight = window.innerHeight / (maxIndex * ROW.HEIGHT);
    const currentVisibleNodes = Math.ceil(
      (window.innerHeight - 150) / ROW.HEIGHT,
    );

    const startIndex = Math.floor((scrollTop + scrollBarHeight) / ROW.HEIGHT);
    const endIndex = startIndex + currentVisibleNodes;

    // current startIndex x cover visible nodes
    if (startIndex < start) {
      setStart(Math.max(0, startIndex - ROW.PADDED));
    }

    // current endIndex x cover visible nodes
    if (start + offset < endIndex) {
      setStart(Math.min(maxIndex, endIndex - ROW.VISIBLE));
    }
  }, [scrollTop]);

  const style = (index: number) =>
    css({
      position: 'absolute',
      top: ROW.HEIGHT * index,
    });

  return { start, offset, style };
};

export { useVirtualScroll };
