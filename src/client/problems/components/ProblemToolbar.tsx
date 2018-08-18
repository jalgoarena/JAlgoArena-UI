import * as React from 'react';

import {ButtonToolbar, Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import FontAwesome from '../../common/components/FontAwesome';
import Problem from "../domain/Problem";

interface ProblemToolbarProps {
    children: any,
    problem: Problem,
    onRefresh: () => void,
    onShowPointsLegend: () => void
}

const ProblemToolbar = (props: ProblemToolbarProps) => (
    <ButtonToolbar>
        <LinkContainer to={"/problem/" + props.problem.id}>
            <Button bsStyle="danger" className="pull-right" onClick={props.onRefresh}>
                <FontAwesome prefix="fas" name="sync"/> Refresh
            </Button>
        </LinkContainer>
        <Button bsStyle="success"
                className="pull-right"
                onClick={props.onShowPointsLegend}>
            Max {(10 + ((props.problem.level - 1) * 20))} Points
        </Button>
        {props.children}
    </ButtonToolbar>
);

export default ProblemToolbar;