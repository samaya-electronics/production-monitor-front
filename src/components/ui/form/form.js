import { Fragment } from "react";
import Input from "./input";
import Select from "./select";
const Form = (props) => {


  const {
    formDefinition,
    editAction,
    deleteAction,
    cancelEdit,
    cancelDelete,
    updateRaw,
    deleteRawConfirm,
    createRaw,
  } = props;

  const formInpute = !deleteAction.status
    ? formDefinition.map((item, index) => {
        if (item.input) {
          switch (item.input.config.type) {
            case "input":
              return (
                <Input
                  key={item.column}
                  name={item.column}
                  type={item.input.config.option}
                  label={item.headerName}
                  value={item.input.get}
                  inputChange={item.input.onChange}
                  inputBlur={item.input.onBlur}
                  hasErrors={item.input.hasErrors}
                />
              );
              case "select":
              return (
                <Select
                  key={item.column}
                  name={item.column}
                  type={item.input.config.option}
                  url={item.input.config.url}
                  label={item.headerName}
                  value={item.input.get}
                  inputChange={item.input.onChange}
                  inputBlur={item.input.onBlur}
                  hasErrors={item.input.hasErrors}
                />
              );
            default:
              return null;
          }
        }
      })
    : null;
  const editButtons = editAction.status ? (
    <Fragment>
      <button key="update-btn" className="button" onClick={updateRaw}>
        Update
      </button>
      <button key="cancel-edit-btn" className="button" onClick={cancelEdit}>
        Cancel
      </button>
    </Fragment>
  ) : null;
  const deleteButtons = deleteAction.status ? (
    <Fragment>
      <h3>Deleting ID# {deleteAction.raw.id}</h3>
      <button
        key="confirm-delete-btn"
        className="button"
        onClick={deleteRawConfirm}
      >
        Confirm Delete
      </button>
      <button key="cancel-delete-btn" className="button" onClick={cancelDelete}>
        Cancel
      </button>
    </Fragment>
  ) : null;

  const createBotton =
    !editAction.status && !deleteAction.status ? (
      <button className="button" type="submit" onClick={createRaw}>
        Create
      </button>
    ) : null;

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      {formInpute}
      {createBotton}
      {editButtons}
      {deleteButtons}
    </form>
  );
};

export default Form;
