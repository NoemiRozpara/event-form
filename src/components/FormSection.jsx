import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class FormSection extends Component {

    render(){
    	return(

	    	<fieldset name={this.props.name} className="form-section">
	    		<legend>{this.props.name}</legend>
	    		{this.props.children}
	    	</fieldset>
    	)
    }
}

FormSection.propTypes = {
	name: PropTypes.string
}