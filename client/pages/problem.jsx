import React from 'react';
import {Grid} from 'react-bootstrap';
import {connect} from 'react-redux';

import Output from '../components/Output';
import WorkInProgress from '../components/WorkInProgress';
import SubmissionDetails from '../components/SubmissionDetails';
import LinkedListNodeSourceCode from '../components/LinkedListNodeSourceCode';
import store from '../store';
import {startJudge, startSubmission, sendSubmission, setCurrentProblem, judgeCode, changeSourceCode} from '../actions';
import {problemRefresh} from "../actions/index";

class Problem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showLinkedListNodeSourceCode: false}
    }
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

    showLinkedListNodeSourceCode() {
        this.setState({showLinkedListNodeSourceCode: true});
    }

    hideLinkedListNodeSourceCode() {
        this.setState({showLinkedListNodeSourceCode: false});
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
                sourceCode={this.props.sourceCode || this.props.problem.skeleton_code}
                isSubmitDisabled={isSubmitDisabled}
                onRun={this.props.onRun}
                onSubmit={this.props.onSubmit}
                userId={userId}
                onSourceCodeChanged={this.props.onSourceCodeChanged}
                submissions={this.props.submissions}
                onShowLinkedListNodeSourceCode={this.showLinkedListNodeSourceCode.bind(this)}
                onRefresh={this.props.onRefresh}
            />
            <Output result={this.props.result}/>
            <LinkedListNodeSourceCode
                show={this.state.showLinkedListNodeSourceCode}
                onHide={this.hideLinkedListNodeSourceCode.bind(this)}
            />
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
        onSubmit: (result, userId, problem) => {
            dispatch(startSubmission());
            dispatch(sendSubmission(result, userId, problem));
        },
        onSourceCodeChanged: (sourceCode) => {
            dispatch(changeSourceCode(sourceCode))
        },
        onRefresh: () => {
            dispatch(problemRefresh());
        }
    }
};

const ProblemPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(Problem);

export default ProblemPage;