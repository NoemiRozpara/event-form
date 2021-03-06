import React, { Component } from 'react'
import FormControl from './FormControl'

export default class Duration extends Component {

    constructor(props, context){
        super(props, context);
        this.state = {
            duration: 0
        }

        this.update = this.update.bind(this);
    }

    update(event){
        this.setState({
            duration: event.target.value
        })
    }

    validate(){

        return false
    }

    returnData(){

        return {duration: (this.state.duration * 3600)}
    }

    render(){
    	return(
            <div className="flex-item-wraper">
                <FormControl 
                    type="number"
                    name="duration"
                    ariaDescription={this.props.ariaDescription}
                    ariaLabel={this.props.ariaLabel}
                    placeholder={this.props.placeholder}
                    onChange={this.update}
                />
	    	</div>
    	)
    }
}