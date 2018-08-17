import React from 'react';
import {Grid} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as _ from 'lodash';
import {Transition, TransitionGroup} from 'react-transition-group';

import Problem from '../components/Problem';
import ProblemsFilter from '../components/ProblemsFilter';
import {setProblemsDifficultyVisibilityFilter, hideDoneProblems} from "../actions/index";
import {fetchSolvedProblemsRatio} from "../../ranking/actions/index";
import {Submission} from "../../submissions/domain/Submission";
import NumberOfProblems from "../components/NumberOfProblems";

class Problems extends React.Component {

    constructor(props) {
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

                let acceptedSubmissions = _.filter(submissions,
                    (submission: Submission) => submission.statusCode === 'ACCEPTED'
                );
                let failedSubmissions = _.filter(submissions,
                    (submission: Submission) => submission.statusCode !== 'ACCEPTED'
                );

                let submittedAcceptedProblems = _.map(acceptedSubmissions, (submission) => submission.problemId);
                let submittedFailedProblems = _.map(failedSubmissions, (submission) => submission.problemId);

                const isSuccess = _.includes(submittedAcceptedProblems, problem.id);
                const isFailure = _.includes(submittedFailedProblems, problem.id);

                if (hideDoneProblems && isSuccess) return null;
                if (problemsFilter !== 0 && problem.level !== problemsFilter) return null;

                return <Transition in timeout={duration} key={idx}>
                    {(state) => (
                        <div style={{
                            ...defaultStyle,
                            ...transitionStyles[state]
                        }}><Problem
                    title={problem.title}
                    level={problem.level}
                    solvedBy={problem.solutionsCount}
                    id={problem.id}
                    key={idx}
                    submissions={submissions}
                    isSuccess={isSuccess}
                    isFailure={isFailure}
                        /></div>)}
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
                easy={_.filter(problems, problem => problem.level === 1).length}
                medium={_.filter(problems, problem => problem.level === 2).length}
                hard={_.filter(problems, problem => problem.level === 3).length}
            />
        </Grid>;
    }
}

const mapStateToProps = (state) => {

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
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: () => {
            dispatch(fetchSolvedProblemsRatio());
        },
        changeFilter: (level) => {
            dispatch(setProblemsDifficultyVisibilityFilter(level));
        },
        onHideDoneProblems: (value) => {
            dispatch(hideDoneProblems(value));
        }
    }
};

const ProblemsPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(Problems);

export {ProblemsPage};