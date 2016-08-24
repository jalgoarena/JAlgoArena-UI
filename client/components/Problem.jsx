import React from 'react';
import {Row, Col, Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

import FontAwesome from './FontAwesome';
import store from '../store';
import {setCurrentProblem} from '../actions';

const problemStyle = {
    margin: "20px 20px 0px",
    borderRadius: 5,
    border: "1px solid #c2c7d0",
    padding: "1em 2em 1em"
};

const Problem = ({title, id, timeLimit, memoryLimit, isDone}) => {
    const checkControl = isDone ? <FontAwesome name="check" /> : null;

    return (
        <Col md={5} style={problemStyle}>
            <Row>
                <h4 className="text-success">{title} <span className="pull-right">{checkControl}</span></h4>
            </Row>
            <Row>
                <LinkContainer to={{pathname: `/problem/${id}`}}>
                    <Button  bsStyle="success" className="pull-right"
                             onClick={() => store.dispatch(setCurrentProblem(id))}>
                        <FontAwesome name="bars"/> Solve Problem
                    </Button>
                </LinkContainer>

                Time Limit: {timeLimit}<br />
                Memory Limit: {memoryLimit}
            </Row>
        </Col>
    );
};

export default Problem;
