import * as React from 'react';

interface FontAwesomeProps {
    prefix: string,
    name: string,
    lg?: boolean
}

const FontAwesome = (props: FontAwesomeProps) => (
    <i className={`${props.prefix} fa-${props.name}${props.lg ? " fa-lg" : ""}`}> </i>
);

export default FontAwesome;
