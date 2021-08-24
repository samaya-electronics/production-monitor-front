import React, { useContext, useEffect } from "react";
import globalContext from "../../context/global-context";
import useInput from "../../hooks/use-input";
import useCRUD from "../../hooks/use-crud";
import TableForm from "../../components/ui/containers/table-form";
const model="Stoppages";
const Stoppages = (props) => {
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
    inputValue: descriptionInputValue,
    handleInput: handleDescriptionInputChange,
    handleBlur: handleDescriptionInputBlur,
    hasErrors: descriptionHasErrors,
    setInputValue: setDescriptionInputValue,
  } = useInput((value) => value.trim() !== "");

  const {
    inputValue: iconInputValue,
    handleInput: handleIconInputChange,
    handleBlur: handleIconInputBlur,
    hasErrors: iconHasErrors,
    setInputValue: setIconInputValue,
  } = useInput((value) => true);

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
      headerName: "Description",
      type: "value",
      source: "description",
      column: "description",
      input: {
        config: { type: "input", option: "text", validation: null },
        set: setDescriptionInputValue,
        get: descriptionInputValue,
        onChange: handleDescriptionInputChange,
        onBlur: handleDescriptionInputBlur,
        hasErrors: descriptionHasErrors,
      },
    },
    {
      headerName: "Icon",
      type: "value",
      source: "icon",
      column: "icon",
      input: {
        config: { type: "input", option: "text", validation: null },
        set: setIconInputValue,
        get: iconInputValue,
        onChange: handleIconInputChange,
        onBlur: handleIconInputBlur,
        hasErrors: iconHasErrors,
      },
    }
    
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

export default Stoppages;
