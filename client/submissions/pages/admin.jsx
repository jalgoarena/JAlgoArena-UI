import React from 'react';
import {connect} from 'react-redux';
import {Grid, PageHeader, Col, Pagination} from 'react-bootstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import _ from "lodash";
import AceEditor from 'react-ace';
import 'brace/theme/chrome';

import {fetchUsers} from "../../users/actions";

import Submission from "../components/Submission";
import SubmissionsFilter from "../components/SubmissionsFilter";
import {rerunSubmission, setSubmissionsFilter, deleteSubmission, fetchAllSubmissions} from "../actions";

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sourceCode: "class Solution {}",
            activePage: 1,
            numberOfItemsToShow: 4
        }
    }

    handleSelect(eventKey) {
        this.setState({
            activePage: eventKey
        });
    }

    componentDidMount() {
        this.props.onLoad();
    }

    render() {
        let submissions = this.props.submissions || [];
        let users = this.props.auth.users;

        let filteredSubmissions = this.filterAndSort(submissions);
        let submissionsPage = this.calculateSubmissionPage(filteredSubmissions);

        let submissionNodes = submissionsPage
            .map((submission, idx) => this.submissionNode(users, submission, idx));

        return <Grid fluid={true}>
            <PageHeader className="text-center">Submissions ({submissions.length})</PageHeader>
            <SubmissionsFilter changeFilter={this.props.changeFilter} filter={this.props.submissionsFilter}/>
            <Col md={6}>
                <ReactCSSTransitionGroup transitionName="problems-filter" transitionEnterTimeout={600}
                                         transitionLeaveTimeout={600}>
                    {submissionNodes}
                </ReactCSSTransitionGroup>
                <Pagination prev next first last ellipsis
                            items={Math.ceil(filteredSubmissions.length / this.state.numberOfItemsToShow)}
                            maxButtons={4}
                            activePage={this.state.activePage}
                            onSelect={(e) => this.handleSelect(e)}
                />
            </Col>
            <Col md={6}>
                <AceEditor mode="java" theme="chrome" height="700px" width="100%"
                           value={this.state.sourceCode}
                           readOnly={true}
                           fontSize={13}
                           editorProps={{$blockScrolling: true}}
                />
            </Col>
        </Grid>
    }

    filterAndSort(submissions) {
        let filteredSubmissions = submissions
            .filter(submission => this.filterSubmissions(submission));

        return _.orderBy(filteredSubmissions, ["problemId", "userId"]);
    }

    submissionNode(users, submission, idx) {
        let username;
        if (users) {
            let user = users.find((user) => {
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
            submissionId={submission.id}
            language={submission.language}
            onDelete={this.props.onDelete}
            onRerun={this.props.onRerun}
            onShowSourceCode={() => this.setState({sourceCode: submission.sourceCode})}
            key={idx}
        />;
    }

    calculateSubmissionPage(filteredSubmissions) {
        return _.take(
            _.slice(filteredSubmissions, (this.state.activePage - 1) * this.state.numberOfItemsToShow),
            this.state.numberOfItemsToShow
        );
    }

    filterSubmissions(submission) {
        return this.showAllSubmissions() ||
            this.showErrorSubmissions(submission) ||
            submission.statusCode === this.props.submissionsFilter;
    }

    showAllSubmissions() {
        return this.props.submissionsFilter === 'ALL'
    }

    showErrorSubmissions(submission) {
        return this.props.submissionsFilter === 'ERROR' &&
            submission.statusCode !== 'ACCEPTED' &&
            submission.statusCode !== 'RERUN_ACCEPTED'
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        submissions: state.submissions.items,
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
        },
        onRerun: (sourceCode, userId, problemId, problemLanguage) => {
            dispatch(rerunSubmission(sourceCode, userId, problemId, problemLanguage));
        },
        changeFilter: (status) => {
            dispatch(setSubmissionsFilter(status));
        }
    }
};

const SubmissionsAdminPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(Admin);

export default SubmissionsAdminPage;