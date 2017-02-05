// @flow

import React from 'react';

const FontAwesome = ({name, lg}: {name: string, lg?: boolean}) => (
    <i className={"fa fa-" + name + (lg ? " fa-lg" : "")}> </i>
);

export default FontAwesome;
