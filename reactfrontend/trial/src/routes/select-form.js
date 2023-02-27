import React, { useEffect, useState } from "react";
import axios from "axios";
import Element from '../components/Element';
import { FormContext } from '../FormContext';
import convertJSON from '../components/convertJSON'
function SelectForm({ }) {

    const [sourceNames, updateSourceNames] = useState([]);
    const [sourceSelection, setSourceSelection] = useState([]);
    const [sourceSelectionDisplay, setSourceSelectionDisplay] = useState(true);
    const [elements, setElements] = useState({});

    useEffect(() => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        };

        const res = axios.get(`http://127.0.0.1:8000/select-source`, config);
        res.then((a) => {
            updateSourceNames(a.data);
            setSourceSelection(a.data[0]);
        });
    }, []);

    const submitSourceSelection = async (e) => {
        e.preventDefault();
        setSourceSelectionDisplay(false)
        // post request and hide submit button
        const config = {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        };

        const msg = { "source_name": sourceSelection };
        const body = JSON.stringify(msg);
        const res = axios.post(`http://127.0.0.1:8000/select-source/`, body, config);
        res.then((a) => {
            console.log(a.data);
            const formJSON1 = convertJSON(JSON.parse(a.data));
            localStorage.setItem("form_template", JSON.stringify(formJSON1))
            setSourceSelectionDisplay(false)
        })
    }

    useEffect(() => {
        var formJson = JSON.parse(localStorage.getItem("form_template"));
        setElements(formJson);
        console.log(elements)
    }, [sourceSelectionDisplay])

    const handleSourceSelection = (e) => {
        setSourceSelection(e.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        };

        let msg = {}
        elements.fields.forEach((field) => {
            const { field_value, field_id, field_mandatory } = field
            if (field_mandatory) {
                if (field_value === "") {
                    alert(("please dont leave ").concat(field_id).concat(" empty"))
                    return;
                }
            }
            msg[field_id] = field_value
        });
        msg = JSON.stringify(msg)
        var body = { "source_name": sourceSelection, "form_data": msg }
        body = JSON.stringify(body);
        const res = axios.post(`http://127.0.0.1:8000/form/`, body, config);
        res.then((a) => {
            console.log(a.data);
        })
    };

    const handleChange = (id, event) => {
        const newElements = { ...elements };
        newElements.fields.forEach((field) => {
            const { field_type, field_id } = field;
            if (id === field_id) {
                switch (field_type) {
                    case "checkbox":
                        field["field_value"] = event.target.checked;
                        break;

                    case "input":
                        field["field_value"] = event.target.value;
                        break;

                    case "singleSelect":
                        field["field_value"] = event.target.value;
                        break;
                }
            }
            setElements(newElements);
        });
    };

    return (
        <FormContext.Provider value={handleChange}>
            <div className="mx-auto my-auto d-flex flex-column justify-content w-6 container">
                {sourceSelectionDisplay ?
                    <h1 className="d-flex justify-center align-center row">select form page</h1> :
                    <h1 className="d-flex justify-center align-center row">{sourceSelection}</h1>
                }
                {sourceSelectionDisplay ?
                    <form className="flex mx-auto my-auto">
                        <select className="form-control" id="select_source_dropdown" onChange={handleSourceSelection}>
                            {sourceNames.map((source) => (
                                <option value={source} id={source}>{source}</option>
                            ))}
                        </select>
                        <input type="submit" value="Submit" className="mt-2" onClick={submitSourceSelection}></input>
                    </form> :
                    <form>
                        {elements.fields.map((field, i) => <Element key={i} field={field} handle_change={handleChange} />)}
                        <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={(e) => handleSubmit(e)}
                        >
                            Submit
                        </button>
                        <button
                            className="btn btn-danger pt-2 ml-2 pl-2"
                            onClick={(e) => { window.location.reload() }}
                        >
                            Cancel
                        </button>

                    </form>
                }
            </div>
        </FormContext.Provider>
    );
}

export default SelectForm;

