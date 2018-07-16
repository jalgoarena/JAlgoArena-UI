import React from 'react';
import dom from 'react-dom';
import {Grid, Col, Button, FormGroup, PageHeader} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {connect} from 'react-redux';
import {Redirect, withRouter} from "react-router-dom";

import FontAwesome from '../../common/components/FontAwesome';
import FieldGroup from '../../common/components/FieldGroup';

import {attemptLogin, navigatedAwayFromAuthFormPage, startLogin} from "../actions";
import {validateUserName, validatePassword} from '../utilities/RegexValidators';
import ErrorLabel from "../components/ErrorLabel";

const initialFormState = {
    errorMessage: null,
    isUsernameFieldIncorrect: false,
    isPasswordFieldIncorrect: false
};

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({}, initialFormState);
        this.onLogin = this.onLogin.bind(this);
    }

    componentDidUpdate() {
        if (this.props.auth.error === "Access Denied") {
            if (!this.state.isUsernameFieldIncorrect) {
                let newState = Object.assign({}, this.state);
                newState.isUsernameFieldIncorrect = true;
                this.setState(newState);
            }
            dom.findDOMNode(this.username).focus();
        }
    }

    componentWillUnmount() {
        this.props.onUnmount();
    }

    componentDidMount() {
        dom.findDOMNode(this.username).focus();
    }

    static findErrorsInLoginForm(formData) {
        // Only finding one error at a time.
        let newState = Object.assign({}, initialFormState);

        if (formData.username === "") {
            newState.errorMessage = "Username is required";
            newState.isUsernameFieldIncorrect = true;
        }
        else if (!validateUserName(formData.username)) {
            newState.errorMessage = "Please enter a valid user name";
            newState.isUsernameFieldIncorrect = true;
        }
        else if (formData.password === "") {
            newState.errorMessage = "Password is required";
            newState.isPasswordFieldIncorrect = true;
        }
        else if (!validatePassword(formData.password)) {
            newState.errorMessage = "Passwords must contain at least 6 valid characters";
            newState.isPasswordFieldIncorrect = true;
        }

        return newState;
    }

    onLogin(e) {
        e.preventDefault();

        const formData = {
            username: dom.findDOMNode(this.username).value.trim(),
            password: dom.findDOMNode(this.password).value.trim(),
        };

        let newState = Login.findErrorsInLoginForm(formData);
        this.setState(newState);
        if (!newState.errorMessage) {
            this.props.onLogin(formData);
        }
    }

    render() {
        if (this.props.auth.user) {
            return <Redirect to={{
                pathname: "/profile",
                state: { from: this.props.location }
            }} />;
        }

        return <Grid>
            <Col mdOffset={4} md={4}>
                <PageHeader className="text-center">Sign In</PageHeader>
                <ErrorLabel validationError={this.state.errorMessage} authError={this.props.auth.error} />
                <form>
                    <FieldGroup id="username" placeholder="Username" type="text"
                                inputRef={ref => { this.username = ref; }}
                                validationState={this.state.isUsernameFieldIncorrect ? "error" : null}
                    />
                    <FieldGroup id="password" placeholder="Password" type="password"
                                inputRef={ref => { this.password = ref; }}
                                validationState={this.state.isPasswordFieldIncorrect ? "error" : null}
                    />
                    <FormGroup className="text-center">
                        <Button type="submit" bsStyle="success" onClick={this.onLogin} block>
                            <FontAwesome prefix="fas" name="sign-in-alt"/> Sign In
                        </Button>
                    </FormGroup>
                    <FormGroup>
                        <span>
                            Don't have account?
                        </span>
                        <LinkContainer to='/signup'>
                            <Button className="pull-right">
                                <FontAwesome prefix="fas" name="user"/> Create Account
                            </Button>
                        </LinkContainer>
                    </FormGroup>
                </form>
            </Col>
        </Grid>;
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (formData) => {
            dispatch(startLogin());
            dispatch(attemptLogin(formData.username, formData.password));
        },
        onUnmount: () => {
            dispatch(navigatedAwayFromAuthFormPage());
        }
    }
};

const LoginPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Login));

export {LoginPage};