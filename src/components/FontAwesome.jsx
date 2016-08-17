import React from 'react';

const FontAwesome = ({name, lg}) => (
    <i className={"fa fa-" + name + (lg ? " fa-lg" : "")}> </i>
);

export default FontAwesome;
