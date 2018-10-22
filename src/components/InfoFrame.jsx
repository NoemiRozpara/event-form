import React from "react";
import PropTypes from "prop-types";
import "../css/InfoFrame.scss";

const InfoFrame = ({className, title, description}) =>{
    return (
        <div className={"info " + className}>
            <h3 className="title">{title}</h3>
            <p>{description}</p>
        </div>
    )
}

InfoFrame.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    className: PropTypes.string
}

export default InfoFrame;
