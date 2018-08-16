import * as React from 'react';

const FontAwesome = ({prefix, name, lg}: {prefix: string, name: string, lg?: boolean}) => (
    <i className={`${prefix} fa-${name}${lg ? " fa-lg" : ""}`}> </i>
);

export default FontAwesome;
