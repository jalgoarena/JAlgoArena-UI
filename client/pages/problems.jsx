import React from 'react';
import {Grid} from 'react-bootstrap';
import {connect} from 'react-redux';

import Problem from '../components/Problem.jsx';
import WorkInProgress from "../components/WorkInProgress";
import store from '../store';
import {showModal} from '../actions';

class Problems extends React.Component {
    componentWillMount() {
        if (this.props.problems.length === 0) {
            store.dispatch(showModal());
        }
    }
    render() {
        let problems = this.props.problems || [];

        let problemNodes = problems.map((problem, idx) => {
            return <Problem
                title={problem.title}
                timeLimit={problem.time_limit}
                memoryLimit={problem.memory_limit}
                id={problem.id}
                key={idx}
            />;
        });

        return <Grid>
            <WorkInProgress showModal={this.props.showModal} />
            {problemNodes}
        </Grid>;
    }
}

const mapStateToProps = (state) => {
    return {
        problems: state.problems,
        showModal: state.showModal
    }
};


const ProblemsPage = connect(
    mapStateToProps
)(Problems);

export default ProblemsPage;