import React from 'react';
import {findDOMNode} from 'react-dom';
import {Grid, Col, Button, Form, FormGroup, FormControl, PageHeader} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {connect} from 'react-redux';

import {login} from '../actions';
import FontAwesome from '../components/FontAwesome';

class Login extends React.Component {
    onSignIn() {
        const {dispatch} = this.props;

        dispatch(login({
            username: findDOMNode(this.refs.username).value,
            password: findDOMNode(this.refs.password).value
        }))
    }

    render() {
        return <Grid>
            <Col mdOffset={4} md={4}>
                <PageHeader className="text-center">Sign In</PageHeader>
                <Form>
                    <FormGroup>
                        <FormControl ref="username" type="email" placeholder="Email"/>
                        <FormControl.Feedback />
                    </FormGroup>

                    <FormGroup>
                        <FormControl ref="password" type="password" placeholder="Password"/>
                        <FormControl.Feedback />
                    </FormGroup>

                    <FormGroup className="text-center">
                        <Button bsStyle="success" onClick={this.onSignIn.bind(this)} block>
                            <FontAwesome name="sign-in"/> Sign In
                        </Button>
                    </FormGroup>
                    <FormGroup>
                        <span>Don't have account?</span>
                        <LinkContainer to={{pathname: `/register`}}>
                            <Button className="pull-right">
                                <FontAwesome name="user"/> Create Account
                            </Button>
                        </LinkContainer>
                    </FormGroup>
                </Form>
            </Col>
        </Grid>;
    }
}

function mapStateToProps(state) {
    const { user } = state;
    const {
        message
    } = user || {
        message: ""
    };

    return {
        user
    }
}

const LoginPage = connect(mapStateToProps)(Login);

export default LoginPage;