// @flow

import React from 'react';
import Markdown from '../../common/components/Remarkable';

const ProblemDescription = ({description}: {description: string}) => (
    <div className="lead">
        <Markdown source={description} />
    </div>
);

export default ProblemDescription;