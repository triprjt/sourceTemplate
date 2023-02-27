function convertJSON(json) {
    const fieldsArray = [];
    for (const fieldName in json.fields) {
        const field = json.fields[fieldName];

        if (field.type === "input") {
            const jsonField = {
                field_type: field.type,
                field_id: fieldName,
                field_label: field.label,
                field_mandatory: field.required ? true : false,
                field_placeholder: field.placeholder,
                field_value: "",
                field_regexmessage: field.regexmessage,
                field_regex: field.regex,
            };

            fieldsArray.push(jsonField);
        } else if (field.type === "checkbox") {
            const jsonField = {
                field_type: field.type,
                field_id: fieldName,
                field_label: field.label,
                field_mandatory: field.required ? true : false,
                field_placeholder: field.placeholder,
                field_value: "",
            };

            fieldsArray.push(jsonField);
        } else if (field.type === "singleSelect") {
            const jsonField = {
                field_id: fieldName,
                field_label: field.label,
                field_mandatory: field.required ? true : false,
                field_options: field.options.map((option) => {
                    return { option_label: option.label };
                }),
                field_type: field.type,
                field_value: "",
            };

            fieldsArray.push(jsonField);
        }
    }

    return { fields: fieldsArray, page_label: "page_label" };
}

export default convertJSON;