import React from 'react';

export default class Output extends React.Component {
    render() {
        let header;
        let testCaseNodes;
        let errorMessage;

        let result = this.props.result;

        switch (result.status_code) {
            case 'WAITING':
                header = <h2 className="text-info text-center">Submit your code to see results</h2>;
                break;
            case 'ACCEPTED':
                header = <h2 className="text-success text-center">All test cases passed, congratulations!</h2>;

                testCaseNodes = result.testcase_results.map((result, i) =>
                    <div className="col-md-3">
                        <span className={"glyphicon glyphicon-" + (result ? 'ok' : 'remove') + " text-" + (result ? 'success' : 'danger')}
                              aria-hidden="true">
                        </span> Test Case #{i + 1}
                    </div>
                );
                break;
            case 'WRONG_ANSWER':
                header = <h2 className="text-danger text-center">Wrong Answer</h2>;

                testCaseNodes = result.testcase_results.map((result, i) =>
                    <div className="col-md-3">
                        <span className={"glyphicon glyphicon-" + (result ? 'ok' : 'remove') + " text-" + (result ? 'success' : 'danger')}
                              aria-hidden="true">
                        </span> Test Case #{i + 1}
                    </div>
                );

                break;
            case 'COMPILE_ERROR':
                header = <h2 className="text-danger text-center">Compilation Error</h2>;
                errorMessage = <p>${result.error_message}</p>;
                break;
            case 'RUNTIME_ERROR':
                header = <h2 className="text-danger text-center">Runtime Error</h2>;
                errorMessage = <p>${result.error_message}</p>;
                break;
            case 'TIME_LIMIT_EXCEEDED':
                header = <h2 className="text-danger text-center">Time Limit Exceeded</h2>;
                break;
            case 'MEMORY_LIMIT_EXCEEDED':
                header = <div className="alert alert-danger" role="alert">Memory Limit Exceeded!</div>;
                break;
        }

        const outputStyle = {
            marginTop: 30,
            borderRadius: 10,
            border: "1px solid black",
            padding: "0 10px 10px",
        };

        return <div className="row output" style={outputStyle} id="output">
            {header}
            {testCaseNodes}
            {errorMessage}
        </div>;
    }
}