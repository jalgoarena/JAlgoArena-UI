import React from 'react';
import ReactDOM from 'react-dom';
import AlgoArena from './components/AlgoArena.jsx';

ReactDOM.render(<AlgoArena />, document.getElementById('app'));

const serverUrl = 'https://jalgoarena.herokuapp.com';

let $problems = $('#problems');

function updateProblem(problem, problemId) {
    $('#problem-title').text(problem.title);
    $('#problem-description').text(problem.description);
    $('#problem-example-input').text(problem.example.input);
    $('#problem-example-output').text(problem.example.output);
    $('#problem-example-time-limit').text(problem.time_limit);
    $('#problem-example-memory-limit').text(problem.memory_limit);

    $.ajax({
        type: "GET",
        dataType: 'text',
        url: `${serverUrl}/problems/${problemId}/skeletonCode`,
        crossDomain: true
    }).done(function (skeletonCode) {
        let editor = ace.edit("editor");
        editor.setValue(skeletonCode, 1);
    });
}

$problems.on('click', '.problem', (e) => {
    $('#output').html('<h2 class="text-info text-center">Submit your code to see results</h2>');
    $('.problem.active').removeClass('active');

    let problemId = e.currentTarget.id;
    $(`#${problemId}`).addClass('active');

    $.ajax({
        type: "GET",
        dataType: 'json',
        url: `${serverUrl}/problems/${problemId}`,
        crossDomain: true
    }).done(function (problem) {
        updateProblem(problem, problemId);
    });
});

function processSubmission(result) {
    let $output = $('#output');

    switch (result.status_code) {
        case 'ACCEPTED':
            $output.html('<h2 class="text-success text-center">All test cases passed, congratulations!</h2>');

            result.testcase_results.forEach((testCasePassed, i) =>
                $output.append(
                    `<div class="col-md-3">
                        <span class="glyphicon glyphicon-${(testCasePassed ? 'ok' : 'remove')} 
                                text-${(testCasePassed ? 'success' : 'danger')}" 
                                aria-hidden="true">
                        </span> Test Case #${(i + 1)}
                    </div>`
                )
            );
            break;
        case 'WRONG_ANSWER':
            $output.html('<h2 class="text-danger text-center">Wrong Answer</h2>');

            result.testcase_results.forEach((testCasePassed, i) =>
                $output.append(
                    `<div class="col-md-3">
                        <span class="glyphicon glyphicon-${(testCasePassed ? 'ok' : 'remove')} 
                              text-${(testCasePassed ? 'success' : 'danger')}" 
                              aria-hidden="true">
                        </span> Test Case #${(i + 1)}
                    </div>`
                )
            );

            break;
        case 'COMPILE_ERROR':
            $output.html('<h2 class="text-danger text-center">Compilation Error</h2>');
            $output.append(`<p>${result.error_message}</p>`);
            break;
        case 'RUNTIME_ERROR':
            $output.html(
                `<div class="alert alert-danger" role="alert">Runtime Error: ${result.error_message}</div>`
            );
            break;
        case 'TIME_LIMIT_EXCEEDED':
            $output.html('<h2 class="text-danger text-center">Time Limit Exceeded</h2>');
            break;
        case 'MEMORY_LIMIT_EXCEEDED':
            $output.html('<div class="alert alert-danger" role="alert">Memory Limit Exceeded!</div>');
            break;
    }

    $('#SubmissionInProgressSpinner').modal('hide');
}

$('#submit-code').click(() => {
    $('#SubmissionInProgressSpinner').modal('show');

    let problemId = $('.problem.active').attr('id');
    let editor = ace.edit("editor");
    let sourceCode = editor.getValue();

    $.ajax({
        type: "POST",
        data: sourceCode,
        processData: false,
        contentType: 'text/plain',
        url: `${serverUrl}/problems/${problemId}/solution`,
        crossDomain: true
    }).done(processSubmission);
});
