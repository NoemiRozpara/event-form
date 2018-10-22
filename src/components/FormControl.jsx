import React, { Component } from "react";
import PropTypes from "prop-types";

import FormError from "./FormError";

export default class FormControl extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: this.props.defaultValue || '',
            isRequired:
                typeof this.props.isRequired !== "undefined"
                    ? this.props.isRequired
                    : false,
            error: false,
            shouldValidate:
                typeof this.props.expectedValue === "undefined" &&
                typeof this.props.isRequired === "undefined"
                    ? false
                    : true
        };
        this.input = React.createRef();
    }

    updateValue = (event) => {
        this.setState({
            value: event.target.value
        });
    }

    _focus() {
        this.input.current.focus();
        this.input.current.scrollIntoView();
    }

    validate() {
        let currentValue = this.state.value;
        if (this.state.shouldValidate === false) return false;

        if (
            (this.state.isRequired === true &&
                currentValue.replace(/\s/g, '').length === 0) ||
            (! currentValue.replace(/\s/g, '').length > 0 &&
                typeof this.state.value !== this.props.expectedValue)
        ) {
            this._focus();
            this.setState({
                error: true
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
        let value =
            this.props.type === "number"
                ? parseInt(this.state.value, 10)
                : this.state.value.replace(/\s\s+/g, ' ');
        return { [this.props.name]: value };
    }

    render() {
        const uniqueKey = Math.random().toString(10);
        var {
            value,
            onChange,
            ariaDescription,
            ariaLabel,
            errorContent,
            isRequired,
            expectedValue,
            ...otherProps
        } = this.props;
        return (
            <div className="row">
                <div className="row-items-wrapper">
                    <input
                        defaultValue={value || ""}
                        id={"input" + uniqueKey}
                        onChange={
                            typeof onChange === "undefined"
                                ? this.updateValue
                                : onChange
                        }
                        ref={this.input}
                        {...otherProps}
                    />
                    <label
                        htmlFor={"input" + uniqueKey}
                        title={ariaDescription || ""}
                        className="input-label"
                    >
                        {ariaLabel || ""}
                    </label>
                </div>
                {this.state.error && <FormError errorContent={errorContent} />}
            </div>
        );
    }
}

FormControl.propTypes = {
    name: PropTypes.string.isRequired,
    isRequired: PropTypes.bool,
    type: PropTypes.oneOf([
        "text",
        "hidden",
        "number",
        "email",
        "date",
        "time",
        "password",
        "tel",
        "url"
    ]).isRequired,
    expectedValue: PropTypes.string,
    ariaLabel: PropTypes.string,
    ariaDescription: PropTypes.string,
    errorContent: PropTypes.string,
    placeholder: PropTypes.string
};
