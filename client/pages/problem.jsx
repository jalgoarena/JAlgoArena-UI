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
import ListNodeSourceCode from '../components/ListNodeSourceCode';
import TreeNodeSourceCode from '../components/TreeNodeSourceCode';
import store from '../store';
import {startJudge, startSubmission, sendSubmission, setCurrentProblem, judgeCode, changeSourceCode} from '../actions';
import {problemRefresh, fetchSubmissions, changeActualLanguage} from "../actions/index";
import {hashHistory} from 'react-router';
import {closeWorkInProgressWindow} from "../actions/index";

class Problem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showListNodeSourceCode: false, showTreeNodeSourceCode: false, showPointsLegend: false}
    }

    transferToLoginIfLoggedOut() {
        if (!this.props.userAuthSession.user) {
            hashHistory.push('/login');
        }
    }

    componentWillMount() {
        this.transferToLoginIfLoggedOut();
    }

    componentDidMount() {
        this.transferToLoginIfLoggedOut();
        if (store.getState().currentProblemId !== this.props.params.id) {
            store.dispatch(setCurrentProblem(this.props.params.id));
        }
        if (this.props.userAuthSession.user) {
            store.dispatch(fetchSubmissions(this.props.userAuthSession.user.id));
        }
    }

    isSubmitDisabled() {
        return !(this.props.problem &&
                this.props.result.status_code === 'ACCEPTED' &&
                this.props.sourceCode &&
                this.props.userAuthSession.user)
    }

    showListNodeSourceCode() {
        this.setState({showListNodeSourceCode: true});
    }

    hideListNodeSourceCode() {
        this.setState({showListNodeSourceCode: false});
    }

    showTreeNodeSourceCode() {
        this.setState({showTreeNodeSourceCode: true});
    }

    hideTreeNodeSourceCode() {
        this.setState({showTreeNodeSourceCode: false});
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

        let skeletonCode = this.props.programmingLanguage === 'java'
            ? this.props.problem.skeletonCode
            : this.props.problem.kotlinSkeletonCode;

        return <Grid>
            <Row>
                <ProblemTitle submissions={this.props.submissions} problem={this.props.problem} />
                <ProblemDescription description={this.props.problem.description} />
                <ProblemToolbar
                    problem={this.props.problem}
                    onRefresh={this.props.onRefresh}
                    onShowPointsLegend={this.showPointsLegend.bind(this)}
                    onLanguageChange={this.props.onLanguageChange}
                    activeLanguage={this.props.programmingLanguage}
                >
                    {this.listNodeButton(skeletonCode)}
                    {this.treeNodeButton(skeletonCode)}
                </ProblemToolbar>
                <AceCodeEditor
                    sourceCode={this.props.sourceCode || skeletonCode}
                    onSourceCodeChanged={this.props.onSourceCodeChanged}
                />
                <SubmissionPanel
                    problem={this.props.problem}
                    userId={userId}
                    result={this.props.result}
                    sourceCode={this.props.sourceCode || skeletonCode}
                    onRun={this.props.onRun}
                    onSubmit={this.props.onSubmit}
                    isSubmitDisabled={isSubmitDisabled}
                />
            </Row>
            <Output result={this.props.result}/>
            <ListNodeSourceCode
                show={this.state.showListNodeSourceCode}
                onHide={this.hideListNodeSourceCode.bind(this)}
            />
            <TreeNodeSourceCode
                show={this.state.showTreeNodeSourceCode}
                onHide={this.hideTreeNodeSourceCode.bind(this)}
            />
            <PointsLegend
                show={this.state.showPointsLegend}
                onHide={this.hidePointsLegend.bind(this)}
            />
            <WorkInProgress showModal={this.props.showModal} onHide={this.props.onHide}/>
        </Grid>;
    }

    listNodeButton(skeletonCode) {
        if (skeletonCode.includes('ListNode')) {
            return <Button
                bsStyle="primary"
                onClick={this.showListNodeSourceCode.bind(this)}
            >ListNode</Button>;
        }

        return null;
    }

    treeNodeButton(skeletonCode) {
        if (skeletonCode.includes('TreeNode')) {
            return <Button
                bsStyle="primary"
                onClick={this.showTreeNodeSourceCode.bind(this)}
            >TreeNode</Button>;
        }

        return null;
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
        submissions: state.submissions,
        programmingLanguage: state.programmingLanguage
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
        },
        onHide: () => {
            dispatch(closeWorkInProgressWindow());
        },
        onLanguageChange: (language) => {
            dispatch(changeActualLanguage(language));
        }
    }
};

const ProblemPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(Problem);

export default ProblemPage;