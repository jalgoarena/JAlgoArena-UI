import React from 'react';
import {Grid, Button, Col, PageHeader} from 'react-bootstrap';
import {connect} from 'react-redux';
import Markdown from 'react-remarkable';

import FontAwesome from '../components/FontAwesome';

class NewProblem extends React.Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({}, {
            description: "Dummy Description",
            title: "Dummy Title",
            level: "1",
            problemId: "TBD",
            timeLimit: 1,
            memoryLimit: 32
        });
    }

    render() {
        return (
            <Grid>
                <PageHeader className="text-center">Create New Problem</PageHeader>
                <Col md={4}>
                    <form>
                        <div className="form-group">
                            <input className="form-control" type="text" placeholder="Title" id="title"
                                   value={this.state.title}
                                   onChange={(e) => this.setState({title: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="text" placeholder="Problem ID" id="problemId"
                                   value={this.state.problemId}
                                   onChange={(e) => this.setState({problemId: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="number" placeholder="Time Limit" id="timeLimit"
                                   value={this.state.timeLimit}
                                   onChange={(e) => this.setState({timeLimit: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="number" placeholder="Memory Limit" id="memoryLimit"
                                   value={this.state.memoryLimit}
                                   onChange={(e) => this.setState({memoryLimit: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="level" className="control-label">Level</label>
                            <select className="form-control" ref="level" id="level"
                                onChange={(e) => this.setState({level: e.target.value})}
                            >
                                <option value={1}>Easy</option>
                                <option value={2}>Medium</option>
                                <option value={3}>Hard</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <textarea className="form-control" type="text" placeholder="Description" id="description"
                                      value={this.state.description}
                                      onChange={(e) => this.setState({description: e.target.value})}
                            />
                        </div>
                        <Button type="submit" bsStyle="success" className="pull-right" onClick={this.onSignUp}>
                            <FontAwesome name="book"/> Create Problem
                        </Button>
                    </form>
                </Col>
                <Col mdOffset={1} md={7} style={{backgroundColor: "#f1f1f1"}}>
                    <PageHeader className="text-center">{this.state.title}</PageHeader>
                    <h4>ID: {this.state.problemId}</h4>
                    <h4>Time Limit: {this.state.timeLimit}</h4>
                    <h4>Memory Limit: {this.state.memoryLimit}</h4>
                    <h4>Level: {this.state.level}</h4><br/><br/>
                    <Markdown source={this.state.description}/>
                </Col>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    }
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

const NewProblemPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(NewProblem);

export default NewProblemPage;