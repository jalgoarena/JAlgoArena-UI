import React from 'react';
import {connect} from 'react-redux';
import {Grid} from 'react-bootstrap';
import {hashHistory} from 'react-router';
import {fetchAllSubmissions} from "../actions/index";
import Submission from "../components/Submission";
import {fetchUsers} from "../actions/AuthActions";

class Admin extends React.Component {

    transferToLoginIfLoggedOut() {
        if (!this.props.userAuthSession.user) {
            hashHistory.push('/login');
        }

        if (!this.props.userAuthSession.user.isAdmin) {
            hashHistory.push('/');
        }
    }

    componentWillMount() {
        this.transferToLoginIfLoggedOut();
    }

    componentDidUpdate() {
        this.transferToLoginIfLoggedOut();
    }

    componentDidMount() {
        this.props.onLoad();
    }

    render() {
        let submissions = this.props.submissions || [];
        let users = this.props.userAuthSession.users;

        let submissionNodes = submissions.map((submission, idx) => {

            let username;
            if (users) {
                username = users.find((user) => {
                    return user._id === submission.userId;
                }).username;
            }

            return <Submission
                sourceCode={submission.sourceCode}
                problemId={submission.problemId}
                userId={username + ':' +  submission.userId}
                elapsed_time={submission.elapsed_time}
                level={submission.level}
                key={idx}
            />;
        });

        return <Grid>
            {submissionNodes}
        </Grid>
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
        onLoad: () => {
            dispatch(fetchAllSubmissions());
            dispatch(fetchUsers());
        }
    }
};

const AdminPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(Admin);

export default AdminPage;