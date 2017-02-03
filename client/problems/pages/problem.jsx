import React from 'react';
import {Grid, Button, Row, ButtonGroup} from 'react-bootstrap';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';
import _ from 'lodash';

import store from '../../common/store';
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
        if (!this.props.auth.user) {
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
        if (this.props.auth.user) {
            store.dispatch(fetchSubmissions(this.props.auth.user.id));
        }
    }

    isAlreadySolved() {
        return this.props.problem &&
                this.props.editor.judgeResult.statusCode === 'ACCEPTED' &&
                this.props.editor.sourceCode &&
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

    showPointsLegend() {
        this.setState({showPointsLegend: true});
    }

    hidePointsLegend() {
        this.setState({showPointsLegend: false});
    }

    sourceCodeButton(skeletonCode, customType, onClick) {
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

        let skeletonCode = this.props.problem.skeletonCode[this.props.programmingLanguage];

        let programmingLanguages = [];
        for (let language in this.props.problem.skeletonCode) {
            programmingLanguages.push(language);
        }

        let programmingLanguageButtons = programmingLanguages.map(programmingLanguage => {
            return <Button
                bsStyle="primary"
                onClick={() => this.props.onLanguageChange(programmingLanguage)}
                active={this.props.programmingLanguage === programmingLanguage}>
                    {_.capitalize(programmingLanguage)}
            </Button>
        });

        return <Grid>
            <Row>
                <ProblemTitle submissions={this.props.submissions} problem={this.props.problem} />
                <ProblemDescription description={this.props.problem.description} />
                <ProblemToolbar
                    problem={this.props.problem}
                    onRefresh={this.props.onRefresh}
                    onShowPointsLegend={this.showPointsLegend.bind(this)}
                    activeLanguage={this.props.programmingLanguage}
                >
                    <ButtonGroup>
                        {programmingLanguageButtons}
                    </ButtonGroup>
                    {this.sourceCodeButton(skeletonCode, 'ListNode', () => this.showListNodeSourceCode())}
                    {this.sourceCodeButton(skeletonCode, 'TreeNode', () => this.showTreeNodeSourceCode())}
                    {this.sourceCodeButton(skeletonCode, 'Interval', () => this.showIntervalSourceCode())}
                </ProblemToolbar>
                <AceCodeEditor
                    sourceCode={this.props.editor.sourceCode || skeletonCode}
                    onSourceCodeChanged={this.props.onSourceCodeChanged}
                />
                <SubmissionPanel
                    problem={this.props.problem}
                    userId={userId}
                    sourceCode={this.props.editor.sourceCode || skeletonCode}
                    onRun={this.props.onRun}
                    isAlreadySolved={this.isAlreadySolved()}
                    activeLanguage={this.props.programmingLanguage}
                />
            </Row>
            <Output result={this.props.editor.judgeResult}/>
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
        </Grid>;
    }
}

const mapStateToProps = (state) => {
    let currentProblemId = state.problems.currentProblemId;

    const problem = currentProblemId
        ? state.problems.items.find((problem) => problem.id === currentProblemId)
        : null;

    let programmingLanguage = state.editor.programmingLanguage;

    return {
        problem,
        editor: state.editor,
        auth: state.auth,
        submissions: state.submissions.items,
        programmingLanguage
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onRun: (sourceCode, problemId, userId, language) => {
            dispatch(startJudge());
            dispatch(judgeCode(sourceCode, problemId, userId, language));
        },
        onSourceCodeChanged: (sourceCode) => {
            dispatch(changeSourceCode(sourceCode))
        },
        onRefresh: () => {
            dispatch(problemRefresh());
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