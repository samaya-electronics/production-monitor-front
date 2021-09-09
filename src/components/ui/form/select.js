import React, { useEffect, useState } from "react";

const Select = (props) => {
  const { value, type, url, inputBlur, inputChange, name, label } = props;
  const [optionList, setOptions] = useState([]);
  console.log("select", type, url);
  useEffect(() => {
    console.log("select");
    if (type === "online") {
      const getOptions = async () => {
        try {
          const response = await fetch(url, {
            method: "get",
            headers: { "Content-Type": "application/json" },
          });

          if (response.ok) {
            const data = await response.json();
            setOptions(data.data);
            console.log(data);
          } else {
            throw new Error("Can't Fetch Options");
          }
        } catch (error) {
          setOptions([{ value: "", name: "Can't Fetch Options" }]);
        }
      };
      getOptions();
    } else {
      setOptions(url);
    }
  }, [type, url]);

  return (
    <div className="field is-fullwidth">
      <label className="label">{label}</label>
      <div className="select is-fullwidth">
        <select name={name} onChange={inputChange} onBlur={inputBlur}>
          <option key="dummy-option" selected={value === ""}>
            Select {label}
          </option>
          {optionList.length > 0 &&
            optionList.map((item, index) => {
              return (
                <option
                  key={item.id}
                  selected={item.id === value}
                  value={item.id}
                >
                  {props.suffix
                    ? item[props.suffix] + " - " + item.name
                    : item.name}
                </option>
              );
            })}
        </select>
      </div>
    </div>
  );
};

export default Select;
