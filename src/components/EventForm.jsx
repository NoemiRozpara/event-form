import React, { Component } from 'react'
import PropTypes from 'prop-types'
import categories from '../data/categories.json'
import employes from '../data/employes.json'
import '../css/EventForm.css'

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
            		<fieldset name="About" className="form-section">
            			<legend>About</legend>
            			<div className="form-row">
	            			<input id="title" 
	            				   type="text" 
	            				   placeholder="Make it short and clear" 
	            				   required />
	            			<label htmlFor="title" 
	            				   className="row-label">Title</label>
            			</div>
            			<div className="form-row">
            				<div className="flex-item">
            					<div className="row">
			            			<textarea id="description" 
			            					  placeholder="Write about your event, be creative" 
			            					  maxLength="140" 
			            					  rows="10"
			            					  aria-describedby="maxLength"
			            					  required />
			            		</div>
            					<div className="row">
			            			<span className="info" id="maxLength">Max length 140 characters</span>
			            			<span className="info" id="charCounter">0/140</span>
		            			</div>
	            			</div>
	            			<label htmlFor="description" 
	            				   className="row-label">Description</label>
	            		</div>
            			<div className="form-row">
	            			<select id="category" defaultValue="Please select cat">
	            				<option key={-1} value={null}> Select category (skills, interests, locations) </option>
	            				
	            					   { this.state.categories.map((category, i) => {
		                            return(
		                                <option key={i} value={category.id}> {category.name} </option>
		                            )
		                        })}
		                    </select>
	            			<label htmlFor="category" className="row-label">Category</label>
		                </div>
	                    <div className="form-row">
	                    	<fieldset name="payment" className="form-section-inline">
	                    		<div className="field-set-inline has-legend">
				                    <input type="radio" 
				                    		name="payment" 
				                    		value={0} 
				                    		id="free"/>
				                    <label htmlFor="free">Free event</label>
				                    <input type="radio" 
				                    		name="payment" 
				                    		value={1} 
				                    		id="paid"/>
				                    <label htmlFor="paid">Paid event</label>
				                    <input type="number" 
				                    	   name="paymentValue" 
				                    	   placeholder="Fee" />
				                    <label htmlFor="paymentValue" aria-label="fee in dollars">$</label>
				                </div>
	                    		<legend>Payment</legend>
		                    </fieldset>
	            		</div>
            			<div className="form-row">
		            		<input type="number" 
		            			   name="rewardPoints" 
		            			   placeholder="Number" 
		            			   aria-describedby="rewardPointsDescription" />
	            			<label htmlFor="rewardPoints" className="row-label">Reward</label>
	            			<span id="rewardPointsDescription" className="info">reward points for attendance</span>
	            		</div>
            		</fieldset>
            		<fieldset name="Coordinator" className="form-section">
            			<legend>Coordinator</legend>
            			<div className="form-row">
	            			<select id="responsible" required>
	            				<optgroup label="Me">
	            					{ this.state.loggedInName ?
		            					<option key={-1} 
		            							value={this.state.loggedIn}> 
		            						{ this.state.loggedInName }
		            					</option> :
		            					<option key={-1} 
		            							value={false} 
		            							disabled > 
		            						-
		            					</option>
		            				}
	            				</optgroup>
	            				<optgroup label="Others">
		            				{ this.state.employes.filter((employee) => {
		            					return employee.id !== this.state.loggedInId
		            				}).map((employee, i) => {
			                            return(
			                                <option key={i} value={employee.id}> 
			                                	{employee.name} {employee.lastname}
			                                </option>
			                            )
			                        })}
		                        </optgroup>
		                    </select>
	            			<label htmlFor="responsible" className="row-label">Responsible</label>
	                    </div>
            			<div className="form-row">
		                    <input type="email" 
		                    	   id="email"
		                    	   placeholder="Email" />
		                    <label htmlFor="email" className="row-label">E-mail</label>
	                    </div>
            		</fieldset>
            		<fieldset name="When" className="form-section">
            			<legend>When</legend>
            			<div className="form-row">
	            			<fieldset name="startDate" className="form-section-inline">
		                    	<div className="field-set-inline">
				                    <input type="date" 
				                    	   id="startDate" 
				                    	   pattern="[0-9]{2}/[0-9]{2}/[0-9]{4}"
				                    	   required/>
				                    <label htmlFor="startDate" className="row-label" aria-label="start date">Starts on</label>
									<label htmlFor="startTime" aria-label="start hour">at</label>
				                    <input type="time" 
				                    	   id="startTime"
				                    	   required/>   
				                    <input type="radio" 
				                    	   name="eventTime" 
				                    	   value="AM" 
				                    	   id="am"/>
				                    <label htmlFor="am">AM</label>
				                    <input type="radio" 
				                    	   name="eventTime" 
				                    	   value="PM" 
				                    	   id="pm"/>
				                    <label htmlFor="pm">PM</label>
				                </div>
				            </fieldset>
	                    </div>
            			<div className="form-row">
		                    <input type="number" 
		                    	   id="duration" 
		                    	   placeholder="Number"/>
							<label htmlFor="duration" className="row-label">Duration</label>
		                    <span className="info">hour</span>
		                </div>
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
