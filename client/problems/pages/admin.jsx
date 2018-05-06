import React from 'react';
import * as _ from 'lodash';
import {Grid, Button, Col, PageHeader, FormControl, FormGroup, ControlLabel, Panel} from 'react-bootstrap';
import {connect} from 'react-redux';
import Markdown from '../../common/components/Remarkable';
import JSONTree from 'react-json-tree';

import FontAwesome from '../../common/components/FontAwesome';
import FieldGroup from '../../common/components/FieldGroup';
import {fetchRawProblems} from "../actions/index";


class ProblemsAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newProblem: {
                id: "fib",
                title: "Fibonacci",
                description: "Write the `fib` method to return the N'th term.\r\nWe start counting from:\r\n* fib(0) = 0\r\n* fib(1) = 1.\r\n\r\n### Examples\r\n\r\n* `0` -> `0`\r\n* `6` -> `8`",
                timeLimit: 1,
                func: {
                    name: "fib",
                    returnStatement: {type: "java.lang.Long", comment: " N'th term of Fibonacci sequence"},
                    parameters: [{
                        name: "n",
                        type: "java.lang.Integer",
                        comment: "id of fibonacci term to be returned"
                    }]
                },
                testCases: [{input: ["0"], output: 0}, {input: ["1"], output: 1}, {
                    input: ["2"],
                    output: 1
                }, {input: ["3"], output: 2}, {input: ["4"], output: 3}, {
                    input: ["5"],
                    output: 5
                }, {input: ["6"], output: 8}, {input: ["20"], output: 6765}, {
                    input: ["40"],
                    output: 102334155
                }],
                level: 1
            }
        };
    }

    componentDidMount() {
        this.props.onLoad();
    }

    static saveJSON(problem) {
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
            level: this.state.newProblem.level,
            func: this.state.newProblem.func,
            testCases: this.state.newProblem.testCases
        };

        ProblemsAdmin.saveJSON(problemJson);
    }

    setCurrentProblem(problemId) {
        let problems = this.props.problems || [];
        let problem = problems.find(problem => problem.id === problemId);

        this.setState({newProblem: problem});
    }

    render() {
        let problems = this.props.problems || [];
        problems = _.orderBy(problems, ["title"]);

        let problemItems = problems.map((problem, idx) => {
            return <option value={problem.id} key={idx}>{problem.title}</option>;
        });

        const panelTitle = <h3 className="panel-title">Choose problem as a base for edition</h3>;

        return (
            <Grid fluid={true}>
                <PageHeader className="text-center">Problems ({problems.length})</PageHeader>
                <Col md={5}>
                    <form>
                        <Panel header={panelTitle}>
                            <select className="form-control" id="chosenProblem"
                                    value={this.state.newProblem.id}
                                    onChange={(e) => this.setCurrentProblem(e.target.value)}>
                                {problemItems}
                            </select>
                        </Panel>
                        <FieldGroup id="title" type="text" placeholder="Title" label="Title"
                                    value={this.state.newProblem.title}
                                    onChange={(e) => this.setState({
                                        newProblem: Object.assign({}, this.state.newProblem, {
                                            title: e.target.value
                                        })
                                    })}
                        />
                        <FieldGroup id="problemId" type="text" placeholder="Problem ID" label="Problem ID"
                                    value={this.state.newProblem.id}
                                    onChange={(e) => this.setState({
                                        newProblem: Object.assign({}, this.state.newProblem, {
                                            id: e.target.value
                                        })
                                    })}
                        />
                        <FieldGroup id="timeLimit" type="number" placeholder="Time Limit" label="Time Limit"
                                    value={this.state.newProblem.timeLimit}
                                    onChange={(e) => this.setState({
                                        newProblem: Object.assign({}, this.state.newProblem, {
                                            timeLimit: parseInt(e.target.value)
                                        })
                                    })}
                        />
                        <FormGroup controlId="level">
                            <ControlLabel>Level</ControlLabel>
                            <FormControl componentClass="select"
                                         value={this.state.newProblem.level}
                                         onChange={(e) => this.setState({
                                             newProblem: Object.assign({}, this.state.newProblem, {
                                                 level: parseInt(e.target.value)
                                             })
                                         })}>
                                <option value={1}>Easy</option>
                                <option value={2}>Medium</option>
                                <option value={3}>Hard</option>
                            </FormControl>
                        </FormGroup>
                        <FieldGroup id="description" placeholder="Description" label="Description"
                                    componentClass="textarea"
                                    value={this.state.newProblem.description}
                                    onChange={(e) => this.setState({
                                        newProblem: Object.assign({}, this.state.newProblem, {
                                            description: e.target.value
                                        })
                                    })}
                        />
                        <FieldGroup id="functionName" label="Function Name" placeholder="Function Name" type="text"
                                    value={this.state.newProblem.func.name}
                                    onChange={(e) => this.setState({
                                        newProblem: Object.assign({}, this.state.newProblem, {
                                            func: Object.assign({}, this.state.newProblem.func, {name: e.target.value})
                                        })
                                    })}
                        />
                        <FormGroup controlId="returnType">
                            <ControlLabel>Return Type</ControlLabel>
                            <FormControl componentClass="select"
                                         value={this.state.newProblem.func.returnStatement.type}
                                         onChange={(e) => this.setState({
                                             newProblem: Object.assign({}, this.state.newProblem, {
                                                 func: Object.assign({}, this.state.newProblem.func, {
                                                     returnStatement: Object.assign({}, this.state.newProblem.func.returnStatement, {
                                                         type: e.target.value,
                                                     })
                                                 })
                                             })
                                         })}>
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
                            </FormControl>
                        </FormGroup>
                        <FieldGroup id="returnComment" label="Return Comment" placeholder="Return Comment" type="text"
                                    value={this.state.newProblem.func.returnStatement.comment}
                                    onChange={(e) => this.setState({
                                        newProblem: Object.assign({}, this.state.newProblem, {
                                            func: Object.assign({}, this.state.newProblem.func, {
                                                returnStatement: Object.assign({}, this.state.newProblem.func.returnStatement, {
                                                    comment: e.target.value
                                                })
                                            })
                                        })
                                    })}
                        />
                        <FieldGroup id="returnGeneric" label="Return Generic" placeholder="Return Generic" type="text"
                                    value={this.state.newProblem.func.returnStatement.generic}
                                    onChange={(e) => this.setState({
                                        newProblem: Object.assign({}, this.state.newProblem, {
                                            func: Object.assign({}, this.state.newProblem.func, {
                                                returnStatement: Object.assign({}, this.state.newProblem.func.returnStatement, {
                                                    generic: e.target.value
                                                })
                                            })
                                        })
                                    })}
                        />
                        <FieldGroup id="parameters" label="Parameters" placeholder="Parameters"
                                    componentClass="textarea"
                                    value={JSON.stringify(this.state.newProblem.func.parameters)}
                                    onChange={(e) => this.setState({
                                        newProblem: Object.assign({}, this.state.newProblem, {
                                            func: Object.assign({}, this.state.newProblem.func, {parameters: JSON.parse(e.target.value)})
                                        })
                                    })}
                        />
                        <FieldGroup id="testCases" label="Test Cases" placeholder="Test Cases"
                                    componentClass="textarea"
                                    value={JSON.stringify(this.state.newProblem.testCases)}
                                    onChange={(e) => this.setState({
                                        newProblem: Object.assign({}, this.state.newProblem, {
                                            testCases: JSON.parse(e.target.value)
                                        })
                                    })}
                        />
                        <Button type="submit" bsStyle="success" block
                                onClick={(e) => this.onCreateProblem(e)}>
                            <FontAwesome prefix="fas" name="download"/> {this.state.newProblem.id}.json
                        </Button>
                    </form>
                </Col>
                <Col md={7} style={{backgroundColor: "#f1f1f1"}}>
                    <PageHeader className="text-center">{this.state.newProblem.title}</PageHeader>
                    <h4>ID: {this.state.newProblem.id}</h4>
                    <h4>Time Limit: {this.state.newProblem.timeLimit}</h4>
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
        problems: state.problems.rawItems
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: () => {
            dispatch(fetchRawProblems());
        }
    }
};

const ProblemsAdminPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProblemsAdmin);

export {ProblemsAdminPage};