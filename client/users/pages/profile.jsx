import React from 'react';
import {Grid, Col, Button, Table, PageHeader} from 'react-bootstrap';
import {connect} from 'react-redux';

import FontAwesome from '../../common/components/FontAwesome';

import {attemptLogout} from "../actions";
import {Redirect} from "react-router-dom";

class Profile extends React.Component {

    componentDidMount() {
        if (!this.props.auth.user) {
            this.props.navigateToHomePage();
        }
    }

    render() {
        if (!this.props.auth.user) {
            return <Redirect to={{
                pathname: "/login",
                state: { from: this.props.location }
            }} />;
        }

        const {
            auth
        } = this.props;

        let {
            user
        } = auth;

        user = user || {username: "", email: "", id: "", region: "", team: ""};

        return <Grid>
            <Col mdOffset={3} md={6}>
                <PageHeader>Profile</PageHeader>
                <Table striped bordered condensed hover responsive>
                    <thead>
                    <tr>
                        <th>User ID</th>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Region</th>
                        <th>Team</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.region}</td>
                        <td>{user.team}</td>
                    </tr>
                    </tbody>
                </Table>
                <Button bsStyle="danger" className="pull-right" onClick={this.props.onLogout}>
                    <FontAwesome prefix="fas" name="sign-out-alt"/> Logout
                </Button>
            </Col>
        </Grid>;
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        location: state.router.location
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => {
            dispatch(attemptLogout());
        }
    }
};

const ProfilePage = connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);

export {ProfilePage};