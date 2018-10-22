import React from "react";
import PropTypes from "prop-types";

const FormSection = ({name, children}) => {
    return (
        <fieldset name={name} className="form-section">
            <legend>{name}</legend>
            {children}
        </fieldset>
    )
}

FormSection.propTypes = {
    name: PropTypes.string
};

export default FormSection