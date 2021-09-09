import Panel from "../../components/ui/containers/panel";
import ShowLineStoppages from "../line-controls/show-line-stoppages";
import {
  faTruckLoading,
  faClock,
  faCubes,
  faPallet,
  faUsers,
  faUserCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./line-card.css";
const LineCard = (props) => {
  let productionTarget = 1500;
  let requiredLabor = 32;
  let attendedLabor = 29;
  let overtimeLabor = 3;
  const { lineData } = props;
  const currentStoppages =
    lineData?.LineStoppages?.length > 0
      ? lineData.LineStoppages.filter((item) => !item.status)
      : [];

  const stoppagesList =
    currentStoppages.length > 0
      ? currentStoppages.reduce((string, item) => {
          return (string += " " + item.Stoppage.name);
        }, "")
      : "";

  const producedItems =
    lineData?.Items?.length > 0
      ? lineData.Items.filter((item) => item.Transactions.length > 0)
      : [];

  let testedItems =
    lineData?.LineSerials?.length > 0 ? lineData?.LineSerials.length : 0;

  const transactionsArray = producedItems.map((item, index) => {
    return item.Transactions;
  });

  // console.log(transactionsArray.flat());
  const totalProduced = transactionsArray.flat().reduce((acc, transaction) => {
    return (acc += transaction.quantity);
  }, 0);

  if (totalProduced > 0) {
    testedItems =  Math.floor(totalProduced* Math.random()*1.5);
    productionTarget =
      Math.floor(Math.random() * totalProduced) + totalProduced;
    requiredLabor = Math.floor(Math.random() * 33);
    attendedLabor = Math.floor(Math.random() * requiredLabor);
    overtimeLabor = Math.floor(Math.random() * requiredLabor * 0.25);
  } else {
    testedItems = 0;
    productionTarget = 0;
    requiredLabor = 0;
    attendedLabor = 0;
    overtimeLabor = 0;
  }
  const randomClass =['is-success','is-warning'];
  const classes =
    currentStoppages.length > 0
      ? "is-danger"
      : totalProduced > 0
      ? randomClass[Math.round(Math.random())]
      : "is-gray";
  return (
    <Panel
      label={lineData.Line.code + " " + lineData.Line.name}
      classes={classes}
      messageBodyClasses="control-body"
    >
      <div className="columns is-multiline">
        <div className="column line-card-no-scroll">
          <table className="table is-fullwidth" style={{ background: "none" }}>
            <thead>
              <tr>
                <th colSpan="3" style={{ textAlign: "center" }}>
                  Production
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <FontAwesomeIcon icon={faPallet} size="1x" />
                </td>
                <td>Target</td>
                <td>{productionTarget}</td>
              </tr>
              <tr
                className={
                  totalProduced > testedItems
                    ? "has-background-danger-light has-text-danger"
                    : null
                }
              >
                <td>
                  <FontAwesomeIcon icon={faCubes} size="1x" />
                </td>
                <td>Produced</td>
                <td>{testedItems}</td>
              </tr>
              <tr
                className={
                  testedItems > totalProduced
                    ? "has-background-danger-light has-text-danger"
                    : null
                }
              >
                <td>
                  <FontAwesomeIcon icon={faTruckLoading} size="1x" />
                </td>
                <td>Posted</td>
                <td>{totalProduced}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="column">
          <table className="table is-fullwidth" style={{ background: "none" }}>
            <thead>
              <tr>
                <th colSpan="3" style={{ textAlign: "center" }}>
                  Labor
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <FontAwesomeIcon icon={faUsers} size="1x" />
                </td>
                <td>Required</td>
                <td>{requiredLabor}</td>
              </tr>
              <tr
                className={
                  requiredLabor > attendedLabor
                    ? "has-background-danger-light has-text-danger"
                    : null
                }
              >
                <td>
                  <FontAwesomeIcon icon={faUserCheck} size="1x" />
                </td>
                <td>Attended</td>
                <td>{attendedLabor}</td>
              </tr>
              <tr
                className={
                  requiredLabor - attendedLabor > overtimeLabor
                    ? "has-background-danger-light has-text-danger"
                    : null
                }
              >
                <td>
                  <FontAwesomeIcon icon={faClock} size="1x" />
                </td>
                <td>Overtime</td>
                <td>{overtimeLabor}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Panel>
  );
};

export default LineCard;
