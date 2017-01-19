import React from 'react';

import {ButtonGroup, Button, Col, Row} from 'react-bootstrap';

const filterStyle = {
    marginLeft: "30px"
};

const SubmissionsFilter = ({changeFilter, filter}) => (
    <Row>
        <Col md={6}>
            <ButtonGroup style={filterStyle}>
                <Button onClick={() => changeFilter('ERROR')} active={filter === 'ERROR'}>Error</Button>
                <Button onClick={() => changeFilter('ACCEPTED')} active={filter === 'ACCEPTED'}>Accepted</Button>
                <Button onClick={() => changeFilter('RERUN_ACCEPTED')} active={filter === 'RERUN_ACCEPTED'}>Rerun Accepted</Button>
                <Button onClick={() => changeFilter('ALL')} active={filter === 'ALL'}>All</Button>
            </ButtonGroup>
        </Col>
    </Row>
);

export default SubmissionsFilter;