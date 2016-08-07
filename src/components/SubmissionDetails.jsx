import React from 'react';

export default class SubmissionDetails extends React.Component {
    render() {
        return <div className="row">
            <h1 className="page-header" id="problem-title">Problem title</h1>
            <div>
                <p id="problem-description" className="lead">That is the place for problem description</p>
            </div>
            <div>
                <p className="lead">
                    <strong>Example</strong>
                </p>
                <p><code id="problem-example-input"> </code> -> <code id="problem-example-output"> </code></p>
            </div>
            <div id="editor">{`public class Solution {
                    public static void main(String[] args) {
                    // put your code here
                }
                }`}
            </div>
            <div>
                <a href="#end-of-output" type="button" className="btn btn-success btn-lg pull-right"
                   id="submit-code">
                    <span className="glyphicon glyphicon-flash" aria-hidden={true}> </span> Submit</a>
                <span>Time Limit is <span className="text-success"
                                          id="problem-example-time-limit"> </span> seconds.</span><br />
                <span>Memory Limit is <span className="text-success"
                                            id="problem-example-memory-limit"> </span> kilobytes.</span>
            </div>
        </div>;
    }
}