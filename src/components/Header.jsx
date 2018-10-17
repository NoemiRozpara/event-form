import React, { Component } from 'react'
import '../css/Header.css'

export default class Header extends Component {

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
            <header className="container-fluid">
                <div className="container">
                    <h1> New event </h1>
                </div>
            </header>
        );
    }
}