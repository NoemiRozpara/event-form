import React, { Component } from "react";
import PropTypes from "prop-types";
import FormError from "./FormError";

export default class TextArea extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            /*NEW*/
            value: this.props.defaultValue,
            /*NEW*/
            isRequired: this.props.isRequired,
            error: false,
            charsCount: 0
        };
        this.input = React.createRef();
    }

    updateValue = (event) => {
        this.setState({
            value: event.target.value,
            charsCount: event.target.value.length
        });
    }

    validate(){
        if (
            this.state.isRequired === true &&
            this.state.value.replace(/\s/g, '').length === 0
        ) {
            this.input.current.focus();
            this.input.current.scrollIntoView();
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
        let value = this.state.value
            .replace("'", "/'")
            .replace('"', '/"')
            .replace(":", "/:")
            .replace(/\s\s+/g, ' ');
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
                            /*NEW*/
                            defaultValue={this.props.defaultValue}
                            name={this.props.name}
                            id={"input" + uniqueKey}
                            placeholder={this.props.placeholder}
                            onChange={this.updateValue}
                            maxLength={this.props.maxLength}
                            rows={this.props.rows}
                            ref={this.input}
                        />
                        <label
                            htmlFor={"input" + uniqueKey}
                            title={this.props.name}
                            className="input-label"
                        />
                    </div>
                    {this.state.error && (
                        <FormError errorContent={this.props.errorContent} />
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

/*NEW*/
TextArea.defaultProps = {
    defaultValue: '',
    isRequired: false,
    placeholder: '',
    maxLength: 140,
    rows: 10
};

TextArea.propTypes = {
    isRequired: PropTypes.bool,
    value: PropTypes.string,
    ariaLabel: PropTypes.string,
    ariaDescription: PropTypes.string,
    errorContent: PropTypes.string,
    placeholder: PropTypes.string
};