import React from 'react';
import {Grid} from 'react-bootstrap';
import {connect} from 'react-redux';

import Output from '../components/Output.jsx';
import WorkInProgress from '../components/WorkInProgress.jsx';
import SubmissionDetails from '../components/SubmissionDetails.jsx';
import store from '../stores';
import {setCurrentProblem} from '../actions';

class Problem extends React.Component{
    componentDidMount() {
        if (store.getState().currentProblemId !== this.props.params.id) {
            store.dispatch(setCurrentProblem(this.props.params.id));
        }
    }
    render() {
        if (!this.props.problem) {
            return null;
        }

        return <Grid>
            <SubmissionDetails problem={this.props.problem} sourceCode={this.props.sourceCode} />
            <Output result={this.props.result}/>
            <WorkInProgress title={this.props.modalTitle} showModal={this.props.showModal} />
        </Grid>;
    }
}

const mapStateToProps = (state) => {
    const problem = state.currentProblemId
        ? state.problems.find((problem) => problem.id === state.currentProblemId)
        : null;

    return {
        problem,
        modalTitle: state.modalTitle,
        showModal: state.showModal,
        result: state.result,
        sourceCode: state.sourceCode
    }
};


const ProblemPage = connect(
    mapStateToProps
)(Problem);

export default ProblemPage;