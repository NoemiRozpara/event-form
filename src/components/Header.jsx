import React, { Component } from "react";
import "../css/Header.scss";

export default class Header extends Component {
    render() {
        return (
            <header className="container-fluid">
                <div className="container">
                    <h1 className="page-title"> {this.props.title} </h1>
                </div>
            </header>
        );
    }
}
