// @Flow

import React from "react";
import {FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

const FieldGroup = ({id, label, validationState, ...props}: {id: string, label: string}) => (
    <FormGroup controlId={id} validationState={validationState}>
        { label && <ControlLabel>{label}</ControlLabel> }
        <FormControl {...props} />
    </FormGroup>
);

export default FieldGroup;