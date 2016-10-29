import React from 'react';
import {Grid} from 'react-bootstrap';
import {connect} from 'react-redux';
import _ from 'lodash';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Problem from '../components/Problem';
import WorkInProgress from "../components/WorkInProgress";
import ProblemsFilter from '../components/ProblemsFilter';
import {setCurrentProblemsFilter} from "../actions/index";
import {closeWorkInProgressWindow} from "../actions/index";

class Problems extends React.Component {
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

                return <Problem
                    title={problem.title}
                    level={problem.level}
                    id={problem.id}
                    key={idx}
                    submissions={this.props.submissions}
                    isDone={isDone}
                />;
        });

        return <Grid>
            <WorkInProgress showModal={this.props.showModal} onHide={this.props.onHide}/>
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
        },
        onHide: () => {
            dispatch(closeWorkInProgressWindow());
        }
    }
};

const ProblemsPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(Problems);

export default ProblemsPage;