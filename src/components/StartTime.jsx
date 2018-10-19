import React, { Component } from 'react'
import FormControl from './FormControl'
import ErrorPopup from './Error'

export default class StartTime extends Component {

    constructor(props, context){
        super(props, context);
        this.state = {
            error: false,
            startDate: '',
            startTime: '',
            ampm: '1'
        }

        this.update = this.update.bind(this);
        this.checkTimeValue = this.checkTimeValue.bind(this);

        this.startingDate = new Date();
        this.startingDate.setDate(this.startingDate.getDate() + 1);
        this.startingDate = this.startingDate.toLocaleDateString("sq-AL");
    }

    checkTimeValue(event){
        let hour = event.target.value;
        if(hour > '12:59'){
            event.target.value = '12:00';
            this.setState({
                error: true
            })
        }
        else{
            this.setState({
                error: false,
                startTime: event.target.value
            })
        }
    }

    update(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    validate(){

        if(this.state.startTime === '' || this.state.startDate === ''){
            this.setState({
                error: true
            })
            return(true)
        }
        else{
            this.setState({
                error: false
            })
            return(false)
        }
    }

    returnData(){
        let hour = this.state.startTime.split(':');
        let hourMilitary = hour[0] * this.state.ampm + ':' + hour[1];
        return '"date": "' + this.state.startDate + 'T' + hourMilitary + '"'
    }

    render(){
    	return(
            <div className="flex-item-wraper">
                <FormControl type="date"
                             name="startDate"
                             ariaDescription="Start date" 
                             isRequired={true}
                             onChange={this.update}
                             min={this.startingDate} />
                <FormControl type="time"
                             name="startTime"
                             ariaDescription="Start time" 
                             isRequired={true}
                             onChange={this.checkTimeValue}
                             max="12:00" />
                <FormControl type="radio"
                             name="ampm"
                             ariaLabel="AM" 
                             value="1"
                             defaultChecked={true}
                             onChange={this.update} />
                <FormControl type="radio"
                             name="ampm"
                             ariaLabel="PM" 
                             value="2"
                             onChange={this.update}/>
                { this.state.error && <ErrorPopup errorContent={this.props.errorContent} /> }
	    	</div>
    	)
    }
}