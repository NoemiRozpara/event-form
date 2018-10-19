import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ErrorPopup from './Error'

export default class Coordinator extends Component {

	constructor(context, props){
		super(context, props);
		this.state = {
			value: this.props.currentUserID,
			email: '',
			error: false
		}
		this.setEmail = this.setEmail.bind(this);
		this.updateEmail = this.updateEmail.bind(this);
	}

	componentDidMount(){
		this.setEmail()
	}

	setEmail(event){
		let id = null;
		if(typeof event === "undefined"){
			if(this.props.currentUserID === "undefined"){
				return ''
			}
			else 
				id = this.props.currentUserID
		}
		else{
			id = event.target.value
		}
		let user = this.props.source.find(x => x.id == id);
		this.setState({
			value: id,
			email: user.email || ''
		})
	}

	updateEmail(event){
		this.setState({
			email: event.target.value
		})
	}

	validate(){
		let pattern = /.+@.+\..+/
		let testResult = ! pattern.test(this.state.email)
		this.setState({
			error: testResult
		})
		return testResult
	}

	returnData(){
        return '"coordinator":{"email":"' + this.state.email + 
               '","id": "' + this.state.value + '"}'
    }

    render(){
    	return(
    		<div>
	    		<div className="row">
		    		<select name={this.props.name} onChange={this.setEmail}>
						<optgroup label="Me">
							{ this.props.currentUser ?
		    					<option key={-1} 
		    							value={this.props.currentUserID}> 
		    						{ this.props.currentUser }
		    					</option> :
		    					<option key={-1} 
		    							value={false} 
		    							disabled > 
		    						-
		    					</option>
		    				}
						</optgroup>
						<optgroup label="Others">
		    				{ this.props.source.filter((employee) => {
		    					return employee.id !== this.props.currentUserID
		    				}).map((employee, i) => {
		                        return(
		                            <option key={i} value={employee.id}> 
		                            	{employee.name} {employee.lastname}
		                            </option>
		                        )
		                    })}
		                </optgroup>
		            </select>
		    	</div>
		    	<div className="row">
		    		<input type="text" value={this.state.email} onChange={this.updateEmail} placeholder="Email" />
		    		{ this.state.error && <ErrorPopup errorContent={this.props.errorContent} /> }
		    	</div>
	    	</div>
    	)
    }
}

Coordinator.propTypes = {
	name: PropTypes.string.isRequired,
	source: PropTypes.array.isRequired
}