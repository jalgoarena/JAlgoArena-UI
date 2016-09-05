import React from 'react';
import {Grid, Button, Row} from 'react-bootstrap';
import {connect} from 'react-redux';

import Output from '../components/Output';
import WorkInProgress from '../components/WorkInProgress';
import ProblemToolbar from '../components/ProblemToolbar';
import ProblemTitle from '../components/ProblemTitle';
import ProblemDescription from '../components/ProblemDescription';
import PointsLegend from '../components/PointsLegend';
import AceCodeEditor from '../components/AceCodeEditor';
import SubmissionPanel from '../components/SubmissionPanel';
import LinkedListNodeSourceCode from '../components/LinkedListNodeSourceCode';
import store from '../store';
import {startJudge, startSubmission, sendSubmission, setCurrentProblem, judgeCode, changeSourceCode} from '../actions';
import {problemRefresh} from "../actions/index";

class Problem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showLinkedListNodeSourceCode: false, showPointsLegend: false}
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

    showPointsLegend() {
        this.setState({showPointsLegend: true});
    }

    hidePointsLegend() {
        this.setState({showPointsLegend: false});
    }

    render() {
        if (!this.props.problem) {
            return null;
        }

        const isSubmitDisabled = this.isSubmitDisabled();
        const userId = this.props.userAuthSession.user ? this.props.userAuthSession.user.id : null;

        let linkedListNodeButton = null;
        if (this.props.problem.skeleton_code.includes('LinkedListNode')) {
            linkedListNodeButton = <Button
                bsStyle="primary"
                onClick={this.showLinkedListNodeSourceCode.bind(this)}
            >LinkedListNode</Button>;
        }

        return <Grid>
            <Row>
                <ProblemTitle submissions={this.props.submissions} problem={this.props.problem} />
                <ProblemDescription description={this.props.problem.description} />
                <ProblemToolbar
                    problem={this.props.problem}
                    onRefresh={this.props.onRefresh}
                    onShowPointsLegend={this.showPointsLegend.bind(this)}
                >
                    {linkedListNodeButton}
                </ProblemToolbar>
                <AceCodeEditor
                    sourceCode={this.props.sourceCode || this.props.problem.skeleton_code}
                    onSourceCodeChanged={this.props.onSourceCodeChanged}
                />
                <SubmissionPanel
                    problem={this.props.problem}
                    userId={userId}
                    result={this.props.result}
                    sourceCode={this.props.sourceCode || this.props.problem.skeleton_code}
                    onRun={this.props.onRun}
                    onSubmit={this.props.onSubmit}
                    isSubmitDisabled={isSubmitDisabled}
                />
            </Row>
            <Output result={this.props.result}/>
            <LinkedListNodeSourceCode
                show={this.state.showLinkedListNodeSourceCode}
                onHide={this.hideLinkedListNodeSourceCode.bind(this)}
            />
            <PointsLegend
                show={this.state.showPointsLegend}
                onHide={this.hidePointsLegend.bind(this)}
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