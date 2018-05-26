// @flow

import React from 'react';

import {ButtonGroup, Button, Col, Row, Badge} from 'react-bootstrap';

const filterStyle = {
    marginRight: "30px"
};

const problemsCountStyle = {
    marginLeft: "20px",
    marginTop: ".5em"
};

type ProblemsFilterInputType = {
    changeFilter: (number) => void,
    filter: number,
    onHideDoneProblems: (boolean) => void,
    hideDoneProblems: boolean,
    problemsCount: number,
    onShowNumberOfProblems: () => void
}
const ProblemsFilter = ({changeFilter, filter, onHideDoneProblems, hideDoneProblems, problemsCount, onShowNumberOfProblems}: ProblemsFilterInputType) => (
    <Row>
        <Col md={11}>
            <Button onClick={() => onShowNumberOfProblems()} bsStyle="success" style={problemsCountStyle}>Problems <Badge>{problemsCount}</Badge></Button>
            <ButtonGroup className="pull-right" style={filterStyle} bsSize="large">
                <Button onClick={() => changeFilter(1)} active={filter === 1}>Easy</Button>
                <Button onClick={() => changeFilter(2)} active={filter === 2}>Medium</Button>
                <Button onClick={() => changeFilter(3)} active={filter === 3}>Hard</Button>
                <Button onClick={() => changeFilter(0)} active={filter === 0}>All</Button>
            </ButtonGroup>
            <ButtonGroup className="pull-right" style={filterStyle} bsSize="large">
                <Button onClick={() => onHideDoneProblems(true)} active={hideDoneProblems === true}>Todo</Button>
                <Button onClick={() => onHideDoneProblems(false)} active={hideDoneProblems === false}>All</Button>
            </ButtonGroup>
        </Col>
    </Row>
);

export default ProblemsFilter;