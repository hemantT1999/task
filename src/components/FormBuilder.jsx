import React, { useState, useEffect } from "react";
import "../styles/styles.css";

const FormBuilder = () => {
  const [fields, setFields] = useState([]);
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    const savedFields = localStorage.getItem("formFields");
    if (savedFields) {
      setFields(JSON.parse(savedFields));
    }
  }, []);

  const addField = (type) => {
    setFields([
      ...fields,
      {
        id: Date.now(),
        type,
        label: "",
        options: type === "dropdown" ? ["Option 1", "Option 2"] : [],
      },
    ]);
  };

  const updateField = (id, updates) => {
    setFields(
      fields.map((field) => (field.id === id ? { ...field, ...updates } : field))
    );
  };

  const saveToLocalStorage = () => {
    localStorage.setItem("formFields", JSON.stringify(fields));
  };

  return (
    <div className="card">
      <h2>Dynamic Form Builder</h2>

      {!preview && (
        <div>
          <div>
            <button className="button" onClick={() => addField("text")}>
              Add Text Input
            </button>
            <button className="button secondary" onClick={() => addField("checkbox")}>
              Add Checkbox
            </button>
            <button className="button success" onClick={() => addField("dropdown")}>
              Add Dropdown
            </button>
          </div>

          {fields.map((field) => (
            <div key={field.id} className="field-container">
              <input
                type="text"
                className="input"
                placeholder="Field Label"
                value={field.label}
                onChange={(e) => updateField(field.id, { label: e.target.value })}
              />

              {field.type === "dropdown" && (
                <div>
                  {field.options.map((option, index) => (
                    <input
                      key={index}
                      type="text"
                      className="input"
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...field.options];
                        newOptions[index] = e.target.value;
                        updateField(field.id, { options: newOptions });
                      }}
                    />
                  ))}
                  <button
                    className="button"
                    onClick={() =>
                      updateField(field.id, {
                        options: [...field.options, `Option ${field.options.length + 1}`],
                      })
                    }
                  >
                    Add Option
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {preview && (
        <div>
          {fields.map((field) => (
            <div key={field.id} className="field-container">
              <label>{field.label}</label>
              {field.type === "text" && <input type="text" className="input" />}
              {field.type === "checkbox" && <input type="checkbox" />}
              {field.type === "dropdown" && (
                <select className="input">
                  {field.options.map((option, index) => (
                    <option key={index}>{option}</option>
                  ))}
                </select>
              )}
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: "20px" }}>
        <button className="button" onClick={() => setPreview(!preview)}>
          {preview ? "Edit" : "Preview"}
        </button>
        <button className="button success" onClick={saveToLocalStorage}>
          Save Form
        </button>
      </div>
    </div>
  );
};

export default FormBuilder;
