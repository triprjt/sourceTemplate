import React, { useContext } from "react";
import { FormContext } from "../../FormContext";
const Select = ({
  field_id,
  field_label,
  field_placeholder,
  field_value,
  field_options,
  handle_change
}) => {

  return (
    <>
      <label className="form-label">{field_label}</label>
      <select
        className="form-select mb-5"
        aria-label="Default select example"
        onChange={(event) => handle_change(field_id, event)}
      >
        <option value=''>Open this select menu</option>
        {field_options.length > 0 &&
          field_options.map((option, i) => (
            <option value={option.option_label} key={i}>
              {option.option_label}
            </option>
          ))}
      </select>
    </>
  );
};

export default Select;
