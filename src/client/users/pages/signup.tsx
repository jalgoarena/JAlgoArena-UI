import * as React from 'react';
import {MouseEvent} from 'react';
import * as dom from 'react-dom';
import {Button, Col, ControlLabel, FormControl, FormGroup, Grid, HelpBlock, PageHeader} from 'react-bootstrap';
import {connect} from 'react-redux';

import FontAwesome from '../../common/components/FontAwesome';
import FieldGroup from '../../common/components/FieldGroup';

import {validateEmail, validatePassword, validateUserName} from '../utilities/RegexValidators';
import {attemptSignUp, fetchUsers, navigatedAwayFromAuthFormPage, startSignup} from "../actions/index";
import ErrorLabel from "../components/ErrorLabel";

import {fetchSubmissionStats} from "../../submissions/actions/index";
import {Dispatch} from "redux";
import {AppState, Config} from "../../common/reducers/index";
import {AuthState} from "../reducers/index";

const initialFormState = {
    errorMessage:  null,
    isUserNameFieldIncorrect : false,
    isFirstNameFieldIncorrect : false,
    isSurnameFieldIncorrect : false,
    isEmailFieldIncorrect : false,
    isPasswordFieldIncorrect : false,
    isConfirmPasswordFieldIncorrect : false
} as SignupState;

interface SignupForm {
    email: string
    password: string
    confirmedPassword: string
    username: string
    region: string
    team: string
    firstname: string
    surname: string
}

interface SignupProps {
    auth: AuthState
    config: Config
    onUnmount: () => void
    onSignUp: (formData: SignupForm) => void
}

interface SignupState {
    errorMessage:  string | null
    isUserNameFieldIncorrect: boolean
    isFirstNameFieldIncorrect: boolean
    isSurnameFieldIncorrect: boolean
    isEmailFieldIncorrect: boolean
    isPasswordFieldIncorrect: boolean
    isConfirmPasswordFieldIncorrect: boolean
}

interface InputElement extends HTMLInputElement {
    focus: () => void
    value: string
}

class SignUp extends React.Component<SignupProps, SignupState> {

    private username: InputElement;
    private password: InputElement;
    private email: InputElement;
    private firstname: InputElement;
    private surname: InputElement;
    private confirmPassword: InputElement;
    private region: InputElement;
    private team: InputElement;

    constructor(props: SignupProps) {
        super(props);
        this.state = Object.assign({}, initialFormState);
        this.onSignUp = this.onSignUp.bind(this);
    }

    componentDidUpdate() {
        if (this.props.auth.error === 'User name is already used') {
            if(!this.state.isUserNameFieldIncorrect){
                let newState = Object.assign({}, this.state, {isUserNameFieldIncorrect: true});
                this.setState(newState);
            }
            SignUp.focusOn(this.username);
        }

        if (this.props.auth.error === "Email is already used") {
            if(!this.state.isEmailFieldIncorrect){
                let newState = Object.assign({}, this.state, {isEmailFieldIncorrect: true});
                this.setState(newState);
            }
            SignUp.focusOn(this.email);
        }
    }

    componentWillUnmount() {
        this.props.onUnmount();
    }

    private static focusOn(ref: InputElement) {
        let inputElement = dom.findDOMNode(ref) as InputElement;
        if (inputElement) {
            inputElement.focus();
        }
    }

    static findErrorsInSignupForm(formData: SignupForm, emailRegex: string, emailErrorMessage: string) {

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
        else if (!validateEmail(formData.email, emailRegex)) {
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

    onSignUp(e: MouseEvent<Button>){
        e.preventDefault();

        let formData = {
            username: (dom.findDOMNode(this.username) as InputElement).value.trim(),
            email: (dom.findDOMNode(this.email) as InputElement).value.trim(),
            firstname: (dom.findDOMNode(this.firstname) as InputElement).value.trim(),
            surname: (dom.findDOMNode(this.surname) as InputElement).value.trim(),
            password: (dom.findDOMNode(this.password) as InputElement).value.trim(),
            confirmedPassword: (dom.findDOMNode(this.confirmPassword) as InputElement).value.trim(),
            region: (dom.findDOMNode(this.region) as InputElement).value.trim(),
            team: (dom.findDOMNode(this.team) as InputElement).value.trim()
        };

        let newState = SignUp.findErrorsInSignupForm(
            formData,
            this.props.config.emailRegex,
            this.props.config.emailErrorMessage
        );

        this.setState(newState);
        if (!newState.errorMessage){
            this.props.onSignUp(formData);
        }
    }

    componentDidMount(){
        SignUp.focusOn(this.username);
    }

    render() {
        let regions = this.props.config.regions;
        let teams = this.props.config.teams;

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
                                    inputRef={ref => { this.firstname = ref; }}
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

const mapStateToProps = (state: AppState) => {
    return {
        auth: state.auth,
        config: state.config
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        onSignUp: (formData: SignupForm) => {
            dispatch(startSignup());
            dispatch<any>(attemptSignUp(
                formData.email, formData.password, formData.username,
                formData.region, formData.team, formData.firstname, formData.surname
            ));
            dispatch<any>(fetchUsers());
            dispatch<any>(fetchSubmissionStats());
        },
        onUnmount: () => {
            dispatch(navigatedAwayFromAuthFormPage());
        }
    }
};

const SignUpPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUp);

export {SignUpPage};