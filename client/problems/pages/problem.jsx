import React from 'react';
import {Grid, Button, Row} from 'react-bootstrap';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';

import WorkInProgress from '../../common/components/WorkInProgress';
import store from '../../common/store';
import {sendSubmission, fetchSubmissions, startSubmission} from "../../submissions/actions";
import {closeWorkInProgressWindow} from "../../common/actions";

import Output from '../components/Output';
import ProblemToolbar from '../components/ProblemToolbar';
import ProblemTitle from '../components/ProblemTitle';
import ProblemDescription from '../components/ProblemDescription';
import PointsLegend from '../components/PointsLegend';
import AceCodeEditor from '../components/AceCodeEditor';
import SubmissionPanel from '../components/SubmissionPanel';
import ListNodeSourceCode from '../components/ListNodeSourceCode';
import TreeNodeSourceCode from '../components/TreeNodeSourceCode';
import IntervalSourceCode from '../components/IntervalSourceCode';
import {startJudge, setCurrentProblem, judgeCode, changeSourceCode} from '../actions';
import {problemRefresh, changeCurrentProgrammingLanguage} from "../actions/index";

class Problem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showListNodeSourceCode: false,
            showTreeNodeSourceCode: false,
            showIntervalSourceCode: false,
            showPointsLegend: false
        }
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
                this.props.result.statusCode === 'ACCEPTED' &&
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

    showIntervalSourceCode() {
        this.setState({showIntervalSourceCode: true});
    }

    hideIntervalSourceCode() {
        this.setState({showIntervalSourceCode: false});
    }

    showPointsLegend() {
        this.setState({showPointsLegend: true});
    }

    hidePointsLegend() {
        this.setState({showPointsLegend: false});
    }

    sourceCodeButton(skeletonCode, customType, onClick) {
        if (skeletonCode.includes(customType)) {
            return <Button
                bsStyle="success"
                onClick={onClick}
            >{customType}</Button>;
        }

        return null;
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
                    {this.sourceCodeButton(skeletonCode, 'ListNode', () => this.showListNodeSourceCode())}
                    {this.sourceCodeButton(skeletonCode, 'TreeNode', () => this.showTreeNodeSourceCode())}
                    {this.sourceCodeButton(skeletonCode, 'Interval', () => this.showIntervalSourceCode())}
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
                    activeLanguage={this.props.programmingLanguage}
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
            <IntervalSourceCode
                show={this.state.showIntervalSourceCode}
                onHide={this.hideIntervalSourceCode.bind(this)}
            />
            <PointsLegend
                show={this.state.showPointsLegend}
                onHide={this.hidePointsLegend.bind(this)}
            />
            <WorkInProgress showModal={this.props.showModal} onHide={this.props.onHide}/>
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
        onSubmit: (result, userId, problem, activeLanguage) => {
            dispatch(startSubmission());
            dispatch(sendSubmission(result, userId, problem, activeLanguage));
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
            dispatch(changeCurrentProgrammingLanguage(language));
        }
    }
};

const ProblemPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(Problem);

export default ProblemPage;