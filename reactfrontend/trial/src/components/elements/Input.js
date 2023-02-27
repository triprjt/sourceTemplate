import React, { useContext, useState } from "react";
import { FormContext } from "../../FormContext";

const Input = ({
  field_id,
  field_label,
  field_placeholder,
  field_mandatory,
  field_value,
  field_regex,
  field_regexmessage,
  handle_change
}) => {
  const re = new RegExp("^[a-z0-9]+$");
  const [regexState, setRegexState] = useState(false)
  const splHandle = e => {
    handle_change(field_id, e)
    if (e.target.value.length !== 0) {
      if (re.test(e.target.value)) {
        setRegexState(false)
      }
      else {
        setRegexState(true)
      }
    }
    else {
      setRegexState(false)
    }
  }
  return (
    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">
        {field_label}
      </label>
      <input
        type="text"
        className="form-control"
        id={field_id}
        placeholder={field_placeholder ? field_placeholder : ""}
        value={field_value}
        required={field_mandatory}
        onChange={(event) => splHandle(event)}
      />

      {regexState ?
        <span className="display-7 text-center text-danger p-4">
          {field_regexmessage}
        </span> :
        <div></div>}

    </div>
  );
};

export default Input;
