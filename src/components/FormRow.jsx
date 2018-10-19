import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class FormRow extends Component {

    render(){
    	const uniqueKey = Math.random().toString(36).substring(0,5)
    	return(
    		<div className="row">
   				<span id={"groupTitle" + uniqueKey} className="form-row-label">
   					{this.props.name} {this.props.isRequired && <em aria-label="required">*</em>}
   				</span>
	    		<div role="group" aria-labelledby={"groupTitle" + uniqueKey} className="form-row-group">
	   				{this.props.children}
	   			</div>
	    	</div>
    	)
    }
}

FormRow.propTypes = {
	name: PropTypes.string
}