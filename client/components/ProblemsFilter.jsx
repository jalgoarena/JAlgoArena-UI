import React from 'react';

import {ButtonGroup, Button, Col, Row} from 'react-bootstrap';

const filterStyle = {
    marginRight: "30px"
};

const ProblemsFilter = ({changeFilter, filter}) => (
    <Row>
        <Col md={11}>
            <ButtonGroup className="pull-right" style={filterStyle} bsSize="large">
                <Button onClick={() => changeFilter(1)} active={filter === 1}>Easy</Button>
                <Button onClick={() => changeFilter(2)} active={filter === 2}>Medium</Button>
                <Button onClick={() => changeFilter(3)} active={filter === 3}>Hard</Button>
                <Button onClick={() => changeFilter(0)} active={filter === 0}>All</Button>
            </ButtonGroup>
        </Col>
    </Row>
);

export default ProblemsFilter;