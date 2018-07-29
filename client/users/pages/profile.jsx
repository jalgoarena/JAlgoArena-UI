import React from 'react';
import {Grid, Col, Table, PageHeader} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as _ from "lodash";
import User from "../domain/User";

class Profile extends React.Component {

    render() {
        let user = _.find(this.props.users,
            (user: User) => user.username === this.props.match.params.username
        );

        if (!user) {
            return <Grid>
                <Col mdOffset={3} md={6}>
                    <h2>Profile not found</h2>
                    <p>Profile: {this.props.match.params.username}</p>
                </Col>
            </Grid>;
        }

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
            </Col>
        </Grid>;
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.auth.users,
        location: state.router.location
    };
};



const ProfilePage = connect(
    mapStateToProps
)(Profile);

export {ProfilePage};