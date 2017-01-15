import React from 'react';

import {ButtonToolbar, Button, ButtonGroup} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import FontAwesome from '../../common/components/FontAwesome';

const ProblemToolbar = ({children, problem, onRefresh, onShowPointsLegend, onLanguageChange, activeLanguage}) => (
    <ButtonToolbar>
        <LinkContainer to={"problem/" + problem.id}>
            <Button bsStyle="danger" className="pull-right" onClick={onRefresh}>
                <FontAwesome name="refresh"/> Refresh
            </Button>
        </LinkContainer>
        <Button bsStyle="success" className="pull-right" onClick={onShowPointsLegend}>Max {problem.level * 10} Points</Button>
        <ButtonGroup >
            <Button bsStyle="primary" onClick={() => onLanguageChange('java')} active={activeLanguage === 'java'}>Java</Button>
            <Button bsStyle="primary" onClick={() => onLanguageChange('kotlin')} active={activeLanguage === 'kotlin'}>Kotlin</Button>
        </ButtonGroup>
        {children}
    </ButtonToolbar>
);

export default ProblemToolbar;