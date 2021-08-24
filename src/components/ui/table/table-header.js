const TableHeader = (props) => {
  console.log("Table Header");
  const { headers, allowEdit, allowDelete } = props;
  const headerContent = headers.map((item, index) => {
    return <th key={index}>{item}</th>;
  });

  const optionHeader =
    allowEdit || allowDelete ? <th key={headers.length}>Options</th> : null;
  return (
    <thead>
      <tr>
        {headerContent}
        {optionHeader}
      </tr>
    </thead>
  );
};

export default TableHeader;
