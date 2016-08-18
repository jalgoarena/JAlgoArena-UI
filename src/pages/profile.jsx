import React from 'react';
import {Grid, Col, Button, Form, FormGroup, FormControl, PageHeader} from 'react-bootstrap';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';

import {setLoginDetails} from '../actions';
import FontAwesome from '../components/FontAwesome';
import store from '../store';

class Profile extends React.Component {

    componentWillMount() {
        let storedSessionLogin = sessionStorage.getItem('login');
        if (storedSessionLogin) {
            store.dispatch(setLoginDetails(JSON.parse(storedSessionLogin).loginResponse));
        } else {
            console.log("Transition in progress");
            hashHistory.push('/login');
        }
    }

    render() {
        const {
            user
        } = this.props;

        return <Grid>
            <Col mdOffset={3} md={6}>
                <PageHeader>Profile</PageHeader>
                <Form>
                    <FormGroup>
                        <FormControl type="text" placeholder="Name"/>
                    </FormGroup>

                    <FormGroup>
                        <FormControl type="email" placeholder="Email"/>
                    </FormGroup>

                    <FormGroup>
                        <FormControl type="password" placeholder="Password"/>
                    </FormGroup>

                    <FormGroup>
                        <FormControl type="password" placeholder="Repeat Password"/>
                    </FormGroup>

                    <FormGroup className="text-center">
                        <Button bsStyle="info" className="pull-right">
                            <FontAwesome name="save"/> Update
                        </Button>
                    </FormGroup>
                </Form>
            </Col>
        </Grid>;
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

const ProfilePage = connect(
    mapStateToProps
)(Profile);

export default ProfilePage;