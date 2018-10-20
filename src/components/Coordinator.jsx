import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ErrorPopup from './Error'
import FormRow from './FormRow'

export default class Coordinator extends Component {

    constructor(context, props) {
        super(context, props);
        this.state = {
            value: this.props.currentUserID,
            email: '',
            error: false,
            currentLabel: '',
            valueToSetLabel: -9
        }
        this.validatedControl = React.createRef();
        this.setEmail = this.setEmail.bind(this);
        this.updateEmail = this.updateEmail.bind(this);
        this.selectElement = React.createRef();
    }

    componentDidMount() {
        this.setEmail()
    }

    setEmail(event) {
        let id = null;
        let optgroupName = null;
        if (typeof event === "undefined") {
            if (this.props.currentUserID === "undefined") {
                return ''
            } else {
                id = this.props.currentUserID;
                optgroupName = 'Me'
            }
        } else {
            id = event.target.value;
            optgroupName = event.target.getElementsByTagName('option')[event.target.selectedIndex].parentNode.label
        }
        let user = this.props.source.find(x => x.id == id);
        this.selectElement.current.value = -1;
        this.setState({
            value: id,
            email: user.email || '',
            currentLabel: optgroupName + ' - ' + user.name + ' ' + user.lastname
        })
    }

    updateEmail(event) {
        this.setState({
            email: event.target.value
        })
    }

    validate() {
        let pattern = /.+@.+\..+/
        let testResult = ( ! pattern.test(this.state.email) && this.state.email !== '')
        if(testResult === true){
            this.validatedControl.current.focus();
            this.validatedControl.current.scrollIntoView();
        }
        this.setState({
            error: testResult
        })
        return testResult
    }

    returnData() {
        return '"coordinator":{"email":"' + this.state.email +
            '","id": "' + this.state.value + '"}'
    }

    render() {
        return (
            <div>
	    			<FormRow name="Responsible" isRequired={true}>
                        <div className="item-wrapper-80">
    			    		<select name={this.props.name} 
    			    				onChange={this.setEmail} 
    			    				ref={this.selectElement} 
    			    				value={this.state.valueToSetLabel}>
    			    			<option hidden value={-1}>
    			    				{this.state.currentLabel}
    			    			</option>
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
			        </FormRow>
			        <FormRow name="Email">
                        <div className="item-wrapper-80">
		    			<input type="text" 
                               value={this.state.email} 
                               onChange={this.updateEmail} 
                               placeholder="Email"
                               ref={this.validatedControl} />
                        </div>
		    			{ this.state.error && <ErrorPopup errorContent={this.props.errorContent} /> }
		    		</FormRow>
	    	</div>
        )
    }
}

Coordinator.propTypes = {
    name: PropTypes.string.isRequired,
    source: PropTypes.array.isRequired
}