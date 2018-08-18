import * as React from 'react';
import {FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

interface FieldGroupProps {
    id: string;
    placeholder: string
    type : "text" | "password"
    label?: string,
    inputRef: (ref: HTMLInputElement) => void
    validationState: "success" | "warning" | "error" | null
}

const FieldGroup = ({id, label, validationState, placeholder, type, inputRef}: FieldGroupProps) => (
    <FormGroup controlId={id} validationState={validationState}>
        {label && <ControlLabel>{label}</ControlLabel>}
        <FormControl placeholder={placeholder} type={type} inputRef={inputRef} />
    </FormGroup>
);

export default FieldGroup;
