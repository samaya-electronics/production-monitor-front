import { Fragment } from "react";
import Panel from "../../components/ui/containers/panel";
const LineControl = (props) => {
  return (
    <Fragment>
      <div className="cloumns">
        <div className="column">
          <Panel label="Closed Stoppages" classes="is-info"></Panel>
        </div>
        <div className="column">
          <Panel label="Ongoing Stoppages" classes="is-danger"></Panel>
        </div>
        <div className="column">
        <Panel label="Issue A Stoppage" classes="is-warning"></Panel>
        </div>
      </div>
    </Fragment>
  );
};

export default LineControl;
