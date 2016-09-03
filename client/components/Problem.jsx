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

function difficulty(level) {
    if (level === 3) {
        return 'Hard';
    }

    if (level === 2) {
        return 'Medium';
    }

    return "Easy";
}

const Problem = ({title, id, level, isDone}) => {
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

                <span className="text-muted">Difficulty:</span> <span className="text-primary">{difficulty(level)}</span><br />
                <span className="text-muted">Max Score:</span> <span className="text-primary">{level * 10}</span>
            </Row>
        </Col>
    );
};

export default Problem;
