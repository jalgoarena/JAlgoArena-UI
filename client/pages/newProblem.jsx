import React from 'react';
import {Grid, Button, Col, PageHeader} from 'react-bootstrap';
import {connect} from 'react-redux';
import Markdown from 'react-remarkable';

import FontAwesome from '../components/FontAwesome';

class NewProblem extends React.Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({}, {description: ""});
    }

    render() {
        return (
            <Grid>
                <Col mdOffset={4} md={4}>
                    <form>
                        <PageHeader className="text-center">Create New Problem</PageHeader>
                        <div className="form-group">
                            <input className="form-control" type="text" placeholder="Problem ID" ref="id"/>
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="text" placeholder="Title" ref="title"/>
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="text" placeholder="Description" ref="description"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="level" className="control-label">Level</label>
                            <select className="form-control" ref="level" id="level">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                        </div>
                        <Button type="submit" bsStyle="success" block onClick={this.onSignUp}>
                            <FontAwesome name="book"/> Create Problem
                        </Button>
                    </form>
                </Col>
                <Col md={4}>
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