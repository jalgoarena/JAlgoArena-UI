import React from 'react';

import {ButtonGroup, Button, Col, Row} from 'react-bootstrap';

const filterStyle = {
    marginRight: "30px"
};

const SubmissionsFilter = ({changeFilter, filter}) => (
    <Row>
        <Col md={11}>
            <ButtonGroup className="pull-right" style={filterStyle} bsSize="large">
                <Button onClick={() => changeFilter('ACCEPTED')} active={filter === 'ACCEPTED'}>Accepted</Button>
                <Button onClick={() => changeFilter('RERUN_ACCEPTED')} active={filter === 'RERUN_ACCEPTED'}>Rerun Accepted</Button>
                <Button onClick={() => changeFilter('ALL')} active={filter === 'ALL'}>All</Button>
            </ButtonGroup>
        </Col>
    </Row>
);

export default SubmissionsFilter;