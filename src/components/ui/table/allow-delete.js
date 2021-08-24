const AllowEdit = (props) => {
  const editButton = props.allowEdit ? (
    <button className="button " onClick={() => props.editAction(props.itemId)}>
      Edit
    </button>
  ) : null;
  return { editButton };
};

export default AllowEdit;
