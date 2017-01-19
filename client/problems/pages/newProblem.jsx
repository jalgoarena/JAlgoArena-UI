import React from 'react';
import {findDOMNode} from 'react-dom';
import _ from 'lodash';
import {Grid, Button, Col, PageHeader} from 'react-bootstrap';
import {connect} from 'react-redux';
import Markdown from 'react-remarkable';
import JSONTree from 'react-json-tree';

import FontAwesome from '../../common/components/FontAwesome';
import {fetchRawProblems} from "../actions/index";


class NewProblem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newProblem: {
                "id": "fib",
                "title": "Fibonacci",
                "description": "Write the `fib` function to return the N'th term.\r\nWe start counting from:\r\n* fib(0) = 0\r\n* fib(1) = 1.\r\n\r\n### Examples\r\n\r\n* `0` -> `0`\r\n* `6` -> `8`",
                "timeLimit": 1,
                "memoryLimit": 32,
                "func": {
                    "name": "fib",
                    "return": {"type": "java.lang.Long", "comment": " N'th term of Fibonacci sequence"},
                    "parameters": [{
                        "name": "n",
                        "type": "java.lang.Integer",
                        "comment": "id of fibonacci term to be returned"
                    }]
                },
                "testCases": [{"input": ["0"], "output": 0}, {"input": ["1"], "output": 1}, {
                    "input": ["2"],
                    "output": 1
                }, {"input": ["3"], "output": 2}, {"input": ["4"], "output": 3}, {
                    "input": ["5"],
                    "output": 5
                }, {"input": ["6"], "output": 8}, {"input": ["20"], "output": 6765}, {
                    "input": ["40"],
                    "output": 102334155
                }],
                "level": 1
            }
        };
    }

    componentDidMount() {
        this.props.onLoad();
    }

    saveJSON(problem) {
        let filename = `${problem.id}.json`;
        problem = JSON.stringify(problem);

        let blob = new Blob([problem], {type: 'text/json'}),
            e = new MouseEvent("click", {bubbles: true, cancelable: false}),
            a = document.createElement('a');

        a.download = filename;
        a.href = URL.createObjectURL(blob);
        a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
        a.dispatchEvent(e);
    }

    onCreateProblem(e) {
        e.preventDefault();

        let problemJson = {
            id: this.state.newProblem.id,
            title: this.state.newProblem.title,
            description: this.state.newProblem.description,
            timeLimit: this.state.newProblem.timeLimit,
            memoryLimit: this.state.newProblem.memoryLimit,
            level: this.state.newProblem.level,
            function: this.state.newProblem.func,
            testCases: this.state.newProblem.testCases
        };

        this.saveJSON(problemJson);
    }

    setCurrentProblem(problemId) {
        let problems = this.props.problems || [];
        let problem = problems.find(problem => problem.id === problemId);

        problem = Object.assign({}, problem, {func: problem.function});
        delete problem.function;

        this.setState({newProblem: problem});
    }

    render() {
        let problems = this.props.problems || [];
        problems = _.orderBy(problems, ["title"]);
        let problemItems = problems.map(problem => {
            return <option value={problem.id} selected={problem.id === "fib"}>{problem.title}</option>;
        });

        return (
            <Grid fluid={true}>
                <PageHeader className="text-center">Create New Problem</PageHeader>
                <Col md={4}>
                    <form>
                        <div className="panel panel-danger">
                            <div className="panel-heading">
                                <h3 className="panel-title">Choose problem as a base for edition</h3>
                            </div>
                            <div className="panel-body">
                                <select className="form-control" id="chosenProblem"
                                        onChange={(e) => this.setCurrentProblem(e.target.value)}>
                                    {problemItems}
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="title" className="control-label">Title </label>
                            <input className="form-control" type="text" placeholder="Title" id="title" ref="title"
                                   value={this.state.newProblem.title}
                                   onChange={(e) => this.setState({
                                       newProblem: Object.assign({}, this.state.newProblem, {
                                           title: e.target.value
                                       })
                                   })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="problemId" className="control-label">Problem ID</label>
                            <input className="form-control" type="text" placeholder="Problem ID" id="problemId"
                                   ref="problemId"
                                   value={this.state.newProblem.id}
                                   onChange={(e) => this.setState({
                                       newProblem: Object.assign({}, this.state.newProblem, {
                                           id: e.target.value
                                       })
                                   })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="timeLimit" className="control-label">Time Limit</label>
                            <input className="form-control" type="number" placeholder="Time Limit" id="timeLimit"
                                   ref="timeLimit"
                                   value={this.state.newProblem.timeLimit}
                                   onChange={(e) => this.setState({
                                       newProblem: Object.assign({}, this.state.newProblem, {
                                           timeLimit: parseInt(e.target.value)
                                       })
                                   })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="memoryLimit" className="control-label">Memory Limit</label>
                            <input className="form-control" type="number" placeholder="Memory Limit" id="memoryLimit"
                                   ref="memoryLimit"
                                   value={this.state.newProblem.memoryLimit}
                                   onChange={(e) => this.setState({
                                       newProblem: Object.assign({}, this.state.newProblem, {
                                           memoryLimit: parseInt(e.target.value)
                                       })
                                   })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="level" className="control-label">Level</label>
                            <select className="form-control" id="level" ref="level"
                                    value={this.state.newProblem.level}
                                    onChange={(e) => this.setState({
                                        newProblem: Object.assign({}, this.state.newProblem, {
                                            level: parseInt(e.target.value)
                                        })
                                    })}
                            >
                                <option value={1}>Easy</option>
                                <option value={2}>Medium</option>
                                <option value={3}>Hard</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description" className="control-label">Description</label>
                            <textarea className="form-control" type="text" placeholder="Description" id="description"
                                      ref="description"
                                      value={this.state.newProblem.description}
                                      onChange={(e) => this.setState({
                                          newProblem: Object.assign({}, this.state.newProblem, {
                                              description: e.target.value
                                          })
                                      })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="functionName" className="control-label">Function Name</label>
                            <input className="form-control" type="text" placeholder="Function Name" id="functionName"
                                   ref="functionName"
                                   value={this.state.newProblem.func.name}
                                   onChange={(e) => this.setState({
                                       newProblem: Object.assign({}, this.state.newProblem, {
                                           func: Object.assign({}, this.state.newProblem.func, {name: e.target.value})
                                       })
                                   })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="returnType" className="control-label">Return Type</label>
                            <select className="form-control" id="returnType" ref="returnType"
                                    value={this.state.newProblem.func.return.type}
                                    onChange={(e) => this.setState({
                                        newProblem: Object.assign({}, this.state.newProblem, {
                                            func: Object.assign({}, this.state.newProblem.func, {
                                                return: Object.assign({}, this.state.newProblem.func.return, {
                                                    type: e.target.value,
                                                })
                                            })
                                        })
                                    })}
                            >
                                <option value="java.lang.Integer">int</option>
                                <option value="java.lang.Long">long</option>
                                <option value="java.lang.Double">double</option>
                                <option value="java.lang.Boolean">bool</option>
                                <option value="java.lang.String">String</option>
                                <option value="[I">int[]</option>
                                <option value="[[I">int[][]</option>
                                <option value="void">void</option>
                                <option value="com.jalgoarena.type.ListNode">ListNode</option>
                                <option value="com.jalgoarena.type.TreeNode">TreeNode</option>
                                <option value="java.util.ArrayList">ArrayList</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="returnComment" className="control-label">Return Comment</label>
                            <input className="form-control" type="text" placeholder="Return Comment" id="returnComment"
                                   ref="returnComment"
                                   value={this.state.newProblem.func.return.comment}
                                   onChange={(e) => this.setState({
                                       newProblem: Object.assign({}, this.state.newProblem, {
                                           func: Object.assign({}, this.state.newProblem.func, {
                                               return: Object.assign({}, this.state.newProblem.func.return, {
                                                   comment: e.target.value
                                               })
                                           })
                                       })
                                   })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="returnGeneric" className="control-label">Return Generic</label>
                            <input className="form-control" type="text" placeholder="Return Generic" id="returnGeneric"
                                   ref="returnGeneric"
                                   value={this.state.newProblem.func.return.generic}
                                   onChange={(e) => this.setState({
                                       newProblem: Object.assign({}, this.state.newProblem, {
                                           func: Object.assign({}, this.state.newProblem.func, {
                                               return: Object.assign({}, this.state.newProblem.func.return, {
                                                   generic: e.target.value
                                               })
                                           })
                                       })
                                   })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="parameters" className="control-label">Parameters</label>
                            <textarea className="form-control" type="text" placeholder="Parameters" id="parameters"
                                      ref="parameters"
                                      value={JSON.stringify(this.state.newProblem.func.parameters)}
                                      onChange={(e) => this.setState({
                                          newProblem: Object.assign({}, this.state.newProblem, {
                                              func: Object.assign({}, this.state.newProblem.func, {parameters: JSON.parse(e.target.value)})
                                          })
                                      })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="testCases" className="control-label">Test Cases</label>
                            <textarea className="form-control" type="text" placeholder="Test Cases" id="testCases"
                                      ref="testCases"
                                      value={JSON.stringify(this.state.newProblem.testCases)}
                                      onChange={(e) => this.setState({
                                          newProblem: Object.assign({}, this.state.newProblem, {
                                              testCases: JSON.parse(e.target.value)
                                          })
                                      })}
                            />
                        </div>
                        <Button type="submit" bsStyle="success" block
                                onClick={(e) => this.onCreateProblem(e)}>
                            <FontAwesome name="download"/> {this.state.newProblem.id}.json
                        </Button>
                    </form>
                </Col>
                <Col md={7} style={{backgroundColor: "#f1f1f1"}}>
                    <PageHeader className="text-center">{this.state.newProblem.title}</PageHeader>
                    <h4>ID: {this.state.newProblem.id}</h4>
                    <h4>Time Limit: {this.state.newProblem.timeLimit}</h4>
                    <h4>Memory Limit: {this.state.newProblem.memoryLimit}</h4>
                    <h4>Level: {this.state.newProblem.level}</h4>
                    <h4>Description</h4>
                    <Markdown source={this.state.newProblem.description}/>
                    <h4>Function Json</h4>
                    <JSONTree data={this.state.newProblem.func}/>
                    <h4>Test Cases Json</h4>
                    <JSONTree data={this.state.newProblem.testCases}/>
                </Col>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        problems: state.rawProblems
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: () => {
            dispatch(fetchRawProblems());
        }
    }
};

const NewProblemPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(NewProblem);

export default NewProblemPage;