import React from 'react';
import {Grid, Col, Button, Form, FormGroup, FormControl, PageHeader} from 'react-bootstrap';

import FontAwesome from '../components/FontAwesome';

const Register = () => (
    <Grid>
        <Col mdOffset={4} md={4}>
            <PageHeader className="text-center">Join Us</PageHeader>
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
                    <Button bsStyle="success" block>
                        <FontAwesome name="user"/> Create Account
                    </Button>
                </FormGroup>
            </Form>
        </Col>
    </Grid>
);

export default Register;