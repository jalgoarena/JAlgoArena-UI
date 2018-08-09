import React from 'react';
import {Grid, Button, Row} from 'react-bootstrap';
import {connect} from 'react-redux';

import {store} from '../../common/store';
import {fetchSubmissions} from "../../submissions/actions";

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
import {problemRefresh} from "../actions/index";
import ProblemRank from '../components/ProblemRank'
import GraphNodeSourceCode from "../components/GraphNodeSourceCode";
import WeightedGraphSourceCode from "../components/WeightedGraphSourceCode";
import PairSourceCode from "../components/PairSourceCode";
import {setErrorMessage} from "../../common/actions";
import {fetchProblemRanking} from "../../ranking/actions";

class Problem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showListNodeSourceCode: false,
            showTreeNodeSourceCode: false,
            showIntervalSourceCode: false,
            showGraphNodeSourceCode: false,
            showWeightedGraphSourceCode: false,
            showPairSourceCode: false,
            showPointsLegend: false,
            showProblemRanking: false
        }
    }

    componentDidMount() {
        let problemId = this.props.match.params.id;

        if (store.getState().currentProblemId !== problemId) {
            store.dispatch(setCurrentProblem(problemId));
        }

        this.props.onLoad(problemId);

        if (this.props.auth.user && localStorage) {
            Problem.restoreSourceCode(problemId);
            let token = localStorage.getItem('jwtToken');

            if (!token || token === '' ) {
                return null;
            }

            store.dispatch(fetchSubmissions(this.props.auth.user.id, token));
        }
    }

    static restoreSourceCode(problemId) {
        let savedSourceCode = localStorage.getItem(`problem-${problemId}`);

        if (savedSourceCode) {
            store.dispatch(changeSourceCode(savedSourceCode));
        }
    }

    isAlreadySolved() {
        return this.props.problem &&
            this.props.editor.submissionId !== null &&
            this.props.auth.user
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

    showGraphNodeSourceCode() {
        this.setState({showGraphNodeSourceCode: true});
    }

    hideGraphNodeSourceCode() {
        this.setState({showGraphNodeSourceCode: false});
    }

    showWeightedGraphSourceCode() {
        this.setState({showWeightedGraphSourceCode: true});
    }

    hideWeightedGraphSourceCode() {
        this.setState({showWeightedGraphSourceCode: false});
    }

    showPairSourceCode() {
        this.setState({showPairSourceCode: true});
    }

    hidePairSourceCode() {
        this.setState({showPairSourceCode: false});
    }

    showPointsLegend() {
        this.setState({showPointsLegend: true});
    }

    hidePointsLegend() {
        this.setState({showPointsLegend: false});
    }

    showProblemRanking() {
        this.setState({showProblemRanking: true});
    }

    hideProblemRanking() {
        this.setState({showProblemRanking: false});
    }

    static sourceCodeButton(skeletonCode, customType, onClick) {
        if (skeletonCode && skeletonCode.includes(customType)) {
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

        const userId = this.props.auth.user ? this.props.auth.user.id : null;

        let skeletonCode = this.props.problem.skeletonCode;
        let savedSourceCode = localStorage.getItem(`problem-${this.props.problem.id}`);

        return <Grid>
            <Row>
                <ProblemTitle
                    submissions={this.props.submissions}
                    problem={this.props.problem}
                    onShowProblemRanking={this.showProblemRanking.bind(this)}
                    onHideProblemRanking={this.hideProblemRanking.bind(this)}
                />
                <ProblemDescription description={this.props.problem.description}/>
                <ProblemToolbar
                    problem={this.props.problem}
                    onRefresh={this.props.onRefresh}
                    onShowPointsLegend={this.showPointsLegend.bind(this)}
                >
                    {Problem.sourceCodeButton(skeletonCode, 'ListNode', () => this.showListNodeSourceCode())}
                    {Problem.sourceCodeButton(skeletonCode, 'TreeNode', () => this.showTreeNodeSourceCode())}
                    {Problem.sourceCodeButton(skeletonCode, 'Interval', () => this.showIntervalSourceCode())}
                    {Problem.sourceCodeButton(skeletonCode, 'GraphNode', () => this.showGraphNodeSourceCode())}
                    {Problem.sourceCodeButton(skeletonCode, 'WeightedGraph', () => this.showWeightedGraphSourceCode())}
                    {Problem.sourceCodeButton(skeletonCode, 'Pair', () => this.showPairSourceCode())}
                </ProblemToolbar>
                <AceCodeEditor
                    sourceCode={this.props.editor.sourceCode || skeletonCode}
                    onSourceCodeChanged={this.props.onSourceCodeChanged}
                    readOnly={this.props.auth.user == null}
                />
                <SubmissionPanel
                    problem={this.props.problem}
                    userId={userId}
                    sourceCode={this.props.editor.sourceCode || skeletonCode}
                    savedSourceCode={savedSourceCode}
                    onRun={this.props.onRun}
                    onSave={this.props.onSave}
                    isAlreadySolved={this.isAlreadySolved()}
                />
            </Row>
            <Output submissionId={this.props.editor.submissionId}/>
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
            <GraphNodeSourceCode
                show={this.state.showGraphNodeSourceCode}
                onHide={this.hideGraphNodeSourceCode.bind(this)}
            />
            <WeightedGraphSourceCode
                show={this.state.showWeightedGraphSourceCode}
                onHide={this.hideWeightedGraphSourceCode.bind(this)}
            />
            <PairSourceCode
                show={this.state.showPairSourceCode}
                onHide={this.hidePairSourceCode.bind(this)}
            />
            <PointsLegend
                show={this.state.showPointsLegend}
                onHide={this.hidePointsLegend.bind(this)}
            />
            <ProblemRank
                problemRanking={this.props.problemRanking}
                problemId={this.props.currentProblemId}
                show={this.state.showProblemRanking}
                onHide={this.hideProblemRanking.bind(this)}
            />
        </Grid>;
    }
}

const mapStateToProps = (state) => {
    let currentProblemId = state.problems.currentProblemId;

    const problem = currentProblemId
        ? state.problems.items.find((problem) => problem.id === currentProblemId)
        : null;

    return {
        problem,
        problemRanking: state.ranking.problemRanking,
        editor: state.editor,
        auth: state.auth,
        submissions: state.submissions.items
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onRun: (sourceCode, problemId, userId) => {
            let token = localStorage.getItem('jwtToken');

            if (token == null || token === "") {
                dispatch(setErrorMessage("You have to be logged in"));
            } else {
                dispatch(startJudge());
                dispatch(judgeCode(sourceCode, problemId, userId, token));
            }
        },
        onSave: (sourceCode, problemId) => {
            if (localStorage) {
                localStorage.setItem(`problem-${problemId}`, sourceCode);
                dispatch(changeSourceCode(sourceCode));
            }
        },
        onSourceCodeChanged: (sourceCode) => {
            dispatch(changeSourceCode(sourceCode));
        },
        onRefresh: () => {
            dispatch(problemRefresh());
        },
        onLoad: (problemId) => {
            dispatch(fetchProblemRanking(problemId));
        }
    }
};

const ProblemPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(Problem);

export {ProblemPage};