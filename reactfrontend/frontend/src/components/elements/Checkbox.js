import React, { useContext } from "react";
import { FormContext } from "../../FormContext";
const Checkbox = ({ field_id, field_label, field_value, handle_change }) => {
  const { handleChange } = useContext(FormContext);

  return (
    <div className="mb-3 form-check">
      <input
        type="checkbox"
        className="form-check-input"
        id={field_id}
        checked={field_value}
        onChange={(event) => handle_change(field_id, event)}
      />
      <label className="form-check-label" htmlFor="exampleCheck1">
        {field_label}
      </label>
    </div>
  );
};

export default Checkbox;
