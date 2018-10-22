import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import EventForm from './EventForm'
import '../css/App.scss'

export default class EventApp extends Component {

    render() {
        return (
            <div className="container-fluid">
                <Header title="New event" />
                <EventForm apiUrl={this.props.apiUrl}
                           translationFile={this.props.translationFile}
                           loggedInId={this.props.loggedInId} />
            </div>
        );
    }
}

EventApp.propTypes = {
    apiUrl: PropTypes.string,
    atendeeId: PropTypes.string
}
