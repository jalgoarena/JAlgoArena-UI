import React from 'react';
import {Grid} from 'react-bootstrap';
import {connect} from 'react-redux';
import _ from 'lodash';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Problem from '../components/Problem';
import WorkInProgress from "../../common/components/WorkInProgress";
import ProblemsFilter from '../components/ProblemsFilter';
import {setProblemsDifficultyVisibilityFilter, hideDoneProblems} from "../actions/index";
import {closeWorkInProgressWindow} from "../../common/actions/index";
import {fetchSolvedProblemsRatio} from "../../submissions/actions/index";
import {fetchUsers} from "../../users/actions/index";

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

                let solvedProblemRatio = this.props.solvedProblemsRatio.find(ratio => ratio.problemId == problem.id);
                let users = this.props.auth.users || [];
                let usersCount = users.length;

                if (!solvedProblemRatio) {
                    solvedProblemRatio = {solutionsCount: 0};
                }

                let solvedBy = parseInt((solvedProblemRatio.solutionsCount / usersCount) * 100);

                return <Problem
                    title={problem.title}
                    level={problem.level}
                    solvedBy={solvedBy}
                    id={problem.id}
                    key={idx}
                    submissions={this.props.submissions}
                    isDone={isDone}
                />;
        });

        return <Grid>
            <WorkInProgress showModal={this.props.showModal} onHide={this.props.onHide}/>
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
        showModal: state.showModal,
        submissions: state.submissions,
        problemsFilter: state.problems.difficultyFilter,
        hideDoneProblems: state.problems.doneProblemsFilter,
        solvedProblemsRatio: state.solvedProblemsRatio,
        auth: state.auth
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: () => {
            dispatch(fetchSolvedProblemsRatio());
            dispatch(fetchUsers());
        },
        changeFilter: (level) => {
            dispatch(setProblemsDifficultyVisibilityFilter(level));
        },
        onHide: () => {
            dispatch(closeWorkInProgressWindow());
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