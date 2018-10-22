import React, { Component } from "react";
import FormError from "./FormError";

import translation from "../data/messages-en.json";

export default class StartTime extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            error: false,
            startDate: "",
            startTime: "",
            ampm: 1,
            currentError: this.props.errorContent.empty
        };

        this.startingDate = new Date();
        this.startingDate.setDate(this.startingDate.getDate() + 1);
        this.startingDateString = this.startingDate.toLocaleDateString("sq-AL");
    }

    checkTimeValue = (event) => {
        let hour = event.target.value;
        if (hour > "12:59") {
            event.target.value = "12:00";
            this.setState({
                startTime: "12:00"
            });
        } else {
            this.setState({
                startTime: event.target.value
            });
        }
    }

    checkDate = (event) => {
        event.persist();
        /* immidiate validation after inserting data from keyboard was so annoying */
        clearTimeout(this.editDate);
        this.editDate = setTimeout(() => {
            let date = new Date(event.target.value);
            if(date < this.startingDate) {
                this.setState({
                    error: true,
                    currentError: this.props.errorContent.pastDate
                });
            } else {
                this.setState({
                    error: false,
                    startDate: event.target.value
                });
            }
        }, 500)
    }

    update = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    validate() {
        if (this.state.startTime === "" || this.state.startDate === "") {
            this.setState({
                error: true,
                currentError: this.props.errorContent.empty
            });
            return true;
        } else {
            this.setState({
                error: false
            });
            return false;
        }
    }

    returnData() {
        let hour = this.state.startTime.split(":");
        hour[0] =  
            (this.state.ampm === "2" && hour[0] === "12")
                    ? 0
                    : hour[0] * this.state.ampm;
        if (hour[0].toString().length === 1) 
            hour[0] = "0" + hour[0]; 
        let hourMilitary = hour[0] + ":" + hour[1];
        return { date: this.state.startDate + "T" + hourMilitary };
    }

    render() {
        const uniqueKey = Math.random().toString(10);
        return (
            <div className="row">
                <div className="row-items-wrapper unset-inner-rows">
                    <input
                        type="date"
                        name="startDate"
                        id={"input" + uniqueKey + 1}
                        onChange={this.checkDate}
                        min={this.startingDateString}
                    />
                    <label
                        htmlFor={"input" + uniqueKey + 1}
                        title="Start date"
                        className="input-label"
                    />
                    <span className="gray">{translation.at}</span>
                    <input
                        type="time"
                        name="startTime"
                        id={"input" + uniqueKey + 2}
                        onChange={this.checkTimeValue}
                        defaultChecked
                    />
                    <label
                        htmlFor={"input" + uniqueKey + 2}
                        title="Start time"
                        className="input-label"
                    />
                    <input
                        type="radio"
                        name="ampm"
                        value="1"
                        id={"input" + uniqueKey + 3}
                        onChange={this.update}
                        defaultChecked
                    />
                    <label
                        htmlFor={"input" + uniqueKey + 3}
                        title="Hour AM"
                        className="input-label"
                    >
                        AM
                    </label>
                    <input
                        type="radio"
                        name="ampm"
                        value="2"
                        id={"input" + uniqueKey + 4}
                        onChange={this.update}
                    />
                    <label
                        htmlFor={"input" + uniqueKey + 4}
                        title="Hour PM"
                        className="input-label"
                    >
                        PM
                    </label>
                </div>
                {this.state.error && (
                    <FormError errorContent={this.state.currentError} />
                )}
            </div>
        );
    }
}
