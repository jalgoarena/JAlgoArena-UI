import React from 'react';
import {connect} from 'react-redux';
import {Grid} from 'react-bootstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {fetchUsers} from "../../users/actions";

import Submission from "../components/Submission";
import SubmissionsFilter from "../components/SubmissionsFilter";
import {rerunSubmission, setSubmissionsFilter, deleteSubmission, fetchAllSubmissions} from "../actions";

class Admin extends React.Component {

    componentDidMount() {
        this.props.onLoad();
    }

    render() {
        let submissions = this.props.submissions || [];
        let users = this.props.userAuthSession.users;

        let submissionNodes = submissions
            .filter(submission => this.props.submissionsFilter === 'ALL' ||
                submission.statusCode === this.props.submissionsFilter)
            .map((submission, idx) => {
                let username;
                if (users) {
                    var user = users.find((user) => {
                        return user.id === submission.userId;
                    });

                    if (user && user.username) {
                        username = user.username;
                    } else {
                        username = 'Not-Found';
                    }
                }

                return <Submission
                    sourceCode={submission.sourceCode}
                    problemId={submission.problemId}
                    username={username}
                    userId={submission.userId}
                    elapsedTime={submission.elapsedTime}
                    statusCode={submission.statusCode}
                    level={submission.level}
                    submissionId={submission.id}
                    language={submission.language}
                    onDelete={this.props.onDelete}
                    onRerun={this.props.onRerun}
                    key={idx}
                />;
        });

        return <Grid>
            <SubmissionsFilter changeFilter={this.props.changeFilter} filter={this.props.submissionsFilter} />
            <ReactCSSTransitionGroup transitionName="problems-filter" transitionEnterTimeout={600} transitionLeaveTimeout={600}>
                {submissionNodes}
            </ReactCSSTransitionGroup>
        </Grid>
    }
}

const mapStateToProps = (state) => {
    return {
        userAuthSession: state.userAuthSession,
        submissions: state.submissions,
        submissionsFilter: state.submissionsFilter
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: () => {
            dispatch(fetchAllSubmissions());
            dispatch(fetchUsers());
        },
        onDelete: (submissionId) => {
            dispatch(deleteSubmission(submissionId));
            dispatch(fetchAllSubmissions());
        },
        onRerun: (sourceCode, userId, problemId, problemLevel, problemLanguage) => {
            dispatch(rerunSubmission(sourceCode, userId, problemId, problemLevel, problemLanguage));
        },
        changeFilter: (status) => {
            dispatch(setSubmissionsFilter(status));
        }
    }
};

const AdminPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(Admin);

export default AdminPage;