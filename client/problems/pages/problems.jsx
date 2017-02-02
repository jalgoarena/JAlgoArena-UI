import React from 'react';
import {Grid} from 'react-bootstrap';
import {connect} from 'react-redux';
import _ from 'lodash';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Problem from '../components/Problem';
import ProblemsFilter from '../components/ProblemsFilter';
import {setProblemsDifficultyVisibilityFilter, hideDoneProblems} from "../actions/index";
import {fetchSolvedProblemsRatio} from "../../submissions/actions/index";

class Problems extends React.Component {

    componentDidMount() {
        this.props.onLoad();
    }

    render() {
        let problems = this.props.problems || [];

        let problemNodes = problems
            .filter(problem =>
                this.props.problemsFilter === 0 ||
                problem.level === this.props.problemsFilter
            )
            .map((problem, idx) => {

                let submittedProblems = _.map(this.props.submissions, (submission) => submission.problemId);

                const isDone = _.includes(submittedProblems, problem.id);

                if (this.props.hideDoneProblems && isDone) return null;

                let solvedProblemRatio = this.props.problemsSolutionsRatio.find(ratio => ratio.problemId == problem.id);

                if (!solvedProblemRatio) {
                    solvedProblemRatio = {solutionsCount: 0};
                }

                return <Problem
                    title={problem.title}
                    level={problem.level}
                    solvedBy={solvedProblemRatio.solutionsCount}
                    id={problem.id}
                    key={idx}
                    submissions={this.props.submissions}
                    isDone={isDone}
                />;
        });

        return <Grid>
            <ProblemsFilter
                changeFilter={this.props.changeFilter}
                filter={this.props.problemsFilter}
                onHideDoneProblems={this.props.onHideDoneProblems}
                hideDoneProblems={this.props.hideDoneProblems}
            />
            <ReactCSSTransitionGroup transitionName="problems-filter" transitionEnterTimeout={600} transitionLeaveTimeout={600}>
                {problemNodes}
            </ReactCSSTransitionGroup>
        </Grid>;
    }
}

const mapStateToProps = (state) => {
    return {
        problems: state.problems.items,
        submissions: state.submissions.items,
        problemsFilter: state.problems.difficultyFilter,
        hideDoneProblems: state.problems.doneProblemsFilter,
        problemsSolutionsRatio: state.submissions.problemsSolutionsRatio
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

export default ProblemsPage;