import React from 'react';
import {Grid, Col, Button, Form, FormGroup, FormControl, PageHeader} from 'react-bootstrap';

import {setLoginDetails} from '../actions';
import FontAwesome from '../components/FontAwesome';

export default class Profile extends React.Component {
    componentWillMount() {
        const {dispatch} = this.props;
        let storedSessionLogin = sessionStorage.getItem('login');
        if (storedSessionLogin) {
            dispatch(setLoginDetails(JSON.parse(storedSessionLogin).loginResponse));
        }
    }

    render() {
        return <Grid>
            <Col mdOffset={3} md={6}>
                <PageHeader>Profile</PageHeader>
                <Form>
                    <FormGroup>
                        <FormControl type="text" placeholder="Name" />
                    </FormGroup>

                    <FormGroup>
                        <FormControl type="email" placeholder="Email" />
                    </FormGroup>

                    <FormGroup>
                        <FormControl type="password" placeholder="Password" />
                    </FormGroup>

                    <FormGroup>
                        <FormControl type="password" placeholder="Repeat Password" />
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
