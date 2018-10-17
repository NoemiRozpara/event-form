import React, { Component } from 'react'
import {AppState, actions} from '../appState.jsx'
import '../css/Rating.css'
import '@fortawesome/fontawesome-free/css/regular.min.css'
import '@fortawesome/fontawesome-free/css/fontawesome.min.css'
import '@fortawesome/fontawesome-free/css/solid.min.css'

export default class Rating extends Component{

    constructor(props, context){
        super(props, context);

        this.state = {
            value: this.props.value,
            currentValue: this.props.value,
            indicator: this._makeIndicator(this.props.value, 
                                           this.props.max, 
                                           typeof AppState.state.rating_map[this.props.sessionId] == "undefined" ? 
                                                this.props.max - this.props.max_beers : 
                                                this.props.max - this.props.max_beers - this.props.value),
            rating: this.props.value,
            sessionId: this.props.sessionId,
            //beersLeft: this.props.beersLeft,
            //disabledBeers: this.props.disabledBeers,
            max_beers: this.props.max_beers,
            disabledBeers: typeof AppState.state.rating_map[this.props.sessionId] == "undefined" ? 
                                this.props.max - this.props.max_beers : 
                                this.props.max - this.props.max_beers - this.props.value,
            onChange: function(){}
        }
    };

    componentWillReceiveProps(nextProps){
        
        if(this.state.max_beers !== nextProps.max_beers){
            this.setState({
                max_beers: nextProps.max_beers,
                disabledBeers: typeof AppState.state.rating_map[this.props.sessionId] == "undefined" ? 
                                this.props.max - nextProps.max_beers : 
                                this.props.max - nextProps.max_beers - this.props.value,
            })
            this.setRating(this.state.value)
        }
        if(this.state.rating !== nextProps.value){
            this.setRating(nextProps.value)
        }
    }

    _makeIndicator(value, max, disabledBeers){
        console.log(disabledBeers);
        if(disabledBeers < 0){
            disabledBeers = 0;
        }
        let arrayTrue = Array(value).fill(true);
        let arrayFalse = Array(max - disabledBeers - value).fill(false);
        let arrayDisabled = Array(disabledBeers).fill('disabled');
        return [...arrayTrue, ...arrayFalse, ...arrayDisabled]
    }

    setIndicator(value){

        //console.log(this.props.disabledBeers);
        this.setState({
            indicator: this._makeIndicator(value, this.props.max, this.state.disabledBeers)
        })
    }

    setRating(value){
        if(this.state.value === value && this.state.rating === value){
            return;
        }
        this.setState({
            rating: value,
            value: value
        });
        this.setIndicator(value);
        this.props.onChange(value);
        //this.props.shouldRefreshBeers();
    }

    onMouseEnter(index, flag){
        if(flag !== false || typeof flag === "undefined") 
            return;
        else
            return() => this.setIndicator(index);
    }

    onMouseLeave(index){
        return() => this.setIndicator(this.state.rating);
    }

    onClick(index, flag){
        if(flag !== false || typeof flag === "undefined") 
            return;
        else 
            return() => this.setRating(index);
    }

    render(){
        return (
            <div className="rating-icons"> 
                {this.state.indicator.map((item, index) => (
                        <button key={index}
                                //onMouseEnter={this.onMouseEnter(index + 1, item == 'disabled')}
                                //onMouseLeave={this.onMouseLeave(index + 1)}
                                onClick={this.onClick(index + 1, item == 'disabled')}
                                disabled={item === 'disabled' ? true : false}
                                >
                            <i className={item === true ? "fas fa-beer" : "far fa-square"} />
                        </button>    
                        )
                    )
                }
                {this.state.rating > 0 && 
                    <i className="fas fa-times"
                        key={0}
                        //onMouseEnter={this.onMouseEnter(0, false)}
                        //onMouseLeave={this.onMouseLeave(0)}
                        onClick={this.onClick(0, false)}
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