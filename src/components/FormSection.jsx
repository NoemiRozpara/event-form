import React from "react";
import PropTypes from "prop-types";

const FormSection = (props) => {
    return (
        <fieldset name={props.name} className="form-section">
            <legend>{props.name}</legend>
            {props.children}
        </fieldset>
    )
}

FormSection.propTypes = {
    name: PropTypes.string
};

export default FormSection