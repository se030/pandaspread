import * as d3 from 'd3';
import { useLayoutEffect, useRef } from 'react';

import { ColumnContext } from '@/contexts/ColumnContext';
import { useColumnView } from '@/hooks/store/useColumnView';
import { useSafeContext } from '@/hooks/utils/useSafeContext';
import { theme } from '@/styles/theme';

interface Props {
  title: string;
  description: Description | undefined;
  hidden: boolean;
  idx: number;
}

const Th = ({ hidden, title, description, idx }: Props) => {
  const { columnRefs } = useSafeContext(ColumnContext);

  const svgRef = useRef<SVGSVGElement>(null);
  const { columnView } = useColumnView();

  useLayoutEffect(() => {
    if (!svgRef.current) return;

    if (
      !description ||
      description.type === 'categorical' ||
      description.data.length === 0 ||
      (columnView && !columnView[idx])
    ) {
      d3.select(svgRef.current).attr('width', 0).attr('height', 0);
      return;
    }

    d3.select(svgRef.current).selectChild().remove();

    const svg = d3
      .select(svgRef.current)
      .attr('width', '100%')
      .attr('height', 80)
      .attr('transform', 'translate(0, 10)')
      .append('g');

    const widthOccupancy = svgRef.current.getBoundingClientRect().width;
    const heightOccupancy = 80;

    const { data } = description;

    const barWidth = widthOccupancy / data.length;
    const xScale = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([0, widthOccupancy]);

    const yScale = d3
      .scaleLinear()
      .domain([0, description.max])
      .range([0, heightOccupancy]);

    svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('width', barWidth)
      .attr('x', (_, i) => xScale(i))
      .attr('height', (d) => yScale(d))
      .attr('y', (d) => heightOccupancy - yScale(d))
      .attr('fill', theme.color.primary);
  }, [description, columnView?.[idx]]);

  return (
    <th hidden={hidden} ref={(ref) => ref && columnRefs.current.push(ref)}>
      {title}
      {description && getDescriptionElements(description)}
      <svg ref={svgRef}></svg>
    </th>
  );
};

export default Th;

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
