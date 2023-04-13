import { css, useTheme } from '@emotion/react';
import * as d3 from 'd3';
import { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';

import { useColumnView } from '@/hooks/useColumnView';
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

  const { color } = useTheme();
  const { primary } = color;

  useEffect(() => {
    const scale = columnScale[idx];
    if (!scale || !svgRef.current) return;

    const widthOccupancy = svgRef.current.getBoundingClientRect().width;
    const scaleWidth = scale.range([0, widthOccupancy]);

    const canvas = d3.select(svgRef.current).attr('height', '1rem');

    canvas
      .append('rect')
      .attr('width', () => scaleWidth(Number(value)))
      .attr('height', '1rem')
      .attr('fill', primary);

    canvas
      .append('text')
      .text(value)
      .attr('fill', 'none')
      .attr('font-size', '12')
      .attr('x', () => {
        const x = scaleWidth(Number(value));
        const textLength = `${value}`.length * 7;
        return x + textLength < widthOccupancy ? x + 3 : x - textLength;
      })
      .attr('y', '12');
  }, [isVisualized]);

  return (
    <td hidden={hidden}>
      {isVisualized && columnScale[idx] ? (
        <svg ref={svgRef} css={style.svg(color)}></svg>
      ) : (
        value
      )}
    </td>
  );
};

export default Td;

const style = {
  svg: ({ black }: ThemeColor) =>
    css({
      '&:hover': {
        text: {
          fill: black,
        },
      },
    }),
};