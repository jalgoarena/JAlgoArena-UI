import React from 'react';
import {findDOMNode} from 'react-dom';
import {Grid, Col, Button, PageHeader} from 'react-bootstrap';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';

import FontAwesome from '../components/FontAwesome';
import {validateEmail, validateUserName, validatePassword} from '../utilities/RegexValidators';
import {attemptSignUp} from "../actions/AuthActions";
import {navigatedAwayFromAuthFormPage} from "../actions/AuthActions";
import WorkInProgress from '../components/WorkInProgress';
import {startSignup} from "../actions/AuthActions";
import {closeWorkInProgressWindow} from "../actions/index";
import {regions, teams} from "../config"

const initialFormState = {
    errorMessage:  null,
    isUserNameFieldIncorrect : false,
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

    transferToProfileIfLoggedIn(){
        if (this.props.userAuthSession.user){
            hashHistory.push('/profile');
        }
    }

    componentWillMount() {
        this.transferToProfileIfLoggedIn();
    }

    componentDidUpdate() {
        this.transferToProfileIfLoggedIn();

        if(this.props.userAuthSession.error === 'That username is already being used.') {
            if(!this.state.isUserNameFieldIncorrect){
                let newState = Object.assign({}, this.state);
                newState.isUserNameFieldIncorrect = true;
                this.setState(newState);
            }
            findDOMNode(this.refs.username).focus();
        }

        if(this.props.userAuthSession.error === "That email is already being used.") {
            if(!this.state.isEmailFieldIncorrect){
                let newState = Object.assign({}, this.state);
                newState.isEmailFieldIncorrect = true;
                this.setState(newState);
            }
            findDOMNode(this.refs.email).focus();
        }
    }

    componentWillUnmount() {
        this.props.onUnmount();
    }

    getInputContainerClass(inputIncorrect){
        return ("form-group " + (inputIncorrect ? "has-error" : "") );
    }

    findErrorsInSignupForm(formData) {

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
            newState.errorMessage = "Please enter a valid email address";
            newState.isEmailFieldIncorrect = true;
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
            username : findDOMNode(this.refs.username).value.trim(),
            email : findDOMNode(this.refs.email).value.trim(),
            password : findDOMNode(this.refs.password).value.trim(),
            confirmedPassword : findDOMNode(this.refs.confirmPassword).value.trim(),
            region : findDOMNode(this.refs.region).value.trim(),
            team : findDOMNode(this.refs.team).value.trim()
        };

        let newState = this.findErrorsInSignupForm(formData);
        this.setState(newState);
        if (!newState.errorMessage){
            this.props.onSignUp(formData);
        }
    }

    componentDidMount(){
        findDOMNode(this.refs.username).focus();
    }

    render() {
        let errorLabel;

        if(this.state.errorMessage){
            errorLabel = (
                <div className={this.getInputContainerClass(true)}>
                    <label className="control-label">{this.state.errorMessage}</label>
                </div> );
        }
        else if(this.props.userAuthSession.error){
            errorLabel = (
                <div className={this.getInputContainerClass(true)}>
                    <label className="control-label">{this.props.userAuthSession.error}</label>
                </div> );
        }

        let regionOptions = regions.map(region => <option>{region}</option>);
        let teamOptions = teams.map(team => <option>{team}</option>);

        return (
            <Grid>
                <WorkInProgress showModal={this.props.showModal} onHide={this.props.onHide}/>
                <Col mdOffset={4} md={4}>
                    <form>
                        <PageHeader className="text-center">Create Account</PageHeader>
                        { errorLabel }
                        <div className="form-group">
                            <label htmlFor="region" className="control-label">Region</label>
                            <select className="form-control" ref="region" id="region">
                                {regionOptions}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Team" className="control-label">Team</label>
                            <select className="form-control" ref="team" id="team">
                                {teamOptions}
                            </select>
                        </div>
                        <div className={this.getInputContainerClass(this.state.isUserNameFieldIncorrect)}>
                            <input className="form-control" type="text" placeholder="User Name" ref="username"/>
                        </div>
                        <div className={this.getInputContainerClass(this.state.isEmailFieldIncorrect)}>
                            <input className="form-control" type="text" placeholder="Email" ref="email"/>
                        </div>
                        <div className={this.getInputContainerClass(this.state.isPasswordFieldIncorrect)}>
                            <input className="form-control" type="password" placeholder="Password" ref="password" />
                        </div>
                        <div className={this.getInputContainerClass(this.state.isConfirmPasswordFieldIncorrect)}>
                            <input className="form-control" type="password" placeholder="Confirm Password" ref="confirmPassword" />
                        </div>
                        <Button type="submit" bsStyle="success" block onClick={this.onSignUp}>
                            <FontAwesome name="user"/> Create Account
                        </Button>
                    </form>
                </Col>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userAuthSession: state.userAuthSession,
        showModal: state.showModal
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSignUp: (formData) => {
            dispatch(startSignup());
            dispatch(attemptSignUp(formData.email, formData.password, formData.username, formData.region, formData.team));
        },
        onUnmount: () => {
            dispatch(navigatedAwayFromAuthFormPage());
        },
        onHide: () => {
            dispatch(closeWorkInProgressWindow());
        }
    }
};

const SignUpPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUp);

export default SignUpPage;