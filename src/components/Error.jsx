import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../css/Error.css'

export default class ErrorPopup extends Component {

    render(){
    	return(
    		<div className="error">
   				<span>{this.props.errorContent}</span>
	    	</div>
    	)
    }
}

ErrorPopup.propTypes = {
	errorContent: PropTypes.string
}