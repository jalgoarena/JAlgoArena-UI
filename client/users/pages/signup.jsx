import React from 'react';
import dom from 'react-dom';
import {Grid, Col, Button, PageHeader, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';
import {connect} from 'react-redux';
import { withRouter } from "react-router-dom";

import FontAwesome from '../../common/components/FontAwesome';
import FieldGroup from '../../common/components/FieldGroup';

import {validateEmail, validateUserName, validatePassword} from '../utilities/RegexValidators';
import {attemptSignUp, navigatedAwayFromAuthFormPage, startSignup} from "../actions";
import ErrorLabel from "../components/ErrorLabel";
import {regions, teams, emailErrorMessage} from "../../config";

const initialFormState = {
    errorMessage:  null,
    isUserNameFieldIncorrect : false,
    isFirstNameFieldIncorrect : false,
    isSurnameFieldIncorrect : false,
    isEmailFieldIncorrect : false,
    isPasswordFieldIncorrect : false,
    isConfirmPasswordFieldIncorrect : false
};

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({}, initialFormState);
        this.onSignUp = this.onSignUp.bind(this);
    }

    componentDidUpdate() {
        if (this.props.auth.error === 'User name is already used') {
            if(!this.state.isUserNameFieldIncorrect){
                let newState = Object.assign({}, this.state);
                newState.isUserNameFieldIncorrect = true;
                this.setState(newState);
            }
            dom.findDOMNode(this.username).focus();
        }

        if (this.props.auth.error === "Email is already used") {
            if(!this.state.isEmailFieldIncorrect){
                let newState = Object.assign({}, this.state);
                newState.isEmailFieldIncorrect = true;
                this.setState(newState);
            }
            dom.findDOMNode(this.email).focus();
        }
    }

    componentWillUnmount() {
        this.props.onUnmount();
    }

    static findErrorsInSignupForm(formData) {

        let newState = Object.assign({}, initialFormState);

        if (formData.username === "") {
            newState.errorMessage = "A user name is required";
            newState.isUserNameFieldIncorrect = true;
        }
        else if (!validateUserName(formData.username)) {
            newState.errorMessage = "Please enter a valid user name containing alphanumerics, dashes (-), and/or underscores (_)";
            newState.isUserNameFieldIncorrect = true;
        }
        else if (formData.email === "") {
            newState.errorMessage = "Email is required";
            newState.isEmailFieldIncorrect = true;
        }
        else if (!validateEmail(formData.email)) {
            newState.errorMessage = emailErrorMessage;
            newState.isEmailFieldIncorrect = true;
        }
        else if (formData.firstname === "") {
            newState.errorMessage = "First Name is required";
            newState.isFirstNameFieldIncorrect = true;
        }
        else if (formData.surname === "") {
            newState.errorMessage = "Surname is required";
            newState.isSurnameFieldIncorrect = true;
        }
        else if (formData.password === "") {
            newState.errorMessage = "Password is required";
            newState.isPasswordFieldIncorrect = true;
        }
        else if(!validatePassword(formData.password)) {
            newState.errorMessage = "Your password must contain at least 6 valid characters";
            newState.isPasswordFieldIncorrect = true;
        }
        else if (formData.confirmedPassword === "") {
            newState.errorMessage = "Please confirm your password";
            newState.isConfirmPasswordFieldIncorrect = true;
        }
        else if (formData.confirmedPassword !== formData.password) {
            newState.errorMessage = "The passwords don't match";
            newState.isConfirmPasswordFieldIncorrect = true;
            newState.isPasswordFieldIncorrect = true;
        }

        return newState;
    }

    onSignUp(e){
        e.preventDefault();

        let formData = {
            username : dom.findDOMNode(this.username).value.trim(),
            email : dom.findDOMNode(this.email).value.trim(),
            firstname : dom.findDOMNode(this.firstname).value.trim(),
            surname : dom.findDOMNode(this.surname).value.trim(),
            password : dom.findDOMNode(this.password).value.trim(),
            confirmedPassword : dom.findDOMNode(this.confirmPassword).value.trim(),
            region : dom.findDOMNode(this.region).value.trim(),
            team : dom.findDOMNode(this.team).value.trim()
        };

        let newState = SignUp.findErrorsInSignupForm(formData);
        this.setState(newState);
        if (!newState.errorMessage){
            this.props.onSignUp(formData);
        }
    }

    componentDidMount(){
        dom.findDOMNode(this.username).focus();
    }

    render() {
        let regionOptions = regions.map(region => <option>{region}</option>);
        let teamOptions = teams.map(team => <option>{team}</option>);

        return (
            <Grid>
                <Col mdOffset={4} md={4}>
                    <form>
                        <PageHeader className="text-center">Create Account</PageHeader>
                        <ErrorLabel validationError={this.state.errorMessage} authError={this.props.auth.error} />
                        <FormGroup controlId="region">
                            <ControlLabel>Region</ControlLabel>
                            <FormControl componentClass="select" inputRef={ref => { this.region = ref; }}>
                                {regionOptions}
                            </FormControl>
                        </FormGroup>
                        <FormGroup controlId="team">
                            <ControlLabel>Team</ControlLabel>
                            <FormControl componentClass="select" inputRef={ref => { this.team = ref; }}>
                                {teamOptions}
                            </FormControl>
                        </FormGroup>
                        <FieldGroup id="firstname" type="text" placeholder="First Name"
                                    inputRef={ref => { this.name = ref; }}
                                    validationState={this.state.isFirstNameFieldIncorrect ? "error" : null}
                        />
                        <FieldGroup id="surname" type="text" placeholder="Surname"
                                    inputRef={ref => { this.surname = ref; }}
                                    validationState={this.state.isSurnameFieldIncorrect ? "error" : null}
                        />
                        <FieldGroup id="username" type="text" placeholder="Username"
                                    inputRef={ref => { this.username = ref; }}
                                    validationState={this.state.isUserNameFieldIncorrect ? "error" : null}
                        />
                        <FieldGroup id="email" type="text" placeholder="Email"
                                    inputRef={ref => { this.email = ref; }}
                                    validationState={this.state.isEmailFieldIncorrect ? "error" : null}
                        />
                        <FieldGroup id="password" type="password" placeholder="Password"
                                    inputRef={ref => { this.password = ref; }}
                                    validationState={this.state.isPasswordFieldIncorrect ? "error" : null}
                        />
                        <FieldGroup id="confirmPassword" type="password" placeholder="Confirm Password"
                                    inputRef={ref => { this.confirmPassword = ref; }}
                                    validationState={this.state.isConfirmPasswordFieldIncorrect ? "error" : null}
                        />
                        <Button type="submit" bsStyle="success" block onClick={this.onSignUp}>
                            <FontAwesome prefix="fas" name="user"/> Create Account
                        </Button>
                        <HelpBlock>
                            By creating account you agree to our <a href="/#/codeOfConduct" target="_blank">Code of Conduct</a>
                        </HelpBlock>
                    </form>
                </Col>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSignUp: (formData) => {
            dispatch(startSignup());
            dispatch(attemptSignUp(
                formData.email, formData.password, formData.username,
                formData.region, formData.team, formData.firstname, formData.surname
            ));
        },
        onUnmount: () => {
            dispatch(navigatedAwayFromAuthFormPage());
        }
    }
};

const SignUpPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(SignUp));

export {SignUpPage};