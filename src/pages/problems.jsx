import React from 'react';
import Problem from '../components/Problem.jsx';

export default class Problems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            serverUrl: 'https://jalgoarena.herokuapp.com',
            problems: []
        };
    }

    componentDidMount() {
        $.ajax({
            type: "GET",
            dataType: 'json',
            cache: 'false',
            url: `${this.state.serverUrl}/problems/`,
            crossDomain: true,
            success: (problems) => {
                this.setState({problems: problems});
            },
            error: (xhr, status, err) => {
                console.error(this.props.url, status, err.toString());
            }
        });
    }

    render() {
        let problemNodes = this.state.problems.map((problem) => {
            return <Problem
                title={problem.title}
                timeLimit={problem.time_limit}
                memoryLimit={problem.memory_limit}
                id={problem.id}
            />;
        });

        return <div className="container">
            {problemNodes}
        </div>;
    }
}
