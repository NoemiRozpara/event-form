import React, { Component } from 'react'
import PropTypes from 'prop-types'
import categories from './data/categories.json'
import employes from './data/employes.json'

export default class EventForm extends Component {

    constructor(props, context){
        super(props, context);
        this.state = {
            categories: [],
            employes: [],
            errorOccured: false,
            loading: true,
            loggedInId: 3,
            loggedInName: ''
        }
        //this.setRating = this.setRating.bind(this);
    }

    componentDidMount(){
        /*fetch(this.props.apiUrl, {
        	'Content-Type': 'application/json',
        	'Accept': 'application/json'
        })
       .then((response) => {console.log(response.text()); return response.json()})
       .then((responseJson) => {
           /* this.setState({ 
                loading: false,
                categories: responseJson
            })
            console.log(responseJson)
       })
       .catch((error) => {
            this.setState({
                loading: false,
                errorOccured: true
            })
            console.log(error);
       });*/
       let loggedInUser = employes.find(x => x.id === this.state.loggedInId);
    	this.setState({ 
			loading: false,
			categories: categories,
			employes: employes,
			loggedInName: loggedInUser !== undefined ? (loggedInUser.name + ' ' + loggedInUser.lastname) : false
		})
    }

    render() {
        return (
            <div className="container">
            	<form>
            		<fieldset name="About">
            			<legend>About</legend>
            			<label htmlFor="title">Title</label>
            			<input id="title" type="text" placeholder="Make it short and clear" required />
            			<label htmlFor="description">Description</label>
            			<textarea id="description" placeholder="Write about your event, be creative" maxLength="140" required />
            			<label htmlFor="category">Category</label>
            			<select id="category" defaultValue="Please select cat">
            				<option key={-1} value={null}> Select category (skills, interests, locations) </option>
            				{ this.state.categories.map((category, i) => {
	                            return(
	                                <option key={i} value={category.id}> {category.name} </option>
	                            )
	                        })}
	                    </select>
	                    <label htmlFor="payment">Payment</label>
	                    <input type="radio" name="payment" value={0} id="free"/>
	                    <label htmlFor="free">Free event</label>
	                    <input type="radio" name="payment" value={1} id="paid"/>
	                    <label htmlFor="paid">Paid event</label>
	                    <input type="number" name="paymentValue" placeholder="Fee" /><span>$</span>
            			<input type="number" name="rewardPoints" placeholder="Number" />
            			<label htmlFor="rewardPoints">reward points for attendance</label>
            		</fieldset>
            		<fieldset name="Coordinator">
            			<legend>Coordinator</legend>
            			<label htmlFor="responsible">Responsible</label>
            			<select id="responsible" required>
            				<optgroup label="Me">
            					{ this.state.loggedInName ?
	            					<option key={-1} value={this.state.loggedIn}> 
	            						{ this.state.loggedInName }
	            					</option> :
	            					<option key={-1} value={false} disabled > 
	            						-
	            					</option>
	            				}
            				</optgroup>
            				<optgroup label="Others">
	            				{ this.state.employes.filter((employee) => {
	            					return employee.id !== this.state.loggedInId
	            				}).map((employee, i) => {
		                            return(
		                                <option key={i} value={employee.id}> {employee.name} {employee.lastname}</option>
		                            )
		                        })}
	                        </optgroup>
	                    </select>
	                    <label htmlFor="email">E-mail</label>
	                    <input type="email" id="email" />
            		</fieldset>
            		<fieldset name="When">
            			<legend>When</legend>
						<label htmlFor="startDate">Starts on</label>
	                    <input type="date" id="startDate" required/>
						<label htmlFor="startTime">At</label>
	                    <input type="time" id="startTime" required/>
	                    <input type="radio" name="eventTime" value="AM" id="am"/>
	                    <label htmlFor="am">AM</label>
	                    <input type="radio" name="eventTime" value="PM" id="pm"/>
	                    <label htmlFor="pm">PM</label>
            		</fieldset>
            		<input type="submit" value="Publish event" />
            	</form>
            </div>
        );
    }
}

EventForm.propTypes = {
    apiUrl: PropTypes.string
}
