import React, { Component } from 'react'
import FormControl from './FormControl'
import ErrorPopup from './Error'

export default class PaymentSection extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            paid_event: false,
            event_fee: 0,
            error: false
        }
        this.validatedControl = React.createRef();
        this.validate = this.validate.bind(this)
        this.update = this.update.bind(this)
    }

    validate() {

        console.log(typeof this.state.paid_event);
        if (this.state.paid_event  && (['', 0, null, undefined].includes(this.state.event_fee) || this.state.event_fee <= 0.01)) {
            this.validatedControl.current.focus();
            this.validatedControl.current.scrollIntoView();
            this.setState({
                error: true
            })
            return (true)
        } else {
            this.setState({
                error: false
            })
            return (false)
        }
    }

    update(event) {
        let currentValue,
            errorValue;
        if(event.target.name === "paid_event") {
          currentValue = (event.target.value === "true");
          errorValue = false
        } else {
          currentValue = event.target.value
        }
        this.setState({
            [event.target.name]: currentValue,
            error: errorValue
        })
    }

    returnData() {

        let paid_event = {paid_event: this.state.paid_event, 
                          event_fee: this.state.event_fee }
        return {...paid_event}
    }

    render() {
        const uniqueKey = Math.random().toString(36).substring(0, 5);
        return (
            <div className="row">
                <div className="item-wrapper-80">
                    <input type="radio"
                           name="paid_event"
                           value={false}
                           id = { "input" + uniqueKey + 1}
                           onChange = {this.update}
                           defaultChecked />
                    <label htmlFor={"input" + uniqueKey + 1} 
                           className="input-label">
                        Free event 
                    </label>
                    <input type="radio"
                           name="paid_event"
                           value={true}
                           id = { "input" + uniqueKey + 2}
                           onChange = {this.update} />
                    <label htmlFor={"input" + uniqueKey + 2} 
                           className="input-label">
                        Paid event 
                    </label>
                    { this.state.paid_event &&
                    <div className="baseline-container">
                        <input type="number"
                               name="event_fee"
                               placeholder="Fee"
                               onChange={this.update}
                               id = { "input" + uniqueKey + 3}
                               ref={this.validatedControl} />
                        <label htmlFor={"input" + uniqueKey + 3} 
                               className="input-label"
                               title="Fee in dollars">
                            $
                        </label>
                    </div>
                    }
                </div>
                { this.state.error && <ErrorPopup errorContent={this.props.errorContent} /> }
            </div>
        )
    }
}