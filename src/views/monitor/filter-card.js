import { Fragment } from "react";
import Panel from "../../components/ui/containers/panel";
import Select from "../../components/ui/form/select";
import Input from "../../components/ui/form/input";

const FilterCart = (props) => {
  const {
    timeFrameValue,
    timeFrameOnChangeHandler,
    showIdle,
    showIdleOnChangeHandler,
    showFailing,
    showFailingOnChangeHandler,
    showStoppages,
    showStoppagesOnChangeHandler
  } = props;
  const timeFrameArray = [
    { id: "week", name: "Week" },
    { id: "day", name: "Day" },
    { id: "shift", name: "Shift" },
  ];
  return (
    <Fragment>
      <div style={{ padding: "10px" }}>
        <Panel classes="is-link">
          <div className="columns">
            <div className="column">
              <Select
                value={timeFrameValue}
                type={"ofline"}
                url={timeFrameArray}
                inputBlur=""
                inputChange={timeFrameOnChangeHandler}
                name="timeWindow"
                label="Time Window"
              />
            </div>
            <div className="column">
              <Select
                value={showIdle}
                type={"ofline"}
                url={[
                  { id: "yes", name: "Yes" },
                  { id: "no", name: "No" },
                ]}
                inputBlur=""
                inputChange={showIdleOnChangeHandler}
                name="showIdle"
                label="Show Idle Lines"
              />
            </div>
            <div className="column">
              <Select
                value={showStoppages}
                type={"ofline"}
                url={[
                  { id: "yes", name: "Yes" },
                  { id: "no", name: "No" },
                ]}
                inputBlur=""
                inputChange={showStoppagesOnChangeHandler}
                name="showStoppages"
                label="Show Stopped Lines"
              />
            </div>
            <div className="column">
              <Select
                value={showFailing}
                type={"ofline"}
                url={[
                  { id: "yes", name: "Yes" },
                  { id: "no", name: "No" },
                ]}
                inputBlur=""
                inputChange={showFailingOnChangeHandler}
                name="showFailing"
                label="Show Failing Lines"
              />
            </div>
            <div className="column">
              <Select
                value={showFailing}
                type={"ofline"}
                url={[
                  { id: "yes", name: "Yes" },
                  { id: "no", name: "No" },
                ]}
                inputBlur=""
                inputChange={showFailingOnChangeHandler}
                name="showWorking"
                label="Show Working Lines"
              />
            </div>
          </div>
        </Panel>
      </div>
    </Fragment>
  );
};

export default FilterCart;
