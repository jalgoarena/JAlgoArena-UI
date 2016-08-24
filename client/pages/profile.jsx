import React from 'react';
import {Grid, Col, Button, Table, PageHeader} from 'react-bootstrap';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

import FontAwesome from '../components/FontAwesome';
import {attemptLogout} from "../actions/AuthActions";
import {showModal, fetchSubmissions} from "../actions/index";
import WorkInProgress from '../components/WorkInProgress';
import store from '../store';

class Profile extends React.Component {

    transferToProfileIfLoggedOut() {
        if (!this.props.userAuthSession.user) {
            browserHistory.push('/login');
        }
    }

    componentWillMount() {
        this.transferToProfileIfLoggedOut();
    }

    componentDidUpdate() {
        this.transferToProfileIfLoggedOut();
    }

    componentDidMount() {
        if (this.props.userAuthSession.user) {
            store.dispatch(fetchSubmissions(this.props.userAuthSession.user.id));
        }
    }

    render() {
        const {
            userAuthSession
        } = this.props;

        let {
            user
        } = userAuthSession;

        user = user || {username: "", email: "", id: ""};

        let submissions = this.props.submissions.map ? this.props.submissions : [];

        let submissionNodes = submissions.map((submission, idx) =>
            <tr key={idx}>
                <td>{submission.result.problemId}</td>
                <td>{submission.result.elapsed_time}</td>
                <td>{submission.result.consumed_memory}</td>
            </tr>
        );

        return <Grid>
            <WorkInProgress showModal={this.props.showModal} />
            <Col mdOffset={3} md={6}>
                <PageHeader>Submissions</PageHeader>
                <Table striped bordered condensed hover responsive>
                    <thead>
                    <tr>
                        <th>Problem ID</th>
                        <th>Used Time (ms)</th>
                        <th>Used Memory (kb)</th>
                    </tr>
                    </thead>
                    <tbody>
                    {submissionNodes}
                    </tbody>
                </Table>
                <PageHeader>Profile</PageHeader>
                <Table striped bordered condensed hover responsive>
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>User Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
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
        userAuthSession: state.userAuthSession,
        showModal: state.showModal,
        submissions: state.submissions
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => {
            dispatch(showModal());
            dispatch(attemptLogout());
        }
    }
};

const ProfilePage = connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);

export default ProfilePage;