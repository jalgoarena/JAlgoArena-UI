import React from 'react';
import Problem from '../components/Problem.jsx';

export default class Problems extends React.Component {
    render() {
        let problemNodes = this.props.problems.map((problem, idx) => {
            return <Problem
                title={problem.title}
                timeLimit={problem.time_limit}
                memoryLimit={problem.memory_limit}
                id={problem.id}
                key={idx}
            />;
        });

        return <div className="container">
            {problemNodes}
        </div>;
    }
}
