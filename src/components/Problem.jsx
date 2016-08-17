import React from 'react';
import {Row, Col, Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import FontAwesome from './FontAwesome';
import store from '../stores';
import {resetSourceCode, setCurrentProblem} from '../actions';

export default class Problem extends React.Component {
    render() {
        const problemStyle = {
            margin: "20px 20px 0px",
            borderRadius: 5,
            border: "1px solid #c2c7d0",
            padding: "1em 2em 1em"
        };

        return <Col md={5} style={problemStyle}>
            <Row>
                <h4 className="text-success">{this.props.title}</h4>
            </Row>
            <Row>
                <LinkContainer to={{pathname: "/problem/" + this.props.id}}>
                    <Button  bsStyle="success" className="pull-right"
                             onClick={() => {
                                 store.dispatch(setCurrentProblem(this.props.id));
                                 store.dispatch(resetSourceCode());
                             }}>
                        <FontAwesome name="bars"/> Solve Problem
                    </Button>
                </LinkContainer>

                Time Limit: {this.props.timeLimit}<br />
                Memory Limit: {this.props.memoryLimit}
            </Row>
        </Col>
    }
}