import Select from "../../components/ui/form/select";
const LineSelector = (props) => {
  const { value, inputChange } = props;
  return (
    <div style={{ textAling: "center", padding: "20px" }}>
      <Select
        name="LineId"
        type="online"
        url="http://localhost:8080/lines"
        label="Select Line"
        value={value}
        inputChange={inputChange}
        inputBlur={null}
        hasErrors={null}
        suffix="code"
      />
    </div>
  );
};

export default LineSelector;
