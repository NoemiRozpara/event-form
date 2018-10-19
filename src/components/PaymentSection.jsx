import React, { Component } from 'react'
import FormControl from './FormControl'
import ErrorPopup from './Error'

export default class PaymentSection extends Component {

    constructor(props, context){
        super(props, context);
        this.state = {
            paid_event: false,
            event_fee: 0,
            error: false
        }
        this.validate = this.validate.bind(this)
        this.update = this.update.bind(this)
    }

    validate(){
        if(this.state.paid_event && (['', 0, null, undefined].includes(this.state.event_fee) || this.state.event_fee <= 0.01)){
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

    update(event){
    	let disableError = (event.target.name === "paid_event" && event.target.value === false) ? 'error:false' : '';
        this.setState({
            [event.target.name]: event.target.value,
            disableError
        })
    }

    returnData(){
        return '"paid_event": ' + this.state.paid_event +
               ',"event_fee": ' + this.state.event_fee 
    }

    render(){
    	return(
            <div className="flex-item-wraper">
	            <FormControl type="radio"
						     name="paid_event"
						     value={false}
						     ariaLabel="Free event"
						     defaultChecked={this.props.defaultValue == "0" ? true : false} 
						     onChange={this.update}/>
				<FormControl type="radio"
						     name="paid_event"
						     value={true}
						     ariaLabel="Paid event"
						     defaultChecked={this.props.defaultValue == "1" ? true : false}
						     onChange={this.update}/>
				{ this.state.paid_event &&
					<FormControl type="number"
						     name="event_fee"
						     ariaDescription="Fee in dollars"
						     ariaLabel="$"
						     placeholder="Number"
						     onChange={this.update} />
				}
				{ this.state.error && <ErrorPopup errorContent={this.props.errorContent} /> }
	    	</div>
    	)
    }
}