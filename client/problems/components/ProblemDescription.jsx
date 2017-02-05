// @flow

import React from 'react';
import Markdown from 'react-remarkable';

const ProblemDescription = ({description}: {description: string}) => (
    <div className="lead">
        <Markdown source={description}/>
    </div>
);

export default ProblemDescription;