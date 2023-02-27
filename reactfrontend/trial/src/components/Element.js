import React from "react";
import Checkbox from "./elements/Checkbox";
import Input from "./elements/Input";
import Select from "./elements/Select";
const Element = ({
  field: {
    field_type,
    field_id,
    field_label,
    field_mandatory,
    field_placeholder,
    field_value,
    field_options,
    field_regex,
    field_regexmessage,
  }, handle_change
}) => {
  switch (field_type) {
    case "input":
      console.log("In Element.js" + field_regex);
      return (
        <Input
          field_id={field_id}
          field_label={field_label}
          field_mandatory={field_mandatory}
          field_placeholder={field_placeholder}
          field_value={field_value}
          field_regex={field_regex}
          field_regexmessage={field_regexmessage}
          handle_change={handle_change}
        />
      );

    case "singleSelect":
      return (
        <Select
          field_id={field_id}
          field_label={field_label}
          field_placeholder={field_placeholder}
          field_value={field_value}
          field_options={field_options}
          handle_change={handle_change}
        />
      );
    case "checkbox":
      return (
        <Checkbox
          field_id={field_id}
          field_label={field_label}
          field_value={field_value}
          handle_change={handle_change}
        />
      );

    default:
      return null;
  }
};

export default Element;
