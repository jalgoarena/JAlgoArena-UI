import React from "react";
import {FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

const FieldGroup = ({id, label, validationState, help, ...props}) => (
    <FormGroup controlId={id} validationState={validationState}>
        { label && <ControlLabel>{label}</ControlLabel> }
        <FormControl {...props} />
        { help && <HelpBlock>{help}</HelpBlock> }
    </FormGroup>
);

export default FieldGroup;