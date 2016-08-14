import React from 'react';
import Problem from '../components/Problem.jsx';
import {Grid} from 'react-bootstrap';

export default class Problems extends React.Component {
    render() {
        if (!this.props.problems) {
            return null;
        }

        let problemNodes = this.props.problems.map((problem, idx) => {
            return <Problem
                title={problem.title}
                timeLimit={problem.time_limit}
                memoryLimit={problem.memory_limit}
                id={problem.id}
                key={idx}
            />;
        });

        return <Grid>{problemNodes}</Grid>;
    }
}
