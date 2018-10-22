import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import EventForm from "./EventForm";

import translation from '../data/messages-en.json';

import "../css/App.scss";

const EventApp = ({loggedInId}) =>{
    return (
        <div className="container-fluid">
            <Header title={translation.app_name} />
            <EventForm loggedInId={loggedInId}
            />
        </div>
    )
}

EventApp.propTypes = {
    apiUrl: PropTypes.string,
    atendeeId: PropTypes.string,
    loggedInId: PropTypes.number
};

export default EventApp;
