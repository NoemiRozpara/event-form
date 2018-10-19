import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ErrorPopup from './Error'
import '../css/FormControl.css'

export default class FormControl extends Component {

    constructor(props, context){
        super(props, context);
        this.state = {
            currentValue: this.props.defaultValue || '',
            isRequired: (typeof this.props.isRequired !== 'undefined' ? this.props.isRequired : false),
            error: false,
            shouldValidate: ((typeof this.props.expectedValue === 'undefined' && 
                              typeof this.props.isRequired === 'undefined') ? 
                              false : 
                              true)
        }
        this.updateValue = this.updateValue.bind(this);
    }

    updateValue(event){
        this.setState({
            currentValue: event.target.value
        })
    }

    validate(){

        if(this.state.shouldValidate === false ) return false;

        if((this.state.isRequired === true && (this.state.currentValue === '' || this.state.currentValue === ' ')) ||
            (this.state.currentValue !== '' && typeof this.state.currentValue !== this.props.expectedValue)){
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
        if(this.props.expectedValue === "string")
            return '"' + this.props.name + '":"' + this.state.currentValue + '"'
        else
            return '"' + this.props.name + '":' + this.state.currentValue 
    }

    render(){
    	const uniqueKey = Math.random().toString(36).substring(0,5);
        var {value, 
             onChange, 
             ariaDescription, 
             ariaLabel, 
             errorContent, 
             isRequired, 
             expectedValue, 
             ...otherProps} = this.props
    	return(
            <div className="flex-item-wraper">
        		<input defaultValue={value || ''} 
                       id={"input" + uniqueKey} 
                       onChange={typeof onChange === 'undefined' ? this.updateValue : onChange}
                        {...otherProps} />
       			<label htmlFor={"input" + uniqueKey} 
                       title={ariaDescription || ''}
                       className="input-label">
                    {ariaLabel || ''}
                </label>
                { this.state.error && <ErrorPopup errorContent={errorContent} /> }
	    	</div>
    	)
    }
}

FormControl.propTypes = {
	name: PropTypes.string.isRequired,
    isRequired: PropTypes.bool,
    type: PropTypes.oneOf(['text', 'hidden', 'number', 'email', 'date', 'time', 'password', 'tel', 'url', 'radio', 'checkbox']).isRequired,
    expectedValue: PropTypes.string,
    ariaLabel: PropTypes.string,
    ariaDescription: PropTypes.string,
    errorContent: PropTypes.string,
    placeholder: PropTypes.string
}