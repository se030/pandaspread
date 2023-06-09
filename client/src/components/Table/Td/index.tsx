import { css, useTheme } from '@emotion/react';
import * as d3 from 'd3';
import { MouseEventHandler, useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';

import { useColumnView } from '@/hooks/store/useColumnView';
import { columnScaleSelector } from '@/store/selector/columnScale';
import { ThemeColor } from '@/styles/theme';

interface Props {
  idx: number;
  value: string;
  hidden: boolean;
}

const Td = ({ idx, value, hidden }: Props) => {
  const { isVisualized } = useColumnView(idx);

  const svgRef = useRef<SVGSVGElement>(null);
  const columnScale = useRecoilValue(columnScaleSelector);

  useEffect(() => {
    const scale = columnScale[idx];
    if (!scale || !svgRef.current) return;

    const widthOccupancy = svgRef.current.getBoundingClientRect().width;
    const scaleWidth = scale.range.range([0, widthOccupancy]);

    const svg = d3.select(svgRef.current).attr('height', '1rem');

    svg.selectChildren().remove();

    svg
      .append('rect')
      .attr('width', () => scaleWidth(Number(value)))
      .attr('height', '1rem')
      .attr('fill', () => scale.color(Number(value)));

    const x = scaleWidth(Number(value));
    const textLength = (`${value}`?.length ?? 0) * 7;
    const isTextOverflown = x + textLength < widthOccupancy;

    svg
      .append('text')
      .text(value)
      .attr('fill', 'none')
      .attr('font-size', '12')
      .attr('x', () => (isTextOverflown ? x + 3 : x - textLength - 3))
      .attr('y', '12')
      .attr('class', () => (isTextOverflown ? '' : 'contrast'));
  }, [isVisualized, columnScale]);

  const onToggleText: MouseEventHandler = (e) => {
    const { currentTarget } = e;
    if (!(currentTarget instanceof SVGSVGElement)) return;

    currentTarget.classList.toggle('text');
  };

  const { color } = useTheme();

  return (
    <td hidden={hidden} css={style.td(value?.length)}>
      {isVisualized && columnScale[idx] ? (
        <svg ref={svgRef} css={style.svg(color)} onClick={onToggleText}></svg>
      ) : (
        value
      )}
    </td>
  );
};

export default Td;

const style = {
  td: (length: number) =>
    css({
      fontSize: length < 10 ? '1rem' : '0.8rem',
    }),
  svg: ({ black }: ThemeColor) =>
    css({
      '&.text': {
        text: {
          fill: black,

          '&.contrast': {
            fill: 'white',
          },
        },
      },
    }),
};
