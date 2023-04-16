import { css } from '@emotion/react';
import { useEffect, useRef, useState } from 'react';

import Table from '../Table';

import { ScrollContext } from '@/contexts/ScrollContext';

const DataSection = () => {
  const [scrollTop, setScrollTop] = useState(0);
  const scrollContainerRef = useRef<HTMLUnknownElement>(null);

  const onScroll = (e: Event) => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;

    setScrollTop(target.scrollTop);
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    scrollContainer.addEventListener('scroll', onScroll);

    return () => {
      scrollContainer.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <section ref={scrollContainerRef} css={style}>
      <ScrollContext.Provider value={{ scrollTop }}>
        <Table />
      </ScrollContext.Provider>
    </section>
  );
};

export default DataSection;

const style = css({
  width: 'calc(100% - 250px)',
  height: '100%',
  padding: '0 2rem 1rem 2rem',
  overflowY: 'scroll',
});
