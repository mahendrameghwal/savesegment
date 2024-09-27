/* eslint-disable react/prop-types */
import { FaMinus } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";

const Popup = ({
  availableSchemas,
  handleSubmit,
  handleRemoveSchema,
  handleAddSchema,
  setSegmentName,
  segmentName,
  schemas,
  schemaOptions,
  animatePopup,
  handlePopupClose,
}) => {
  return (
    <div className={`popup ${animatePopup ? "show" : ""}`}>
      <section className="heading">
        <IoIosArrowBack />
        <h2 style={{color:"white"}}>Saving Segment</h2>
      </section>

      <section className="wrapper">
        <input
          type="text"
          value={segmentName}
          onChange={e => setSegmentName(e.target.value)}
          placeholder="Enter segment name"
          className="input-field"
        />

        <div className="selected-schemas">
          {schemas.map(schema => (
            <div key={schema} className="schema-tag">
              <span>
                {schemaOptions.find(opt => opt.value === schema)?.label}
              </span>
              <button
                onClick={() => handleRemoveSchema(schema)}
                className="btn-remove"
              >
                <FaMinus />
              </button>
            </div>
          ))}
        </div>

        <div className="schema-selector">
          <select
            onChange={e => handleAddSchema(e.target.value)}
            value=""
            className="select-field"
          >
            <option value="">Add schema to segment</option>
            {availableSchemas.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <a href="#">+add new schema</a>

        <div className="button-group">
          <button onClick={handleSubmit} className="btn-success">
            Save the Segment
          </button>
          <button onClick={handlePopupClose} className="btn-secondary">
            Cancel
          </button>
        </div>
      </section>
    </div>
  );
};

export default Popup;
