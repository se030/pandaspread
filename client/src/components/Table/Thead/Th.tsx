import { ColumnContext } from '@/contexts/ColumnContext';
import { useSafeContext } from '@/hooks/useSafeContext';

interface Props {
  title: string;
  description: Description | undefined;
  hidden: boolean;
}

const Th = ({ hidden, title, description }: Props) => {
  const { columnRefs } = useSafeContext(ColumnContext);

  return (
    <th hidden={hidden} ref={(ref) => ref && columnRefs.current.push(ref)}>
      {title}
      {description && getDescriptionElements(description)}
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
