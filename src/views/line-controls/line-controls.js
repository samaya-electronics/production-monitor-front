import { Fragment, useCallback, useEffect, useState } from "react";
import Panel from "../../components/ui/containers/panel";
import StoppageList from "./stoppages-list";
import LineSelector from "./line-selector";
import openSocket from "socket.io-client";
import ShowLineStoppages from "./show-line-stoppages";
import LineCard from "../monitor/line-card";
import './line-controls.css';
const LineControl = (props) => {
  const [stoppagesList, setStoppagesList] = useState([]);
  const [lineSelectorValue, setLineSelector] = useState("");
  const [lineData, setLineData] = useState(false);

  const currentStoppagesList = lineData?.LineStoppages
    ? lineData.LineStoppages.filter((item) => !item.status).map(item=>item.StoppageId)
    : [];

  const initialSocket = useCallback(() => {
    console.log("initial socket");
    const socket = openSocket("http://localhost:8080");
    socket.on("line-controls/" + lineSelectorValue, (notification) => {
      console.log("Data Updated ....");
      updateLineData(notification.data);
    });
    return socket;
  }, [lineSelectorValue]);

  const fetchData = async (url, config, setData) => {
    try {
      const response = await fetch(url, config);
      const data = await response.json();
      setData(data.data);
    } catch (error) {
    }
  };

  const getStoppagesList = useCallback(
    () =>
      fetchData(
        "http://localhost:8080/stoppages",
        {
          method: "get",
          headers: { "Content-Type": "application/json" },
        },
        setStoppagesList
      ),
    []
  );
  const updateLineData = (data) => {
    setLineData(data);
  };

  const fetchLineData = (LineId) => {
    fetchData(
      "http://localhost:8080/lines/" + LineId,
      {
        method: "get",
        headers: { "Content-Type": "application/json" },
      },
      updateLineData
    );
  };

  const handleLineSelectorChange = (event) => {
    const { value } = event.target;
    setLineSelector(value);
    fetchLineData(value);
  };

  const createLineStoppage = (StoppageId) => {
    const LineId = lineSelectorValue;
    const stoppageData = JSON.stringify({ StoppageId, LineId });
    fetchData(
      "http://localhost:8080/line-stoppages",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: stoppageData,
      },
      (data) => console.log(data)
    );
  };

  const updateLineStoppage = (lineStoppageId) => {
    fetchData(
      "http://localhost:8080/line-stoppages/" + lineStoppageId,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ closeStoppage: true }),
      },
      (data) => console.log(data)
    );
  };
  useEffect(() => {
    getStoppagesList();
    initialSocket();
  }, [getStoppagesList, initialSocket]);

  const lineDashboard = lineSelectorValue ? (
    <div className="columns is-multiline">
      
      <StoppageList
        currentStoppagesList={currentStoppagesList}
        stoppagesList={stoppagesList}
        createLineStoppage={createLineStoppage}
      />
      <div className="column is-half">
        <Panel label="Stoppages" classes="is-danger" messageBodyClasses="control-body">
          {
            <ShowLineStoppages
              updateLineStoppage={updateLineStoppage}
              stoppagesList={lineData?.LineStoppages}
            />
          }
        </Panel>
      </div>
      <div className="column is-one-third">
      {lineData && <LineCard lineData={lineData} />}
      {console.log(lineData)}
      </div>
      <div className="column is-one-third">
        <Panel label="Production Planning" classes="is-dark" messageBodyClasses="control-body">
          {
            
          }
        </Panel>
      </div>
    </div>
  ) : null;
  return (
    <Fragment>
      <LineSelector
        value={lineSelectorValue}
        inputChange={handleLineSelectorChange}
      />
      {lineDashboard}
    </Fragment>
  );
};

export default LineControl;
