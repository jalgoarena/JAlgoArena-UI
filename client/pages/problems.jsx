import React from 'react';
import {Grid} from 'react-bootstrap';
import {connect} from 'react-redux';
import _ from 'lodash';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Problem from '../components/Problem';
import WorkInProgress from "../components/WorkInProgress";
import ProblemsFilter from '../components/ProblemsFilter';
import {setCurrentProblemsFilter} from "../actions/index";

class Problems extends React.Component {
    render() {
        let problems = this.props.problems || [];

        problems = problems.filter(problem => {
            if (this.props.problemsFilter === 0) return true;
            return problem.level === this.props.problemsFilter;
        });

        let problemNodes = problems.map((problem, idx) => {

            let submittedProblems = _.map(this.props.submissions, (submission) => submission.problemId);

            const isDone = _.includes(submittedProblems, problem.id);

            return <Problem
                title={problem.title}
                timeLimit={problem.time_limit}
                memoryLimit={problem.memory_limit}
                id={problem.id}
                key={idx}
                submissions={this.props.submissions}
                isDone={isDone}
            />;
        });

        return <Grid>
            <WorkInProgress showModal={this.props.showModal} />
            <ProblemsFilter changeFilter={this.props.changeFilter} filter={this.props.problemsFilter} />
            <ReactCSSTransitionGroup transitionName="problems-filter" transitionEnterTimeout={600} transitionLeaveTimeout={600}>
                {problemNodes}
            </ReactCSSTransitionGroup>
        </Grid>;
    }
}

const mapStateToProps = (state) => {
    return {
        problems: state.problems,
        showModal: state.showModal,
        submissions: state.submissions,
        problemsFilter: state.problemsFilter
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeFilter: (level) => {
            dispatch(setCurrentProblemsFilter(level));
        }
    }
};

const ProblemsPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(Problems);

export default ProblemsPage;