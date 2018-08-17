import * as React from 'react';
import {Grid, Button, Row} from 'react-bootstrap';
import {connect} from 'react-redux';

import {store} from '../../common';
import {fetchSubmissions} from "../../submissions/actions";

import Output from '../components/Output';
import ProblemToolbar from '../components/ProblemToolbar';
import ProblemTitle from '../components/ProblemTitle';
import ProblemDescription from '../components/ProblemDescription';
import PointsLegend from '../components/PointsLegend';
import AceCodeEditor from '../components/AceCodeEditor';
import SubmissionPanel from '../components/SubmissionPanel';
import {startJudge, setCurrentProblem, judgeCode, changeSourceCode, problemRefresh} from '../actions';
import ProblemRank from '../components/ProblemRank'
import {ListNodeSourceCode, TreeNodeSourceCode, IntervalSourceCode, PairSourceCode, GraphNodeSourceCode, WeightedGraphSourceCode} from "../components/SourceCode";
import {setErrorMessage} from "../../common/actions";
import {fetchProblemRanking} from "../../ranking/actions";
import {User} from "../../users/domain/User";
import Problem from "../domain/Problem";
import {Submission} from "../domain/Submission";
import {RouteComponentProps} from "react-router";

interface MatchParams {
    id: string
}

interface ProblemProps extends RouteComponentProps<MatchParams>{
    user: User
    problem: Problem
    submissions: Array<Submission>
    editor: {submissionId: string, sourceCode: string}
    onLoad: (problemId: string) => void
    onRefresh: () => void
    onSourceCodeChanged: (sourceCode: string) => void
}

interface ProblemState {
    showListNodeSourceCode: boolean
    showTreeNodeSourceCode: boolean
    showIntervalSourceCode: boolean
    showGraphNodeSourceCode: boolean
    showWeightedGraphSourceCode: boolean
    showPairSourceCode: boolean
    showPointsLegend: boolean
    showProblemRanking: boolean
}

class ProblemPage extends React.Component<ProblemProps, ProblemState> {
    constructor(props: ProblemProps) {
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

        if (this.props.user && localStorage) {
            ProblemPage.restoreSourceCode(problemId);
            let token = localStorage.getItem('jwtToken');

            if (!token || token === '' ) {
                return null;
            }

            store.dispatch<any>(fetchSubmissions(this.props.user.id, token));
        }
    }

    static restoreSourceCode(problemId: string) {
        let savedSourceCode = localStorage.getItem(`problem-${problemId}`);

        if (savedSourceCode) {
            store.dispatch(changeSourceCode(savedSourceCode));
        }
    }

    isAlreadySolved() {
        return this.props.problem &&
            this.props.editor.submissionId !== null &&
            this.props.user
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

    static sourceCodeButton(skeletonCode: string, customType:string, onClick: () => void) {
        if (skeletonCode && skeletonCode.indexOf(customType) !== -1) {
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

        const userId = this.props.user ? this.props.user.id : null;

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
                    {ProblemPage.sourceCodeButton(skeletonCode, 'ListNode', () => this.showListNodeSourceCode())}
                    {ProblemPage.sourceCodeButton(skeletonCode, 'TreeNode', () => this.showTreeNodeSourceCode())}
                    {ProblemPage.sourceCodeButton(skeletonCode, 'Interval', () => this.showIntervalSourceCode())}
                    {ProblemPage.sourceCodeButton(skeletonCode, 'GraphNode', () => this.showGraphNodeSourceCode())}
                    {ProblemPage.sourceCodeButton(skeletonCode, 'WeightedGraph', () => this.showWeightedGraphSourceCode())}
                    {ProblemPage.sourceCodeButton(skeletonCode, 'Pair', () => this.showPairSourceCode())}
                </ProblemToolbar>
                <AceCodeEditor
                    sourceCode={this.props.editor.sourceCode || savedSourceCode || skeletonCode}
                    onSourceCodeChanged={this.props.onSourceCodeChanged}
                    readOnly={this.props.user == null}
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
            <Output
                userId={userId}
                submissionId={this.props.editor.submissionId}
            />
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
        user: state.auth.user,
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
                localStorage.setItem(`problem-${problemId}`, sourceCode);
                dispatch(startJudge());
                dispatch(judgeCode(sourceCode, problemId, userId, token));
            }
        },
        onSave: (sourceCode, problemId) => {
            localStorage.setItem(`problem-${problemId}`, sourceCode);
            dispatch(changeSourceCode(sourceCode));
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

const EnhancedProblemPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProblemPage);

export {EnhancedProblemPage};
