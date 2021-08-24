import React, { useContext, useEffect } from "react";
import globalContext from "../../context/global-context";
import useInput from "../../hooks/use-input";
import useCRUD from "../../hooks/use-crud";
import TableForm from "../../components/ui/containers/table-form";
const model = "Users";
const Users = (props) => {
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
    inputValue: floorIdInputValue,
    handleInput: handleFloorIdInputChange,
    handleBlur: handleFloorIdInputBlur,
    hasErrors: floorIdHasErrors,
    setInputValue: setFloorIdeInputValue,
  } = useInput((value) => value !== null);

  const {
    inputValue: emailInputValue,
    handleInput: handleEmailInputChange,
    handleBlur: handleEmailInputBlur,
    hasErrors: emailHasErrors,
    setInputValue: setEmailInputValue,
  } = useInput((value) => value !== null);

  const {
    inputValue: passwordInputValue,
    handleInput: handlePasswordInputChange,
    handleBlur: handlePasswordInputBlur,
    hasErrors: passwordHasErrors,
    setInputValue: setPasswordInputValue,
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
      headerName: "Password",
      type: "value",
      source: "password",
      column: "password",
      noShow:true,
      input: {
        config: {
          type: "input",
          option: "password",
          validation: null,
          noEdit: true,
        },
        set: setPasswordInputValue,
        get: passwordInputValue,
        onChange: handlePasswordInputChange,
        onBlur: handlePasswordInputBlur,
        hasErrors: passwordHasErrors,
      },
    },
    {
      headerName: "Email",
      type: "value",
      source: "email",
      column: "email",
      input: {
        config: { type: "input", option: "text", validation: null },
        set: setEmailInputValue,
        get: emailInputValue,
        onChange: handleEmailInputChange,
        onBlur: handleEmailInputBlur,
        hasErrors: emailHasErrors,
      },
    },
    {
      headerName: "Roles",
      type: "relation",
      source: "Role.name",
      column: "RoleId",
      input: {
        config: {
          type: "select",
          option: "online",
          url: "http://localhost:8080/roles",
          validation: null,
        },
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
    initialSocket,
  } = useCRUD(model, globalContextLocal.authorization.token, modelDefinition);

  useEffect(() => {
    initialFetch();
    initialSocket();
  }, [initialFetch, initialSocket]);

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

export default Users;
