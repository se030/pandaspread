interface Props {
  dataframe: Dataframe;
}

const Table = ({ dataframe }: Props) => {
  const { columns, data } = dataframe;

  return (
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            {row.map((value) => (
              <td key={`${idx}-${value}`}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
