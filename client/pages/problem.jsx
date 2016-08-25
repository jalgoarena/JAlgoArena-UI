import React from 'react';
import {Grid} from 'react-bootstrap';
import {connect} from 'react-redux';

import Output from '../components/Output';
import WorkInProgress from '../components/WorkInProgress';
import SubmissionDetails from '../components/SubmissionDetails';
import store from '../store';
import {startJudge, startSubmission, sendSubmission, setCurrentProblem, judgeCode, changeSourceCode} from '../actions';

class Problem extends React.Component {
    componentDidMount() {
        if (store.getState().currentProblemId !== this.props.params.id) {
            store.dispatch(setCurrentProblem(this.props.params.id));
        }
    }

    isSubmitDisabled() {
        return !(this.props.problem &&
                this.props.result.status_code === 'ACCEPTED' &&
                this.props.sourceCode &&
                this.props.userAuthSession.user)
    }

    render() {
        if (!this.props.problem) {
            return null;
        }

        const isSubmitDisabled = this.isSubmitDisabled();
        const userId = this.props.userAuthSession.user ? this.props.userAuthSession.user.id : null;

        return <Grid>
            <SubmissionDetails
                problem={this.props.problem}
                result={this.props.result}
                sourceCode={this.props.sourceCode}
                isSubmitDisabled={isSubmitDisabled}
                onRun={this.props.onRun}
                onSubmit={this.props.onSubmit}
                userId={userId}
                onSourceCodeChanged={this.props.onSourceCodeChanged}
                submissions={this.props.submissions}
            />
            <Output result={this.props.result}/>
            <WorkInProgress showModal={this.props.showModal}/>
        </Grid>;
    }
}

const mapStateToProps = (state) => {
    const problem = state.currentProblemId
        ? state.problems.find((problem) => problem.id === state.currentProblemId)
        : null;

    return {
        problem,
        showModal: state.showModal,
        result: state.result,
        sourceCode: state.sourceCode,
        userAuthSession: state.userAuthSession,
        submissions: state.submissions
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onRun: (sourceCode, problemId) => {
            dispatch(startJudge());
            dispatch(judgeCode(sourceCode, problemId));
        },
        onSubmit: (result, userId) => {
            dispatch(startSubmission());
            dispatch(sendSubmission(result, userId));
        },
        onSourceCodeChanged: (sourceCode) => {
            dispatch(changeSourceCode(sourceCode))
        }
    }
};

const ProblemPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(Problem);

export default ProblemPage;