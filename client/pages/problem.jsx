import React from 'react';
import {Grid} from 'react-bootstrap';
import {connect} from 'react-redux';

import Output from '../components/Output.jsx';
import WorkInProgress from '../components/WorkInProgress.jsx';
import SubmissionDetails from '../components/SubmissionDetails.jsx';
import store from '../store';
import {setCurrentProblem, judgeCode, showModal, changeSourceCode} from '../actions';

class Problem extends React.Component {
    componentDidMount() {
        if (store.getState().currentProblemId !== this.props.params.id) {
            store.dispatch(setCurrentProblem(this.props.params.id));
        }
    }

    render() {
        if (!this.props.problem) {
            return null;
        }

        var isSubmitDisabled = true;

        return <Grid>
            <SubmissionDetails
                problem={this.props.problem}
                sourceCode={this.props.sourceCode}
                onRun={this.props.onRun}
                onSubmit={this.props.onSubmit}
                isSubmitDisabled={isSubmitDisabled}
                onSourceCodeChanged={this.props.onSourceCodeChanged}
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
        userAuthSession: state.userAuthSession
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onRun: (sourceCode, problemId) => {
            dispatch(showModal("Submission in progress"));
            dispatch(judgeCode(sourceCode, problemId));
        },
        onSubmit: (sourceCode, problemId) => {
            dispatch(showModal("Submission in progress"));
            dispatch(judgeCode(sourceCode, problemId));
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