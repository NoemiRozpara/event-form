import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../css/InfoFrame.scss'

export default class InfoFrame extends Component {

    render(){
    	return(
    		<div className={"info " + this.props.className}>
   				<h3 className="title">{this.props.title}</h3>
	    		<p>{this.props.description}</p>
	    	</div>
    	)
    }
}

InfoFrame.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
	className: PropTypes.string
}