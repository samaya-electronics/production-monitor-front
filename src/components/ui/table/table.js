import React from "react";
import TableBody from "./table-body";
import TableHeader from "./table-header";

const Table = (props) => {
  const { tableDefinition,headerDefinition, data } = props;

  return (
    <table className={props.classes}>
      <TableHeader
        allowEdit={props.allowEdit}
        allowDelete={props.allowDelete}
        headers={headerDefinition}
      />
      <TableBody
        tableDefinition={tableDefinition.filter(item=>!item?.noShow)}
        data={data}
        allowEdit={props.allowEdit}
        allowDelete={props.allowDelete}
      />
    </table>
  );
};

export default React.memo(Table);
