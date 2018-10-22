import React from "react";
import PropTypes from "prop-types";
import "../css/FormError.scss";

const FormError = ({errorContent}) =>{
    return (
        <div className="form-error">
            <span>{errorContent}</span>
        </div>
    )
}

FormError.propTypes = {
    errorContent: PropTypes.string
};

export default FormError
