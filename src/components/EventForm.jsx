import React, { Component } from "react";
import PropTypes from "prop-types";

import FormSection from "./FormSection";
import FormRow from "./FormRow";
import FormControl from "./FormControl";
import TextArea from "./TextArea";
import PaymentSection from "./PaymentSection";
import StartTime from "./StartTime";
import Coordinator from "./Coordinator";
import Category from "./Category";
import InfoFrame from "./InfoFrame";
import Duration from "./Duration";

import translation from "../data/messages-en.json";
import categories from "../data/categories.json";
import employees from "../data/employes.json";

import "../css/EventForm.scss";

export default class EventForm extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            errorOccured: false,
            /*loading: true,*/
            loggedInName: "",
            displayForm: true,
            submissionError: false
        };

        this.allRefs = [];
    }

    componentDidMount() {
        /* fetch data here if from external server */
        let loggedInUser = employees.find(x => x.id === this.props.loggedInId);
        this.setState({
            /*loading: false,*/
            loggedInName:
                loggedInUser !== undefined
                    ? loggedInUser.name + " " + loggedInUser.lastname
                    : false
        });
    }

    createRef = (name) => {
        this.allRefs[name] = React.createRef();
        return this.allRefs[name];
    }

    validateForm = () => {
        // eslint-disable-next-line
        let error = Object.keys(this.allRefs).some(ref => {
            if (typeof this.allRefs[ref].current.validate === "function") {
                return this.allRefs[ref].current.validate() === true;
            }
        });
        if (error === false) this.submitForm();
    }

    submitForm = () => {
        let resultArray = {};
        // eslint-disable-next-line
        Object.keys(this.allRefs).map((ref, i) => {
            let result = this.allRefs[ref].current.returnData();
            // eslint-disable-next-line
            Object.keys(result).map(function(key, index) {
                let keyName = '"' + key + '"';
                resultArray[keyName] = result[key];
            });
        });
        try {
            console.log({ ...resultArray });
            this.setState({
                displayForm: false
            });
        } catch (error) {
            console.log(error);
            this.setState({
                submissionError: true
            });
        }
    }

    render() {
        return (
            <div className="container" id="main">
                {this.state.displayForm ? (
                    <form>
                        <FormSection name="About">
                            <FormRow
                                name={translation.title_name}
                                isRequired={true}
                            >
                                <FormControl
                                    isRequired={true}
                                    type="text"
                                    name="title"
                                    expectedValue="string"
                                    maxLength="100"
                                    ariaDescription={translation.title_label}
                                    errorContent={
                                        translation.title_name +
                                        " " +
                                        translation.empty_error
                                    }
                                    placeholder={translation.title_placeholder}
                                    ref={this.createRef("title")}
                                />
                            </FormRow>
                            <FormRow
                                name={translation.description_name}
                                isRequired={true}
                            >
                                <TextArea
                                    placeholder={
                                        translation.description_placeholder
                                    }
                                    maxLength="140"
                                    rows="10"
                                    ariaDescription={
                                        translation.description_length
                                    }
                                    errorContent={
                                        translation.description_name +
                                        " " +
                                        translation.empty_error
                                    }
                                    isRequired={true}
                                    ref={this.createRef("description")}
                                />
                            </FormRow>
                            <FormRow name={translation.category_name}>
                                <Category
                                    defaultText={translation.select_category}
                                    source={categories}
                                    info={translation.category_info}
                                    ref={this.createRef("category_id")}
                                />
                            </FormRow>
                            <FormRow
                                name={translation.payment_name}
                                isRequired={true}
                            >
                                <PaymentSection
                                    defaultValue={0}
                                    ref={this.createRef("payment")}
                                    errorContent={translation.price_error}
                                />
                            </FormRow>
                            <FormRow name={translation.reward_name}>
                                <FormControl
                                    type="number"
                                    name="reward"
                                    ariaLabel={translation.reward_info}
                                    placeholder="Number"
                                    ref={this.createRef("reward")}
                                />
                            </FormRow>
                        </FormSection>
                        <FormSection name={translation.coordinator_name}>
                            <Coordinator
                                source={employees}
                                currentUser={this.state.loggedInName}
                                loggedInId={this.props.loggedInId}
                                ref={this.createRef("coordinator")}
                                errorContent={
                                    translation.invalid_error +
                                    " " +
                                    translation.email
                                }
                            />
                        </FormSection>
                        <FormSection name={translation.when}>
                            <FormRow
                                name={translation.starts_on}
                                isRequired={true}
                            >
                                <StartTime
                                    errorContent={
                                        { empty: 
                                            translation.start_time +
                                            " " +
                                            translation.empty_error,
                                          pastDate: 
                                            translation.past_date_error }
                                    }
                                    ref={this.createRef("startTime")}
                                />
                            </FormRow>
                            <FormRow name={translation.duration_name}>
                                <Duration
                                    ariaDescription={translation.duration_label}
                                    ariaLabel={translation.duration_info}
                                    placeholder={translation.duration_placeholder}
                                    ref={this.createRef("duration")}
                                />
                            </FormRow>
                        </FormSection>

                        {this.state.submissionError && (
                            <InfoFrame
                                className="info-error"
                                title={translation.main_error_title}
                                description={translation.main_error_content}
                            />
                        )}

                        <button
                            value={translation.submit}
                            onClick={this.validateForm}
                            type="button"
                            id="submit"
                        >
                            {translation.submit}
                        </button>
                    </form>
                ) : (
                    <InfoFrame
                        className="success"
                        title={translation.success_mesage_title}
                        description={translation.success_mesage_content}
                    />
                )}
            </div>
        );
    }
}

EventForm.propTypes = {
    apiUrl: PropTypes.string,
    loggedInId: PropTypes.number
};
