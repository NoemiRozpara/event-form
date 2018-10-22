import React from "react";
import PropTypes from "prop-types";

import "../css/Header.scss";

const Header = ({title}) => {
    return (
        <header className="container-fluid">
            <div className="container">
                <h1 className="page-title"> {title} </h1>
            </div>
        </header>
    )
}

Header.propTypes = {
	title: PropTypes.string
}

export default Header;
