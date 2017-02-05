// @flow

import React from 'react';

import TimeAndMemoryReport from './TimeAndMemoryReport';
import SubmissionFailed from './SubmissionFailed';
import TestCaseResult from './TestCaseResult';
import JudgeResponse from "../domain/JudgeResponse";

const SubmissionResult = ({result}: {result: JudgeResponse}) => {

    switch (result.statusCode) {
        case 'WAITING':
            return <h2 className="text-info text-center">Run your code to see results</h2>;
        case 'ACCEPTED':
            return <div>
                <h2 className="text-success text-center">Congrats, you solved this problem!</h2>
                {result.testcaseResults.map((result, i) =>
                    <TestCaseResult key={i} passed={result} id={i + 1}/>
                )}
                <TimeAndMemoryReport elapsedTime={result.elapsedTime}
                                     consumedMemory={result.consumedMemory}/>
            </div>;
        case 'WRONG_ANSWER':
            return <div>
                <SubmissionFailed>Wrong Answer!</SubmissionFailed>
                {result.testcaseResults.map((result, i) =>
                    <TestCaseResult key={i} passed={result} id={i + 1}/>
                )}
            </div>;
        case 'COMPILE_ERROR':
            return <div>
                <SubmissionFailed>Compilation Error!</SubmissionFailed>
                <pre>{result.errorMessage}</pre>
            </div>;
        case 'RUNTIME_ERROR':
            return <div>
                <SubmissionFailed>Runtime Error!</SubmissionFailed>
                <pre>{result.errorMessage}</pre>
            </div>;
        case 'MEMORY_LIMIT_EXCEEDED':
            return <SubmissionFailed>Memory Limit Exceeded!</SubmissionFailed>;
        case 'TIME_LIMIT_EXCEEDED':
            return <SubmissionFailed>Time Limit Exceeded!</SubmissionFailed>;
        default:
            return <SubmissionFailed>Internal Server Error, Sorry :(</SubmissionFailed>;
    }
};

export default SubmissionResult;