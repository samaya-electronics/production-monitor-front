import React, { useContext, useEffect } from "react";
import globalContext from "../../context/global-context";
import useInput from "../../hooks/use-input";
import useCRUD from "../../hooks/use-crud";
import TableForm from "../../components/ui/containers/table-form";
const model = "Lines";
const Lines = (props) => {
  console.log(model);
  const globalContextLocal = useContext(globalContext);

  const {
    inputValue: nameInputValue,
    handleInput: handleNameInputChange,
    handleBlur: handleNameInputBlur,
    hasErrors: nameHasErrors,
    setInputValue: setNameInputValue,
  } = useInput((value) => value.trim() !== "");

  const {
    inputValue: codeInputValue,
    handleInput: handleCodeInputChange,
    handleBlur: handleCodeInputBlur,
    hasErrors: codeHasErrors,
    setInputValue: setCodeInputValue,
  } = useInput((value) => value.trim() !== "");

  const {
    inputValue: floorIdInputValue,
    handleInput: handleFloorIdInputChange,
    handleBlur: handleFloorIdInputBlur,
    hasErrors: floorIdHasErrors,
    setInputValue: setFloorIdeInputValue,
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
      headerName: "Name",
      type: "value",
      source: "name",
      column: "name",
      input: {
        config: { type: "input", option: "text", validation: null },
        set: setNameInputValue,
        get: nameInputValue,
        onChange: handleNameInputChange,
        onBlur: handleNameInputBlur,
        hasErrors: nameHasErrors,
      },
    },
    {
      headerName: "Code",
      type: "value",
      source: "code",
      column: "code",
      input: {
        config: { type: "input", option: "text", validation: null },
        set: setCodeInputValue,
        get: codeInputValue,
        onChange: handleCodeInputChange,
        onBlur: handleCodeInputBlur,
        hasErrors: codeHasErrors,
      },
    },
    {
      headerName: "Floor",
      type: "relation",
      source: "Floor.name",
      column: "FloorId",
      input: {
        config: { type: "select", option: "online",url:"http://localhost:8080/floors", validation: null },
        set: setFloorIdeInputValue,
        get: floorIdInputValue,
        onChange: handleFloorIdInputChange,
        onBlur: handleFloorIdInputBlur,
        hasErrors: floorIdHasErrors,
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

export default Lines;
