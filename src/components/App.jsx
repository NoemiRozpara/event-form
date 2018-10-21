import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import EventForm from './EventForm'
import '../css/App.scss'

export default class EventApp extends Component {

    componentDidMount(){
        /*fetch(this.props.apiUrl + '/' + this.props.atendeeId)
       .then((response) => response.json())
       .then((responseJson) => {
            this.setState({ 
                loading: false,
                sessions: responseJson.sessions,
                ratingMap: this.mapVotes(responseJson.votes),
                maxBeers: responseJson.isVotingActive ? responseJson.starsTotal - Object.values(this.mapVotes(responseJson.votes)).sum() : 0,
                isVotingActive: responseJson.isVotingActive,
                maxVoteValue: 3
            })
       })
       .catch((error) => {
            this.setState({
                loading: false,
                errorOccured: true
            })
       });*/
    }

    render() {
        return (
            <div className="container-fluid">
                <Header title="New event" />
                <EventForm apiUrl={this.props.apiUrl}
                           translationFile={this.props.translationFile}
                           loggedInId={3} />
            </div>
        );
    }
}

EventApp.propTypes = {
    apiUrl: PropTypes.string,
    atendeeId: PropTypes.string
}
