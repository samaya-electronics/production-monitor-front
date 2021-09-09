import { useState } from "react";
import LineStoppage from "./line-stoppage";
const ShowLineStoppages = (props) => {
  const { stoppagesList, updateLineStoppage } = props;
  const currentStoppagesList = stoppagesList
    ? stoppagesList.filter((item) => !item.status)
    : [];
  const closedStoppagesList = stoppagesList
    ? stoppagesList.filter((item) => item.status)
    : [];
  const currentStoppages =
    currentStoppagesList.length > 0
      ? currentStoppagesList.map((item, index) => (
          <LineStoppage
            item={item}
            type="open"
            updateLineStoppage={updateLineStoppage}
          />
        ))
      : null;

  const closedStoppagesSummary = closedStoppagesList.reduce(
    (totalClosedStoppages, closedStoppage) => {
      return totalClosedStoppages += closedStoppage.duration;
    },
    0
  );

  const [showClosedStoppages, setShowStoppedStoppages] = useState(false);
  const closedStoppages =
    closedStoppagesList.length > 0
      ? closedStoppagesList.map((item, index) => (
          <LineStoppage item={item} type="closed" />
        ))
      : null;
  return (
    <table className="table is-fullwidth " style={{ background: "none" }}>
      <tbody>
        {currentStoppages}
        <LineStoppage
          item={{
            id: "totalClosed",
            Stoppage: {
              name: "Total Closed",
              description: "Total Closed Stoppages",
            },
            duration:closedStoppagesSummary,
            createdAt:'1',
            updatedAt:'2'
          }}
          type="closed"
        onClick={()=>setShowStoppedStoppages(prev=>!prev)}
        />
        {showClosedStoppages && closedStoppages}
      </tbody>
    </table>
  );
};

export default ShowLineStoppages;
