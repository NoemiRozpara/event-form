import React from "react";
import PropTypes from "prop-types";
import "../css/Error.scss";

const ErrorPopup = ({errorContent}) =>{
    return (
        <div className="error">
            <span>{errorContent}</span>
        </div>
    )
}

ErrorPopup.propTypes = {
    errorContent: PropTypes.string
};

export default ErrorPopup
