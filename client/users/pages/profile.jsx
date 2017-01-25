import React from 'react';
import {Grid, Col, Button, Table, PageHeader} from 'react-bootstrap';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';

import SourceCode from "../components/SourceCode";

import FontAwesome from '../../common/components/FontAwesome';
import WorkInProgress from '../../common/components/WorkInProgress';
import {closeWorkInProgressWindow} from "../../common/actions";
import {fetchSubmissions} from "../../submissions/actions";
import store from '../../common/store';


import {attemptLogout} from "../actions";

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {showSourceCode: false, sourceCode: "", problemId: ""}
    }

    showSourceCode(sourceCode, problemId) {
        this.setState({showSourceCode: true, sourceCode, problemId});
    }

    hideSourceCode() {
        this.setState({showSourceCode: false});
    }

    transferToProfileIfLoggedOut() {
        if (!this.props.userAuthSession.user) {
            hashHistory.push('/login');
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

        user = user || {username: "", email: "", id: "", region: "", team: ""};

        let submissions = this.props.submissions.map ? this.props.submissions : [];

        let submissionNodes = submissions.map((submission, idx) =>
            <tr key={idx}>
                <td><Button bsStyle="success" onClick={() => this.showSourceCode(submission.sourceCode, submission.problemId)}>
                    <FontAwesome name="file-text-o"/> {submission.problemId}
                </Button></td>
                <td>{submission.statusCode}</td>
                <td>{submission.elapsedTime}</td>
            </tr>
        );

        return <Grid>
            <WorkInProgress showModal={this.props.showModal} onHide={this.props.onHide}/>
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
                <PageHeader>Submissions</PageHeader>
                <Table striped bordered condensed hover responsive>
                    <thead>
                    <tr>
                        <th>Problem ID</th>
                        <th>Status</th>
                        <th>Time (ms)</th>
                    </tr>
                    </thead>
                    <tbody>
                    {submissionNodes}
                    </tbody>
                </Table>
            </Col>
            <SourceCode
                show={this.state.showSourceCode}
                onHide={this.hideSourceCode.bind(this)}
                sourceCode={this.state.sourceCode}
                problemId={this.state.problemId}
            />
        </Grid>;
    }
}

const mapStateToProps = (state) => {
    return {
        userAuthSession: state.userAuthSession,
        submissions: state.submissions
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => {
            dispatch(attemptLogout());
        },
        onHide: () => {
            dispatch(closeWorkInProgressWindow());
        }
    }
};

const ProfilePage = connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);

export default ProfilePage;