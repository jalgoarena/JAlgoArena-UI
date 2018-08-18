import * as React from 'react';
import {Row, Col, Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

import FontAwesome from '../../common/components/FontAwesome';
import {CSSProperties} from "react";

const problemStyle: CSSProperties = {
    margin: "20px 20px 0px",
    borderRadius: 5,
    border: "1px solid #c2c7d0",
    padding: "1em 2em 1em"
};

function difficulty(level: number) {
    switch (level) {
        case 3:
            return 'Hard';
        case 2:
            return 'Medium';
        default:
            return 'Easy';
    }
}

interface ProblemProps {
    title: string,
    id: string,
    solvedBy: number,
    level: number,
    isSuccess: boolean,
    isFailure: boolean
}

const ProblemDetails = (props: ProblemProps) => {

    const checkControl = props.isSuccess
        ? <FontAwesome prefix="fas" name="check"/>
        : props.isFailure
            ? <FontAwesome prefix="fas" name="times"/>
            : null;

    const successOrDangerStyle = props.isSuccess
        ? "text-success"
        : props.isFailure
            ? "text-danger"
            : "text-success";

    return (
        <Col md={5} style={problemStyle}>
            <Row>
                <h4 className={successOrDangerStyle}>{props.title} <span className="pull-right">{checkControl}</span></h4>
            </Row>
            <Row>
                <LinkContainer to={{pathname: `/problem/${props.id}`}}>
                    <Button bsStyle="success" className="pull-right">
                        <FontAwesome prefix="fas" name="bars"/> Solve Problem
                    </Button>
                </LinkContainer>

                <span className="text-muted">{"Difficulty: "}</span>
                <span className="text-primary">{difficulty(props.level)}</span><br/>
                <span className="text-muted">{"Solved By: "}</span>
                <span className="text-primary">
                    {`${props.solvedBy} user${props.solvedBy === 1 ? "" : "s"}`}
                </span>
            </Row>
        </Col>
    );
};

export default ProblemDetails;
