import * as React from 'react';
import * as dom from 'react-dom';
import {Grid, Col, FormGroup, PageHeader, Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {connect} from 'react-redux';
import {Redirect, RouteComponentProps, withRouter} from "react-router-dom";

import FontAwesome from '../../common/components/FontAwesome';
import FieldGroup from '../../common/components/FieldGroup';

import {attemptLogin, navigatedAwayFromAuthFormPage, startLogin} from "../actions";
import {validateUserName, validatePassword} from '../utilities/RegexValidators';
import ErrorLabel from "../components/ErrorLabel";
import {AppState} from "../../common/reducers";
import {Dispatch} from "redux";
import {AuthState} from "../reducers";
import {MouseEvent} from "react";

const initialFormState: LoginState = {
    errorMessage: null,
    isUsernameFieldIncorrect: false,
    isPasswordFieldIncorrect: false
};

interface LoginProps extends RouteComponentProps<any> {
    onUnmount: () => void
    onLogin: (formData: LoginForm) => void
    auth: AuthState
}

interface LoginState {
    errorMessage: string | null
    isUsernameFieldIncorrect: boolean
    isPasswordFieldIncorrect: boolean
}

interface LoginForm {
    username: string
    password: string
}

interface InputElement extends HTMLInputElement {
    focus: () => void
    value: string
}

class Login extends React.Component<LoginProps, LoginState> {
    private username: InputElement;
    private password: InputElement;

    constructor(props: LoginProps) {
        super(props);
        this.state = Object.assign({}, initialFormState);
        this.onLogin = this.onLogin.bind(this);
    }

    componentDidUpdate() {
        if (this.props.auth.error === "Access Denied") {
            if (!this.state.isUsernameFieldIncorrect) {
                let newState = Object.assign({}, this.state, {isUsernameFieldIncorrect: true});
                this.setState(newState);
            }
            Login.focusOn(this.username);
        }
    }

    componentWillUnmount() {
        this.props.onUnmount();
    }

    componentDidMount() {
        Login.focusOn(this.username);
    }

    private static focusOn(ref: InputElement) {
        let inputElement = dom.findDOMNode(ref) as InputElement;
        if (inputElement) {
            inputElement.focus();
        }
    }

    static findErrorsInLoginForm(formData: LoginForm) {
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

    onLogin(e: MouseEvent<Button>) {
        e.preventDefault();

        let usernameInputElement = dom.findDOMNode(this.username)  as InputElement;
        let passwordInputElement = dom.findDOMNode(this.password) as InputElement;
        const formData = {
            username: usernameInputElement.value.trim(),
            password: passwordInputElement.value.trim(),
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
                pathname: "/profile/" + this.props.auth.user.username,
                state: { from: this.props.location }
            }} />;
        }

        return <Grid>
            <Col mdOffset={4} md={4}>
                <PageHeader className="text-center">Sign In</PageHeader>
                <ErrorLabel validationError={this.state.errorMessage} authError={this.props.auth.error} />
                <form>
                    <FieldGroup id="username" placeholder="Username" type="text"
                                inputRef={(ref: any) => { this.username = ref; }}
                                validationState={this.state.isUsernameFieldIncorrect ? "error" : null}
                    />
                    <FieldGroup id="password" placeholder="Password" type="password"
                                inputRef={(ref: any) => { this.password = ref; }}
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

const mapStateToProps = (state: AppState) => {
    return {
        auth: state.auth
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        onLogin: (formData: LoginForm) => {
            dispatch(startLogin());
            dispatch<any>(attemptLogin(formData.username, formData.password));
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