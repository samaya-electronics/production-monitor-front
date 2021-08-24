import React from "react";
const TableBody = (props) => {
  console.log("Table Body");
  const { data, allowEdit, allowDelete, tableDefinition } = props;
  const contentBody = data.length>0 && data.map((item, index) => {
    return (
      <tr key={item.id}>
        {tableDefinition.map((column) => {
          return (
            <td>
              {column.type === "value"
                ? item[column.source]
                : item[column.source.split(".")[0]][
                    column.source.split(".")[1]
                  ]}
            </td>
          );
        })}
        {allowEdit || allowDelete ? (
          <td>
            {allowEdit && (
              <button key={"edit-btn-"+item.id} className="button" onClick={() => allowEdit(item.id)}>
                Edit
              </button>
            )}
            {allowDelete && (
              <button key={"delete-btn-"+item.id} className="button" onClick={() => allowDelete(item.id)}>
                Delete
              </button>
            )}
          </td>
        ) : null}
      </tr>
    );
  });

  return <tbody>{contentBody}</tbody>;
};

export default React.memo(TableBody);
