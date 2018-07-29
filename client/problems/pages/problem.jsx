import React from 'react';
import {Grid, Button, Row} from 'react-bootstrap';
import {connect} from 'react-redux';

import {store} from '../../common/store';
import {fetchSubmissions, fetchSubmissionStats} from "../../submissions/actions";

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
            showProblemRanking: false,
        }
    }

    componentDidMount() {
        if (store.getState().currentProblemId !== this.props.match.params.id) {
            store.dispatch(setCurrentProblem(this.props.match.params.id));
        }
        if (this.props.auth.user) {
            let token = localStorage.getItem('jwtToken');

            if (!token || token === '' ) {
                return null;
            }

            store.dispatch(fetchSubmissions(this.props.auth.user.id, token));
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
                    onRun={this.props.onRun}
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
                problemId={this.props.problem.id}
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
                dispatch(fetchSubmissionStats());
            }
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

export {ProblemPage};