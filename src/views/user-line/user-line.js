import React, { useContext, useEffect } from "react";
import globalContext from "../../context/global-context";
import useInput from "../../hooks/use-input";
import useCRUD from "../../hooks/use-crud";
import TableForm from "../../components/ui/containers/table-form";
const model = "User-lines";
const UserLines = (props) => {
  console.log(model);
  const globalContextLocal = useContext(globalContext);

  const {
    inputValue: userInputtValue,
    handleInput: handleUserInputChange,
    handleBlur: handleUserInputBlur,
    hasErrors: userHasErrors,
    setInputValue: setUserInputValue,
  } = useInput((value) => value !== null);

  const {
    inputValue: LineInputValue,
    handleInput: handleLineInputChange,
    handleBlur: handleLineInputBlur,
    hasErrors: lineHasErrors,
    setInputValue: setLineInputValue,
  } = useInput((value) => value !== null);

  const modelDefinition = [
    {
      headerName: "ID",
      type: "value",
      source: "id",
      column: "id",
      input: null,
    },
    {
      headerName: "User",
      type: "relation",
      source: "User.name",
      column: "UserId",
      input: {
        config: { type: "select", option: "online", url:"http://localhost:8080/users", validation: null },
        set: setUserInputValue,
        get: userInputtValue,
        onChange: handleUserInputChange,
        onBlur: handleUserInputBlur,
        hasErrors: userHasErrors,
      },
    },
    {
      headerName: "Line",
      type: "relation",
      source: "Line.name",
      column: "LineId",
      input: {
        config: { type: "select", option: "online", url:"http://localhost:8080/lines", validation: null },
        set: setLineInputValue,
        get: LineInputValue,
        onChange: handleLineInputChange,
        onBlur: handleLineInputBlur,
        hasErrors: lineHasErrors,
      },
    },
  ];

  const {
    modelRaws,
    message,
    initialFetch,
    editRaw,
    deleteRaw,
    editAction,
    cancelEdit,
    deleteAction,
    cancelDelete,
    updateRaw,
    deleteRawConfirm,
    createRaw,
    initialSocket
  } = useCRUD(
    model,
    globalContextLocal.authorization.token,
    modelDefinition
  );

  useEffect(() => {
    initialFetch();
    initialSocket();
  }, [initialFetch,initialSocket]);

  return (
    <TableForm
      modelDefinition={modelDefinition}
      modelRaws={modelRaws}
      editAction={editAction}
      cancelEdit={cancelEdit}
      editRaw={editRaw}
      updateRaw={updateRaw}
      deleteAction={deleteAction}
      deleteRaw={deleteRaw}
      cancelDelete={cancelDelete}
      deleteRawConfirm={deleteRawConfirm}
      createRaw={createRaw}
      message={message}
      model={model}
    />
  );
};

export default UserLines;
