import React, { useEffect, useState } from "react";
import axios from "axios";
import Element from "../components/Element";
import { FormContext } from "../FormContext";
import convertJSON from "../components/convertJSON";
function SelectForm({}) {
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
    setSourceSelectionDisplay(false);
    // post request and hide submit button
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    const msg = { source_name: sourceSelection };
    const body = JSON.stringify(msg);
    const res = axios.post(
      `http://127.0.0.1:8000/select-source/`,
      body,
      config
    );
    res.then((a) => {
      console.log(a.data);
      const formJSON1 = convertJSON(JSON.parse(a.data));
      setSourceSelectionDisplay(false);
      localStorage.setItem("form_template", JSON.stringify(formJSON1));
    });
  };

  useEffect(() => {
    var formJson = JSON.parse(localStorage.getItem("form_template"));
    setElements(formJson);
    console.log(elements);
  }, [sourceSelectionDisplay]);

  const handleSourceSelection = (e) => {
    setSourceSelection(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    let msg = {};
    elements.fields.forEach((field) => {
      const { field_value, field_id, field_mandatory } = field;
      if (field_mandatory) {
        if (field_value === "") {
          alert("please dont leave ".concat(field_id).concat(" empty"));
          return;
        }
      }
      msg[field_id] = field_value;
    });
    msg = JSON.stringify(msg);
    var body = { source_name: sourceSelection, form_data: msg };
    body = JSON.stringify(body);
    const res = axios.post(`http://127.0.0.1:8000/form/`, body, config);
    res.then((a) => {
      console.log(a.data);
    });
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
      <div className="d-grid gap-6 min-vh-100 w-50 mx-auto align-content-center justify-content-center">
        <div className="row gy-3">
          {sourceSelectionDisplay ? (
            <h3>Select source to fill form</h3>
          ) : (
            <h3 className="mx-auto">{sourceSelection}</h3>
          )}
        </div>
        <div className="">
          {sourceSelectionDisplay ? (
            <form className="w-75 mx-auto">
              <div className="row gy-3 justify-content-center">
                <select
                  className="form-control"
                  id="select_source_dropdown"
                  onChange={handleSourceSelection}
                >
                  {sourceNames.map((source) => (
                    <option value={source} id={source}>
                      {source}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  value="Submit12"
                  className="col-6 align-content-center"
                  onClick={submitSourceSelection}
                >
                  Submit
                </button>
              </div>
            </form>
          ) : (
            <div className="justify-content-center">
              <form>
                {elements.fields.map((field, i) => (
                  <Element key={i} field={field} handle_change={handleChange} />
                ))}
                <div className="container ">
                  <div className="row gx-2 gap-2">
                    <button
                      type="submit"
                      className="btn col btn-primary w-50"
                      onClick={(e) => handleSubmit(e)}
                    >
                      Submit
                    </button>
                    <button
                      className="btn col btn-danger w-25"
                      onClick={(e) => {
                        window.location.reload();
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </FormContext.Provider>
  );
}

export default SelectForm;
