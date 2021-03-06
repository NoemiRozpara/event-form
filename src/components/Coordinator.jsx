import React, { Component } from "react";
import PropTypes from "prop-types";

import FormError from "./FormError";
import FormRow from "./FormRow";

import translation from "../data/messages-en.json";

export default class Coordinator extends Component {
    constructor(context, props) {
        super(context, props);
        this.state = {
            value: this.props.loggedInId,
            email: "",
            error: false,
            currentLabel: ""
        };
        this.validatedControl = React.createRef();
        this.selectElement = React.createRef();
    }

    componentDidMount() {
        this.setEmail();
    }

    setEmail = (event) => {
        let id = null;
        let optgroupName = null;
        if (typeof event === "undefined") {
            if (typeof this.props.loggedInId === "undefined") {
                return 0;
            } else {
                id = this.props.loggedInId;
                optgroupName = translation
                                .me
                                .charAt(0).toUpperCase() +
                                translation
                                .me
                                .slice(1)
            }
        } else {
            id = event.target.value;
            optgroupName = event.target.getElementsByTagName("option")[
                event.target.selectedIndex
            ].parentNode.label;
        }
        // eslint-disable-next-line
        let user = this.props.source.find(x => x.id == id);
        this.selectElement.current.value = -1;
        this.setState({
            value: id,
            email: 
                typeof user !== "undefined"
                ? user.email
                : '',
            currentLabel: optgroupName + " - " + user.name + " " + user.lastname
        });
    }

    updateEmail = (event) => {
        event.target.value = event.target.value.replace(/\s+/g, '');
        this.setState({
            email: event.target.value
        });
    }

    validate() {
        let pattern = /.+@.+\..+/;
        let testResult =
            !pattern.test(this.state.email) && this.state.email !== "";
        if (testResult === true) {
            this.validatedControl.current.focus();
            this.validatedControl.current.scrollIntoView();
        }
        this.setState({
            error: testResult
        });
        return testResult;
    }

    returnData() {
        return {
            coordinator: {
                email: this.state.email,
                id: parseInt(this.state.value)
            }
        };
    }

    render() {
        return (
            <div>
                <FormRow name={translation.responsible_name} isRequired={true}>
                    <div className="row-items-wrapper">
                        <select
                            name={this.props.name}
                            onChange={this.setEmail}
                            ref={this.selectElement}
                        >
                            <option hidden value={-1}>
                                {this.state.currentLabel}
                            </option>
                            <optgroup
                                label={
                                    translation.me.charAt(0).toUpperCase() +
                                    translation.me.slice(1)
                                }
                            >
                                {this.props.currentUser ? (
                                    <option
                                        key={-1}
                                        value={this.props.loggedInId}
                                    >
                                        {this.props.currentUser}
                                    </option>
                                ) : (
                                    <option key={-1} value={false} disabled>
                                        -
                                    </option>
                                )}
                            </optgroup>
                            <optgroup
                                label={
                                    translation.others.charAt(0).toUpperCase() +
                                    translation.others.slice(1)
                                }
                            >
                                {this.props.source
                                    .filter(employee => {
                                        return (
                                            employee.id !==
                                            this.props.loggedInId
                                        );
                                    })
                                    .map((employee, i) => {
                                        return (
                                            <option key={i} value={employee.id}>
                                                {employee.name}{" "}
                                                {employee.lastname}
                                            </option>
                                        );
                                    })}
                            </optgroup>
                        </select>
                    </div>
                </FormRow>
                <FormRow name={translation.email}>
                    <div className="row-items-wrapper">
                        <input
                            type="text"
                            value={this.state.email}
                            onChange={this.updateEmail}
                            placeholder={translation.email}
                            ref={this.validatedControl}
                        />
                    </div>
                    {this.state.error && (
                        <FormError errorContent={this.props.errorContent} />
                    )}
                </FormRow>
            </div>
        );
    }
}

Coordinator.propTypes = {
    source: PropTypes.array.isRequired,
    loggedInId: PropTypes.number
};