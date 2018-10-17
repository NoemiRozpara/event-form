import React, { Component } from 'react'
import '../css/InfoPopup.css'

export default class InfoPopup extends Component{

    render(){

    	return( 
			this.props.loading ?
				<div className={"bg-info card text-white mb-3 fixed-top"}>
					<div className="card-body">
						<p className="card-text"> Fetching data, please wait... </p>
					</div>
				</div> :
				( this.props.errorOccured ?
				 	<div className={"bg-danger card text-white mb-3 fixed-top"}>
						<div className="card-body">
							<p className="card-text"> Oops! Error occured, try again later. </p> 
						</div>
					</div> :
					( <div className={"bg-warning card text-white mb-3 fixed-top"}>
						<div className="card-body">
							{ this.props.active ?
								<p className="card-text">You have {this.props.maxBeers} {this.props.maxBeers === 1 ? 'beer' : 'beers'} left!</p> :
								<p className="card-text"> Voting is inactive! </p>
							}
						</div>
					</div>
					)
				)
		)
    }
}