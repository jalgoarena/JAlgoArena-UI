import React from 'react';
import {connect} from 'react-redux';
import {Grid} from 'react-bootstrap';
import {hashHistory} from 'react-router';
import {fetchAllSubmissions} from "../actions/index";
import Submission from "../components/Submission";

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

        let submissionNodes = submissions.map((submission, idx) => {

            return <Submission
                sourceCode={submission.sourceCode}
                problemId={submission.problemId}
                userId={submission.userId}
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
        }
    }
};

const AdminPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(Admin);

export default AdminPage;