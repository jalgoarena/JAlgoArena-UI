import React from 'react';

export default class AlgoArena extends React.Component {
    render() {
        return <div className="container">
            <div className="row">
                <div className="panel panel-success">
                    <div className="panel-heading">
                        <h3 className="panel-title">Problems</h3>
                        <span className="pull-right clickable"><i className="glyphicon glyphicon-chevron-up"> </i></span>
                    </div>
                    <div className="panel-body"><div id="problems"></div></div>
                </div>
            </div>
            <div className="row">
                <h1 className="page-header" id="problem-title">Problem title</h1>

                <div>
                    <p id="problem-description" className="lead">That is the place for problem description</p>
                </div>
                <div>
                    <p className="lead">
                        Example
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
                    <a href="#end-of-output" type="button" className="btn btn-success btn-lg pull-right" id="submit-code">
                        <span className="glyphicon glyphicon-flash" aria-hidden={true}> </span> Submit</a>
                    <span>Time Limit is <span className="text-success"
                                              id="problem-example-time-limit"> </span> seconds.</span><br />
        <span>Memory Limit is <span className="text-success"
                                    id="problem-example-memory-limit"> </span> kilobytes.</span>
                </div>
            </div>
            <div className="output row" id="output"></div>

            <div id="Searching_Modal" className="modal fade" tabIndex="-1" role="dialog" data-keyboard="false"
                     data-backdrop="static">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3>Submission In Progress</h3>
                            </div>
                            <div className="modal-body" >
                                <span id="searching_spinner_center"> </span>
                            </div>
                            <div className="modal-footer">
                                <div className="col-md-offset-4 col-md-8">
                                    <img src="img/logo.png" className="img-responsive footer-logo" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    }
}