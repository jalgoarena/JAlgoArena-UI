import React from 'react';

import {ButtonGroup, Button, Col, Row} from 'react-bootstrap';

const filterStyle = {
    marginRight: "30px"
};

const SubmissionsFilter = ({changeFilter, filter}) => (
    <Row>
        <Col md={11}>
            <ButtonGroup className="pull-right" style={filterStyle} >
                <Button onClick={() => changeFilter('WRONG_ANSWER')} active={filter === 'WRONG_ANSWER'}>Wrong Answer</Button>
                <Button onClick={() => changeFilter('COMPILE_ERROR')} active={filter === 'COMPILE_ERROR'}>Compile Error</Button>
                <Button onClick={() => changeFilter('RUNTIME_ERROR')} active={filter === 'RUNTIME_ERROR'}>Runtime Error</Button>
                <Button onClick={() => changeFilter('TIME_LIMIT_EXCEEDED')} active={filter === 'TIME_LIMIT_EXCEEDED'}>Time Limit</Button>
                <Button onClick={() => changeFilter('MEMORY_LIMIT_EXCEEDED')} active={filter === 'MEMORY_LIMIT_EXCEEDED'}>Memory Limit</Button>
                <Button onClick={() => changeFilter('ACCEPTED')} active={filter === 'ACCEPTED'}>Accepted</Button>
                <Button onClick={() => changeFilter('RERUN_ACCEPTED')} active={filter === 'RERUN_ACCEPTED'}>Rerun Accepted</Button>
                <Button onClick={() => changeFilter('ALL')} active={filter === 'ALL'}>All</Button>
            </ButtonGroup>
        </Col>
    </Row>
);

export default SubmissionsFilter;