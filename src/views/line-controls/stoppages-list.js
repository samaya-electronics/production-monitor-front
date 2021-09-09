import Panel from "../../components/ui/containers/panel";
const StoppageList = (props) => {
  const { stoppagesList, createLineStoppage, currentStoppagesList } = props;
  console.log(stoppagesList);

  const checkIfCurrentStoppage = (id) => currentStoppagesList.includes(id);
  const getClasses = (id) =>
    checkIfCurrentStoppage(id)
      ? "button is-danger is-disabled is-fullwidth"
      : "button is-warning is-fullwidth";
  const stoppageButtons =
    stoppagesList.length > 0
      ? stoppagesList.map((stoppage, index) => {
          return (
            <div key={"div" + index} className="column is-one-third">
              <button
                title={stoppage.description}
                key={"button" + index}
                className={getClasses(stoppage.id)}
                onClick={() => createLineStoppage(stoppage.id)}
                disabled={checkIfCurrentStoppage(stoppage.id)}
              >
                {stoppage.description}
              </button>
            </div>
          );
        })
      : null;
  return (
    <div className="column is-half">
      <Panel label="Issue A Stoppage" classes="is-warning" messageBodyClasses="control-body">
        <div className="columns is-multiline">{stoppageButtons}</div>
      </Panel>
    </div>
  );
};

export default StoppageList;
