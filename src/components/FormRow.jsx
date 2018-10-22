import React from "react";
import PropTypes from "prop-types";

const uniqueKey = Math.random().toString(10);

const FormRow = (props) => {
    return (
        <div className="row form-row">
            <span id={"groupTitle" + uniqueKey} className="form-row-label">
                {props.name}{" "}
                {props.isRequired && <em aria-label="required">*</em>}
            </span>
            <div
                role="group"
                aria-labelledby={"groupTitle" + uniqueKey}
                className="form-row-group"
            >
                {props.children}
            </div>
        </div>
    )
}

FormRow.propTypes = {
    name: PropTypes.string,
    isRequired: PropTypes.bool
}

export default FormRow;
