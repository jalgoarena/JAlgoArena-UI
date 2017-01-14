import React from 'react';
import {findDOMNode} from 'react-dom';
import {Grid, Button, Col, PageHeader} from 'react-bootstrap';
import {connect} from 'react-redux';
import Markdown from 'react-remarkable';
import JSONTree from 'react-json-tree';

import FontAwesome from '../../components/FontAwesome';
import {createProblem} from "../actions/index";

class NewProblem extends React.Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({}, {
            description: "Write the `fib` function to return the N'th term.\nWe start counting from:\n* fib(0) = 0\n* fib(1) = 1.\n\n### Examples\n\n* `0` -> `0`\n* `6` -> `8`",
            title: "Fibonacci",
            level: "1",
            problemId: "fib",
            timeLimit: 1,
            memoryLimit: 32,
            func: {
                name: "fib",
                return: {
                    type: "java.lang.Long",
                    comment: " N'th term of Fibonacci sequence"
                },
                parameters: [
                    {
                        name: "n",
                        type: "java.lang.Integer",
                        comment: "id of fibonacci term to be returned"
                    }
                ]
            },
            testCases: [
                {input: ["0"], output: 0},
                {input: ["1"], output: 1},
                {input: ["2"], output: 1},
                {input: ["3"], output: 2}
            ]
        });
    }

    onCreateProblem(e) {
        e.preventDefault();

        let problemJson = {
            id: this.state.problemId,
            title: this.state.title,
            description: this.state.description,
            time_limit: this.state.timeLimit,
            memory_limit: this.state.memoryLimit,
            level: this.state.level,
            function: this.state.func,
            testCases: this.state.testCases
        };

        this.props.onCreateProblem(problemJson);
    }

    render() {
        return (
            <Grid>
                <PageHeader className="text-center">Create New Problem</PageHeader>
                <Col md={5}>
                    <form>
                        <div className="form-group">
                            <label htmlFor="title" className="control-label">Title </label>
                            <input className="form-control" type="text" placeholder="Title" id="title" ref="title"
                                   value={this.state.title}
                                   onChange={(e) => this.setState({title: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="problemId" className="control-label">Problem ID</label>
                            <input className="form-control" type="text" placeholder="Problem ID" id="problemId" ref="problemId"
                                   value={this.state.problemId}
                                   onChange={(e) => this.setState({problemId: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="timeLimit" className="control-label">Time Limit</label>
                            <input className="form-control" type="number" placeholder="Time Limit" id="timeLimit" ref="timeLimit"
                                   value={this.state.timeLimit}
                                   onChange={(e) => this.setState({timeLimit: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="memoryLimit" className="control-label">Memory Limit</label>
                            <input className="form-control" type="number" placeholder="Memory Limit" id="memoryLimit" ref="memoryLimit"
                                   value={this.state.memoryLimit}
                                   onChange={(e) => this.setState({memoryLimit: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="level" className="control-label">Level</label>
                            <select className="form-control" id="level" ref="level"
                                    onChange={(e) => this.setState({level: e.target.value})}
                            >
                                <option value={1}>Easy</option>
                                <option value={2}>Medium</option>
                                <option value={3}>Hard</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description" className="control-label">Description</label>
                            <textarea className="form-control" type="text" placeholder="Description" id="description" ref="description"
                                      value={this.state.description}
                                      onChange={(e) => this.setState({description: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="functionName" className="control-label">Function Name</label>
                            <input className="form-control" type="text" placeholder="Function Name" id="functionName" ref="functionName"
                                   value={this.state.func.name}
                                   onChange={(e) => this.setState({
                                       func: Object.assign({}, this.state.func, {name: e.target.value})
                                   })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="returnType" className="control-label">Return Type</label>
                            <select className="form-control" id="returnType" ref="returnType"
                                    onChange={(e) => this.setState({
                                        func: Object.assign({}, this.state.func, {
                                            return: {
                                                type: e.target.value,
                                                comment: this.state.func.return.comment
                                            }
                                        })
                                    })}
                            >
                                <option value="java.lang.Integer">int</option>
                                <option value="java.lang.Long">long</option>
                                <option value="java.lang.Double">double</option>
                                <option value="java.lang.Boolean">bool</option>
                                c<option value="java.lang.String">String</option>
                                <option value="[I">int[]</option>
                                <option value="[[I">int[][]</option>
                                <option value="void">void</option>
                                <option value="com.jalgoarena.type.ListNode">ListNode</option>
                                <option value="com.jalgoarena.type.TreeNode">TreeNode</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="returnComment" className="control-label">Return Comment</label>
                            <input className="form-control" type="text" placeholder="Return Comment" id="returnComment" ref="returnComment"
                                   value={this.state.func.return.comment}
                                   onChange={(e) => this.setState({
                                       func: Object.assign({}, this.state.func, {
                                           return: {
                                               type: this.state.func.return.type,
                                               comment: e.target.value
                                           }
                                       })
                                   })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="parameters" className="control-label">Parameters</label>
                            <textarea className="form-control" type="text" placeholder="Parameters" id="parameters" ref="parameters"
                                      value={JSON.stringify(this.state.func.parameters)}
                                      onChange={(e) => this.setState({
                                          func: Object.assign({}, this.state.func, {parameters: JSON.parse(e.target.value)})
                                      })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="testCases" className="control-label">Test Cases</label>
                            <textarea className="form-control" type="text" placeholder="Test Cases" id="testCases" ref="testCases"
                                      value={JSON.stringify(this.state.testCases)}
                                      onChange={(e) => this.setState({
                                          testCases: JSON.parse(e.target.value)
                                      })
                                      }
                            />
                        </div>
                        <Button type="submit" bsStyle="success" className="pull-right" onClick={(e) => this.onCreateProblem(e)}>
                            <FontAwesome name="book"/> Create Problem
                        </Button>
                    </form>
                </Col>
                <Col md={7} style={{backgroundColor: "#f1f1f1"}}>
                    <PageHeader className="text-center">{this.state.title}</PageHeader>
                    <h4>ID: {this.state.problemId}</h4>
                    <h4>Time Limit: {this.state.timeLimit}</h4>
                    <h4>Memory Limit: {this.state.memoryLimit}</h4>
                    <h4>Level: {this.state.level}</h4>
                    <h4>Description</h4>
                    <Markdown source={this.state.description}/>
                    <h4>Function Json</h4>
                    <JSONTree data={this.state.func}/>
                    <h4>Test Cases Json</h4>
                    <JSONTree data={this.state.testCases}/>
                </Col>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onCreateProblem: (problemJson) => {
            dispatch(createProblem(problemJson));
        }
    }
};

const NewProblemPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(NewProblem);

export default NewProblemPage;