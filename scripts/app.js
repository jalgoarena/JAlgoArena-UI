'use strict';



var main = function() {

    var serverUrl = 'http://jalgoarena.herokuapp.com';

    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/tomorrow_night_eighties");
    editor.getSession().setMode("ace/mode/java");

    var $problems = $('#problems');

    $problems.on('click', '.problem', function (e) {
        $('.problem.active').removeClass('active');
        var problemId = e.currentTarget.id;
        $('#' + problemId).addClass('active');


        $.ajax({
            type: "GET",
            dataType: 'json',
            url: serverUrl + '/problems/' + problemId,
            crossDomain: true
        }).done(function (problem) {
            $('#problem-title').text(problem.title);
            $('#problem-description').text(problem.description);
            $('#problem-example-input').text(problem.example.input);
            $('#problem-example-output').text(problem.example.output);

            $.ajax({
                type: "GET",
                dataType: 'text',
                url: serverUrl + '/problems/' + problemId + '/skeletonCode',
                crossDomain: true
            }).done(function (skeletonCode) {
                editor.setValue(skeletonCode, 1);
            });
        });
    });

    $.ajax({
        type: "GET",
        dataType: 'json',
        url: serverUrl + '/problems/',
        crossDomain: true
    }).done(function (problems) {

        var first = true;
        problems.forEach(function (problem) {
            if (first) {
                $problems.append(
                    '<li class="active problem" id="' + problem + '"><a href="#">' + problem + '<span class="sr-only">(current)</span></a></li>'
                );
                first = false;
            } else {
                $problems.append('<li class="problem" id="' + problem + '"><a href="#">' + problem + '</a></li>')
            }
        });

        $problems.children().first().click();
    });

    $('#submit-code').click(function () {
        var problemId = $('.problem.active').attr('id');
        var sourceCode = editor.getValue();

        $.ajax({
            type: "POST",
            data: sourceCode,
            processData: false,
            contentType: 'text/plain',
            url: serverUrl + '/problems/' + problemId + '/solution',
            crossDomain: true
        }).done(function (result) {

            if (result.status_code === 'ACCEPTED') {
                $('#output').html('<div class="alert alert-success" role="alert">All test cases passed!</div>');
            } else if (result.status_code !== 'WRONG_ANSWER') {
                $('#output').html('<div class="alert alert-danger" role="alert">' + result.error_message + '</div>');
            } else {
                $('#output').html('<div class="alert alert-warning" role="alert">Wrong answer!</div>');
            }
        });
    });
};

$(document).ready(main);