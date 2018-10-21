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
        return { date: (this.state.startDate + 'T' + hourMilitary) }
    }

    render(){
        const uniqueKey = Math.random().toString(36).substring(0, 5);
    	return(
            <div className="row">
                <div className="row-items-wrapper unset-inner-rows">
                    <input type="date"
                           name="startDate"
                           id = { "input" + uniqueKey + 1}
                           onChange = {this.update}
                           min={this.startingDate} />
                    <label htmlFor={"input" + uniqueKey + 1} 
                           title="Start date"
                           className="input-label" />
                    <span>at</span>
                    <input type="time"
                           name="startTime"
                           id = { "input" + uniqueKey + 2}
                           onChange = {this.checkTimeValue} 
                           defaultChecked/>
                    <label htmlFor={"input" + uniqueKey + 2} 
                           title="Start time"
                           className="input-label" />
                    <input type="radio"
                           name="ampm"
                           value={1}
                           id = { "input" + uniqueKey + 3}
                           onChange = {this.update}  />
                    <label htmlFor={"input" + uniqueKey + 3} 
                           title="Hour AM"
                           className="input-label">
                        AM
                    </label>
                    <input type="radio"
                           name="ampm"
                           value={2}
                           id = { "input" + uniqueKey + 4}
                           onChange = {this.update} 
                           defaultChecked />
                    <label htmlFor={"input" + uniqueKey + 4} 
                           title="Hour PM"
                           className="input-label">
                        PM
                    </label>
                </div>
                { this.state.error && <ErrorPopup errorContent={this.props.errorContent} /> }
	    	</div>
    	)
    }
}