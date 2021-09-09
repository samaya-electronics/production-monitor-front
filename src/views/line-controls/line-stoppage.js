import Timelapse from "./timelapse";
const LineStoppage = (props) => {
  const { type, item, updateLineStoppage } = props;
  const classes = type === "closed" ? "is-warning" : "is-danger";
  return (
    <tr key={item.id}>
      <td>
        <span className={classes + " tag"}>{item.Stoppage.name}</span>
      </td>
      <td>{item.Stoppage.description}</td>
      <td>{item.status}</td>
      <td>
        <Timelapse
          object={item}
          durationColumn="duration"
          type={type}
          classes={classes}
        />
      </td>
      {type === "open" ? (
        <td>
          <button
            className={"button is-small " + classes}
            onClick={() => updateLineStoppage(item.id)}
          >
            Close
          </button>
        </td>
      ) : null}
    </tr>
  );
};

export default LineStoppage;
