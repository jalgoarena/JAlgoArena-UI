'use strict';

var main = function() {

    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/chrome");
    editor.getSession().setMode("ace/mode/java");

    var $problems = $('#problems');

    $problems.on('click', '.problem', function (e) {
        $('.problem.active').removeClass('active');
        var problemId = e.currentTarget.id;
        $('#' + problemId).addClass('active');

        $.ajax({
            type: "GET",
            dataType: 'json',
            url: 'http://jalgoarena.herokuapp.com/problems/' + problemId,
            crossDomain: true
        }).done(function (problem) {
            $('#problem-title').text(problem.title);
            $('#problem-description').text(problem.description);

            $.ajax({
                type: "GET",
                dataType: 'text',
                url: 'http://jalgoarena.herokuapp.com/problems/' + problemId + '/skeletonCode',
                crossDomain: true
            }).done(function (skeletonCode) {
                editor.setValue(skeletonCode, 1);
            });
        });
    });

    $.ajax({
        type: "GET",
        dataType: 'json',
        url: 'http://jalgoarena.herokuapp.com/problems/',
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
            url: 'http://jalgoarena.herokuapp.com/problems/' + problemId + '/solution',
            crossDomain: true,
        }).done(function (result) {
            console.log(sourceCode);
            $('#output').text(JSON.stringify(result));
        });
    });
};

$(document).ready(main);