import openSocket from "socket.io-client";
import { Fragment, useCallback, useEffect, useState } from "react";
import Panel from "../../components/ui/containers/panel";
import LineCard from "./line-card";
import FilterCart from "./filter-card";

import ShowLineStoppages from "../line-controls/show-line-stoppages";

const Monitor = (props) => {
  const [linesData, setLinesData] = useState([]);
  const [timeFrameValue, setTimeFrameValue] = useState("week");
  const [showIdle, setShowIdle] = useState("yes");
  const [showStoppages, setShowStoppages] = useState("yes");
  const [showFailing, setShowFailing] = useState("yes");

  const showIdleOnChangeHandler = (event) => {
    const { value } = event.target;
    setShowIdle(value);
  };

  const showStoppagesOnChangeHandler = (event) => {
    const { value } = event.target;
    setShowStoppages(value);
  };

  const showFailingOnChangeHandler = (event) => {
    const { value } = event.target;
    setShowFailing(value);
  };

  const timeFrameValueOnChangeHandler = (event) => {
    const { value } = event.target;
    setTimeFrameValue(value);
  };

  const fetchData = useCallback(async (url, config, setData) => {
    let response;
    try {
      const response = await fetch(url, config);
      const data = await response.json();
      if (data.error) throw data.error;
      setData(data.data);
      response.data = data.data;
    } catch (error) {
      response.error = error;
    }

    return response;
  }, []);

  const updateLineData = (data) => {
    return data;
  };

  const initialSocket = useCallback(() => {
    console.log("initial socket");
    const socket = openSocket("http://localhost:8080");
    socket.on("monitor", (notification) => {
      console.log("Data Updated ....");
      updateLineData(notification.data);
    });
    return socket;
  }, []);

  const getLines = useCallback(
    () =>
      fetchData(
        "http://localhost:8080/lines",
        {
          headers: { "Content-Type": "application/json" },
          method: "get",
        },
        setLinesData
      ),
    [fetchData]
  );

  useEffect(() => {
    getLines();
    initialSocket();
  }, [getLines, initialSocket]);

  const idleCard = linesData.idle && (
    <Panel
      label={
        linesData.idle.length +
        " Lines Are Idle (" +
        Math.floor(
          (linesData.idle.length /
            (linesData.onSchedule.length + linesData.idle.length)) *
            100
        ) +
        "%)"
      }
      classes="is-grey"
      messageBodyClasses="control-body"
    >
      <div className="columns is-multiline">
        {showIdle==="yes" && linesData.idle.map((item) => (
          <div className="column is-2">
            <h3
              key={item.Line.id}
              title={item.Line.name}
              className="button is-dark is-fullwidth"
              disabled
            >
              {item.Line.code} {item.Line.name}
            </h3>
          </div>
        ))}
      </div>
    </Panel>
  );

  return (
    <Fragment>

      <FilterCart
        timeFrameValue={timeFrameValue}
        showIdle={showIdle}
        showIdleOnChangeHandler={showIdleOnChangeHandler}
        timeFrameValueOnChangeHandler={timeFrameValueOnChangeHandler}
        showFailing={showFailing}
        showFailingOnChangeHandler={showFailingOnChangeHandler}
        showStoppagesOnChangeHandler={showStoppagesOnChangeHandler}
        showStoppages={showStoppages}
      />

      <div style={{ padding: "10px" }}>{idleCard}</div>

      <div className="columns is-multiline">
        {linesData?.onSchedule
          ? linesData.onSchedule.map((item, index) => {
              return (
                <div className="column is-2">
                  <LineCard lineData={item} />
                </div>
              );
            })
          : null}
        ;
      </div>
      
    </Fragment>
  );

};

export default Monitor;
