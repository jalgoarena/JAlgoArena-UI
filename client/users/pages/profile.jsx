import React from 'react';
import {Grid, Col, Button, Table, PageHeader} from 'react-bootstrap';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';

import FontAwesome from '../../common/components/FontAwesome';


import {attemptLogout} from "../actions";

class Profile extends React.Component {

    transferToProfileIfLoggedOut() {
        if (!this.props.auth.user) {
            hashHistory.push('/login');
        }
    }

    componentWillMount() {
        this.transferToProfileIfLoggedOut();
    }

    componentDidUpdate() {
        this.transferToProfileIfLoggedOut();
    }

    render() {
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
                    <FontAwesome name="sign-out"/> Logout
                </Button>
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
        onLogout: () => {
            dispatch(attemptLogout());
        }
    }
};

const ProfilePage = connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);

export default ProfilePage;