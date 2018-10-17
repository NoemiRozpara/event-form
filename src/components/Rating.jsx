import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../css/Rating.css'

export default class Rating extends Component{

    constructor(props, context){
        super(props, context);
        this.state = {
            indicator: this._makeIndicator(this.props.value, this.props.max, this.props.disabledBeers)
        }
        this.onChange = function(){}
    };

    componentDidUpdate(prevProps) {
        if(prevProps.value !== this.props.value || prevProps.disabledBeers !== this.props.disabledBeers){
            this.setState({
                indicator: this._makeIndicator(this.props.value, this.props.max, this.props.disabledBeers)
            })
        }
    }

    _makeIndicator(val, max, disabled){
        let disabledBeers = Math.max(disabled, 0);
        let value = val | 0;
        let falseBeers = (max - val - disabledBeers) | 0;
        return [...Array(value).fill(true), ...Array(falseBeers).fill(false), ...Array(disabledBeers).fill('disabled')]
    }

    setRating(id, value){
        if(this.value === value){
            return;
        }
        this.props.onChange(id, value);
    }

    onClick(id, index, flag){
        if(flag !== false || typeof flag === "undefined") 
            return;
        else
            return() => this.setRating(id, index);
    }

    render(){

        return (
            <div className="rating-icons"> 
                {this.state.indicator.map((item, index) => (
                        <button key={index + 1}
                                onClick={this.onClick(this.props.sessionId, index + 1, item === 'disabled')}
                                disabled={item === 'disabled' ? true : false}
                                >
                            <i className={item === true ? "fas fa-beer" : "far fa-square"} />
                        </button>    
                        )
                    )
                }
                {(this.props.value > 0 && this.props.active === true) &&
                    <i className="fas fa-times"
                        key={0}
                        onClick={this.onClick(this.props.sessionId, 0, false)}
                    />
                }
            </div>
        )
    }   
}

Rating.defaultProps = {
    value: 0,
    max: 3,
    onChange: function(){}
}

Rating.propTypes = {
    value: PropTypes.number,
    max: PropTypes.number, 
    onChange: PropTypes.func,
    disabledBeers: PropTypes.number
}