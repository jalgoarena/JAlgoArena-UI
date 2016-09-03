import React from 'react';

import {ButtonGroup, Button, Col} from 'react-bootstrap';

const filterStyle = {
    marginRight: "20px",
};

const ProblemsFilter = ({changeFilter, filter}) => (
    <Col md={11}>
        <ButtonGroup className="pull-right" style={filterStyle} bsSize="large">
            <Button onClick={() => changeFilter(1)} active={filter === 1}>Easy</Button>
            <Button onClick={() => changeFilter(2)} active={filter === 2}>Medium</Button>
            <Button onClick={() => changeFilter(3)} active={filter === 3}>Hard</Button>
            <Button onClick={() => changeFilter(0)} active={filter === 0}>All</Button>
        </ButtonGroup>
    </Col>
);

export default ProblemsFilter;