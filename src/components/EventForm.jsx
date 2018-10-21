import React, { Component } from 'react'
import PropTypes from 'prop-types'
import categories from '../data/categories.json'
import employees from '../data/employes.json'
import '../css/EventForm.css'
import FormSection from './FormSection'
import FormRow from './FormRow'
import FormControl from './FormControl'
import TextArea from './TextArea'
import PaymentSection from './PaymentSection'
import StartTime from './StartTime'
import Coordinator from './Coordinator'
import Category from './Category'
import Duration from './Duration'
import InfoFrame from './InfoFrame'

export default class EventForm extends Component {

    constructor(props, context){
        super(props, context);
        this.state = {
            categories: [],
            employees: [],
            errorOccured: false,
            loading: true,
            loggedInId: 3,
            loggedInName: ''
        }

        this.allRefs = {
        	title: React.createRef(),
        	rewardPoints: React.createRef()
        }

        this.allRefs = [];
        this.createRef = this.createRef.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.submitForm = this.submitForm.bind(this);
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
       let loggedInUser = employees.find(x => x.id === this.state.loggedInId);
    	this.setState({ 
			loading: false,
			categories: categories,
			employees: employees,
			loggedInName: loggedInUser !== undefined ? (loggedInUser.name + ' ' + loggedInUser.lastname) : false,
            displayForm: true,
            submissionError: false
		})
    }

    createRef(name){
    	this.allRefs[name] = React.createRef()
    	return(this.allRefs[name])
    }

    validateForm(){
    	let error = Object.keys(this.allRefs).some((ref) => { 
            if(typeof this.allRefs[ref].current.validate === 'function'){
                 return this.allRefs[ref].current.validate() === true
            }
		});
    	if(error === false)
            this.submitForm();
    }

    submitForm(){
        let resultArray = {};
        Object.keys(this.allRefs).map((ref, i) => { 
            let result = this.allRefs[ref].current.returnData();
            Object.keys(result).map(function(key, index) {
                let keyName = '"' + key + '"';
               resultArray[keyName] = result[key]
            });
        })
        try{
            console.log({...resultArray});
            this.setState({
                displayForm: false
            })
        }
        catch(error){
            console.log('erro!' + error)
            this.setState({
                submissionError: true
            })
        }
    }

    render() {
        return (
            <div className="container" id="main">
            { this.state.displayForm ? (
                <form>
                    <FormSection name="About">
                        <FormRow name="Title" isRequired={true}>
                            <FormControl isRequired={true}
                                         type="text"
                                         name="title"
                                         expectedValue="string"
                                         ariaDescription="Event title"
                                         errorContent="Title cannot be empty"
                                         placeholder="Make it short and clear"
                                         ref={this.createRef("title")}
                                          />
                        </FormRow>
                        <FormRow name="Description" isRequired={true}>
                            <TextArea name="description" 
                                      placeholder="Write about your event, be creative" 
                                      maxLength="140" 
                                      rows="10"
                                      ariaDescription="Max length 140 characters"
                                      errorContent="Description cannot be empty"
                                      isRequired={true}
                                      ref={this.createRef("description")} />                        
                        </FormRow>
                        <FormRow name="Category">
                            <Category name="category_id"
                                      defaultText="Select category"
                                      source={this.state.categories}
                                      info="describes topic and people who should be interested in this event"
                                      ref={this.createRef("category_id")} />
                        </FormRow>
                        <FormRow name="Payment" isRequired={true}>
                            <PaymentSection defaultValue={0} 
                                            ref={this.createRef("payment")} 
                                            errorContent="Set price if the event is paid" />
                        </FormRow>
                        <FormRow name="Reward">
                            <FormControl type="number"
                                         name="reward"
                                         ariaLabel="reward points for attendance"
                                         placeholder="Number"
                                         ref={this.createRef("reward")} />
                        </FormRow>
                    </FormSection>
                    <FormSection name="Coordinator">
                        <Coordinator source={this.state.employees}
                                     name="coordinator"
                                     currentUser={this.state.loggedInName}
                                     currentUserID={this.state.loggedInId}
                                     ref={this.createRef("coordinator")}
                                     errorContent="Enter valid email" />
                    </FormSection>
                    <FormSection name="When">
                        <FormRow name="Starts on" isRequired={true}>
                            <StartTime errorContent="Start time cannot be empty" 
                                       ref={this.createRef("startTime")} />
                        </FormRow>
                        <FormRow name="Duration">
                            <Duration ref={this.createRef("duration")} />
                        </FormRow>
                    </FormSection>
                    {this.state.submissionError && 
                        <InfoFrame className="info-error"
                                   title="Oops!"
                                   description="Something went wrong, try again later." />}
                    <button value="Publish event" onClick={this.validateForm} type="button" id="submit"> Publish event </button>
                </form>

              ) : (
                    <InfoFrame className="success"
                               title="Success"
                               description="Event has been created." />
              )

            }
            	
            </div>
        );
    }
}

EventForm.propTypes = {
    apiUrl: PropTypes.string
}
