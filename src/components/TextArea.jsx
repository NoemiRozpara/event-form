import React, { Component } from "react";
import PropTypes from "prop-types";
import ErrorPopup from "./Error";

export default class TextArea extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            currentValue: this.props.defaultValue || "",
            isRequired:
                typeof this.props.isRequired !== "undefined"
                    ? this.props.isRequired
                    : false,
            error: false,
            shouldValidate:
                typeof this.props.expectedValue === "undefined" &&
                typeof this.props.isRequired === "undefined"
                    ? false
                    : true,
            charsCount: 0
        };
        this.validatedControl = React.createRef();
        this.updateValue = this.updateValue.bind(this);
        this.validate = this.validate.bind(this);
    }

    updateValue(event) {
        this.setState({
            currentValue: event.target.value,
            charsCount: event.target.value.length
        });
    }

    validate() {
        if (this.state.shouldValidate === false) return false;

        if (
            this.state.isRequired === true &&
            (this.state.currentValue === "" || this.state.currentValue === " ")
        ) {
            this.validatedControl.current.focus();
            this.validatedControl.current.scrollIntoView();
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
        let value = this.state.currentValue
            .replace("'", "/'")
            .replace('"', '/"')
            .replace(":", "/:");
        let result = { description: value };
        return result;
    }

    render() {
        const uniqueKey = Math.random()
            .toString(36)
            .substring(0, 5);
        return (
            <div className="row row-column">
                <div className="row">
                    <div className="row-items-wrapper">
                        <textarea
                            type={this.props.type}
                            defaultValue={this.props.value || ""}
                            name={this.props.name}
                            id={"input" + uniqueKey}
                            placeholder={this.props.placeholder || ""}
                            onChange={this.updateValue}
                            maxLength={this.props.maxLength || ""}
                            rows={this.props.rows || ""}
                            ref={this.validatedControl}
                        />
                        <label
                            htmlFor={"input" + uniqueKey}
                            title={this.props.name}
                            className="input-label"
                        />
                    </div>
                    {this.state.error && (
                        <ErrorPopup errorContent={this.props.errorContent} />
                    )}
                </div>
                <div className="row">
                    <div className="row-items-wrapper space-between">
                        <span className="small-info">
                            {this.props.ariaDescription}{" "}
                        </span>
                        <span className="small-info">
                            {this.state.charsCount} / {this.props.maxLength}{" "}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

TextArea.propTypes = {
    isRequired: PropTypes.bool,
    value: PropTypes.string,
    ariaLabel: PropTypes.string,
    ariaDescription: PropTypes.string,
    errorContent: PropTypes.string,
    placeholder: PropTypes.string
};