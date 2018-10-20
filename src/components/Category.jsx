import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Category extends Component {

	constructor(context, props){
		super(context, props);
		this.state = {
			value: -1,
			error: false
		}
		this.update = this.update.bind(this);
	}

	update(event){
		this.setState({
			category: event.target.value
		})
	}

	returnData(){
        return '"category_id": ' + this.state.value
    }

    render(){
    	return(
    		<div className="row">
	    		<select id="name" onChange={this.update} defaultValue={this.state.value}>
    				<option key={-1} value={-1}> {this.props.defaultText} </option>
					{ this.props.source.map((category, i) => {
                        return(
                            <option key={i} value={category.id}> {category.name} </option>
                        )
                    })}
                </select>
                <span className="small-info"> {this.props.info} </span>
	    	</div>
    	)
    }
}

Category.propTypes = {
	name: PropTypes.string.isRequired,
	source: PropTypes.array.isRequired
}