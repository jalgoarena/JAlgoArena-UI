import * as React from 'react';
import {Grid} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as _ from 'lodash';
import {Transition, TransitionGroup} from 'react-transition-group';

import ProblemDetails from '../components/ProblemDetails';
import ProblemsFilter from '../components/ProblemsFilter';
import {setProblemsDifficultyVisibilityFilter, hideDoneProblems} from "../actions";
import {fetchSolvedProblemsRatio} from "../../ranking/actions";
import {Submission} from "../../submissions/domain/Submission";
import NumberOfProblems from "../components/NumberOfProblems";
import {AppState} from "../../common/reducers";
import Problem from "../domain/Problem";
import {Dispatch} from "redux";

interface ExtendedProblem extends Problem {
    solutionsCount: number
}

interface ProblemPropsFromState {
    problems: Array<ExtendedProblem>
    submissions: Array<Submission>
    problemsFilter: number
    hideDoneProblems: boolean
}

interface ProblemsProps extends ProblemPropsFromState {
    onLoad: () => void
    changeFilter: (level: number) => void
    onHideDoneProblems: (value: boolean) => void
}

interface ProblemsState {
    showNumberOfProblems: boolean
}

class Problems extends React.Component<ProblemsProps, ProblemsState> {

    constructor(props: ProblemsProps) {
        super(props);
        this.state = {
            showNumberOfProblems: false
        }
    }

    componentDidMount() {
        this.props.onLoad();
    }

    showNumberOfProblems() {
        this.setState({showNumberOfProblems: true});
    }

    hideNumberOfProblems() {
        this.setState({showNumberOfProblems: false});
    }

    render() {
        const {
            problems,
            problemsFilter,
            submissions,
            hideDoneProblems,
            changeFilter,
            onHideDoneProblems
        } = this.props;

        const duration = 300;
        const defaultStyle = {
            transition: `opacity ${duration}ms ease-in`,
            opacity: 0,
        };

        const transitionStyles = {
            entering: { opacity: 0 },
            entered:  { opacity: 1 },
        };

        let problemNodes = _.orderBy(problems, ['solutionsCount'], ['desc'])
            .map((problem, idx) => {

                let acceptedSubmissions = submissions.filter(
                    (submission: Submission) => submission.statusCode === 'ACCEPTED'
                );
                let failedSubmissions = submissions.filter(
                    (submission: Submission) => submission.statusCode !== 'ACCEPTED'
                );

                let submittedAcceptedProblems = acceptedSubmissions.map((submission) => submission.problemId);
                let submittedFailedProblems = failedSubmissions.map((submission) => submission.problemId);

                const isSuccess = submittedAcceptedProblems.indexOf(problem.id) !== -1;
                const isFailure = submittedFailedProblems.indexOf(problem.id) !== -1;

                if (hideDoneProblems && isSuccess)
                    return null;
                if (problemsFilter !== 0 && problem.level !== problemsFilter)
                    return null;

                return <Transition in timeout={duration} key={idx}>
                    {(state) => {
                        let transitionStyle = state === 'entering' ? transitionStyles.entering : transitionStyles.entered;
                        return (
                            <div style={{
                                ...defaultStyle,
                                ...transitionStyle
                            }}><ProblemDetails
                                title={problem.title}
                                level={problem.level}
                                solvedBy={problem.solutionsCount}
                                id={problem.id}
                                key={idx}
                                isSuccess={isSuccess}
                                isFailure={isFailure}
                            /></div>);
                    }}
                </Transition>;
        });

        return <Grid>
            <ProblemsFilter
                changeFilter={changeFilter}
                filter={problemsFilter}
                onHideDoneProblems={onHideDoneProblems}
                hideDoneProblems={hideDoneProblems}
                problemsCount={problemNodes.length}
                onShowNumberOfProblems={() => this.showNumberOfProblems()}
            />
            <TransitionGroup>
                {problemNodes}
            </TransitionGroup>
            <NumberOfProblems
                show={this.state.showNumberOfProblems}
                onHide={this.hideNumberOfProblems.bind(this)}
                easy={problems.filter(problem => problem.level === 1).length}
                medium={problems.filter(problem => problem.level === 2).length}
                hard={problems.filter(problem => problem.level === 3).length}
            />
        </Grid>;
    }
}

const mapStateToProps = (state: AppState) => {

    let problems = state.problems.items || [];

    problems = problems.map(problem => {
        let solvedProblemRatio = state.submissions.problemsSolutionsRatio.find(
            ratio => ratio.problemId === problem.id
        );
        return Object.assign({}, problem, {
            solutionsCount: solvedProblemRatio && solvedProblemRatio.solutionsCount || 0})
    });

    return {
        problems,
        submissions: state.submissions.items,
        problemsFilter: state.problems.difficultyFilter,
        hideDoneProblems: state.problems.doneProblemsFilter
    } as ProblemPropsFromState
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        onLoad: () => {
            dispatch<any>(fetchSolvedProblemsRatio());
        },
        changeFilter: (level: number) => {
            dispatch(setProblemsDifficultyVisibilityFilter(level));
        },
        onHideDoneProblems: (value: boolean) => {
            dispatch(hideDoneProblems(value));
        }
    }
};

const ProblemsPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(Problems);

export {ProblemsPage};