/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	var serverUrl = 'https://jalgoarena.herokuapp.com';
	var editor = ace.edit("editor");
	editor.setTheme("ace/theme/tomorrow_night_eighties");
	editor.getSession().setMode("ace/mode/java");

	var opts = {
	    lines: 13, // The number of lines to draw
	    length: 20, // The length of each line
	    width: 10, // The line thickness
	    radius: 30, // The radius of the inner circle
	    corners: 1, // Corner roundness (0..1)
	    rotate: 0, // The rotation offset
	    direction: 1, // 1: clockwise, -1: counterclockwise
	    color: '#000', // #rgb or #rrggbb or array of colors
	    speed: 1, // Rounds per second
	    trail: 60, // Afterglow percentage
	    shadow: false, // Whether to render a shadow
	    hwaccel: false, // Whether to use hardware acceleration
	    className: 'spinner', // The CSS class to assign to the spinner
	    zIndex: 2e9, // The z-index (defaults to 2000000000)
	    top: 'auto', // Top position relative to parent in px
	    left: 'auto' // Left position relative to parent in px
	};

	var target = document.getElementById('searching_spinner_center');
	var spinner = new Spinner(opts).spin(target);

	var $problems = $('#problems');
	var a = "";

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
	        url: serverUrl + "/problems/" + problemId + "/skeletonCode",
	        crossDomain: true
	    }).done(function (skeletonCode) {
	        editor.setValue(skeletonCode, 1);
	    });
	}

	$problems.on('click', '.problem', function (e) {
	    $('#output').html('<h2 class="text-info text-center">Submit your code to see results</h2>');
	    $('.problem.active').removeClass('active');

	    var problemId = e.currentTarget.id;
	    $("#" + problemId).addClass('active');

	    $.ajax({
	        type: "GET",
	        dataType: 'json',
	        url: serverUrl + "/problems/" + problemId,
	        crossDomain: true
	    }).done(function (problem) {
	        updateProblem(problem, problemId);
	    });
	});

	function updateProblems(problems) {

	    problems.forEach(function (problem) {
	        return $problems.append("<div class=\"col-md-3 problem\" id=\"" + problem + "\">\n                <a href=\"#\" class=\"btn btn-default btn-block\">" + problem + "</a>\n            </div>");
	    });

	    $problems.children().first().click();
	}

	$.ajax({
	    type: "GET",
	    dataType: 'json',
	    url: serverUrl + "/problems/",
	    crossDomain: true
	}).done(updateProblems);

	function processSubmission(result) {
	    var $output = $('#output');

	    switch (result.status_code) {
	        case 'ACCEPTED':
	            $output.html('<h2 class="text-success text-center">All test cases passed, congratulations!</h2>');

	            result.testcase_results.forEach(function (testCasePassed, i) {
	                return $output.append("<div class=\"col-md-3\">\n                        <span class=\"glyphicon glyphicon-" + (testCasePassed ? 'ok' : 'remove') + " \n                                text-" + (testCasePassed ? 'success' : 'danger') + "\" \n                                aria-hidden=\"true\">\n                        </span> Test Case #" + (i + 1) + "\n                    </div>");
	            });
	            break;
	        case 'WRONG_ANSWER':
	            $output.html('<h2 class="text-danger text-center">Wrong Answer</h2>');

	            result.testcase_results.forEach(function (testCasePassed, i) {
	                return $output.append("<div class=\"col-md-3\">\n                        <span class=\"glyphicon glyphicon-" + (testCasePassed ? 'ok' : 'remove') + " \n                              text-" + (testCasePassed ? 'success' : 'danger') + "\" \n                              aria-hidden=\"true\">\n                        </span> Test Case #" + (i + 1) + "\n                    </div>");
	            });

	            break;
	        case 'COMPILE_ERROR':
	            $output.html('<h2 class="text-danger text-center">Compilation Error</h2>');
	            $output.append("<p>" + result.error_message + "</p>");
	            break;
	        case 'RUNTIME_ERROR':
	            $output.html("<div class=\"alert alert-danger\" role=\"alert\">Runtime Error: " + result.error_message + "</div>");
	            break;
	        case 'TIME_LIMIT_EXCEEDED':
	            $output.html('<h2 class="text-danger text-center">Time Limit Exceeded</h2>');
	            break;
	        case 'MEMORY_LIMIT_EXCEEDED':
	            $output.html('<div class="alert alert-danger" role="alert">Memory Limit Exceeded!</div>');
	            break;
	    }

	    $('#Searching_Modal').modal('hide');
	};

	$('#submit-code').click(function () {
	    $('#Searching_Modal').modal('show');

	    var problemId = $('.problem.active').attr('id');
	    var sourceCode = editor.getValue();

	    $.ajax({
	        type: "POST",
	        data: sourceCode,
	        processData: false,
	        contentType: 'text/plain',
	        url: serverUrl + "/problems/" + problemId + "/solution",
	        crossDomain: true
	    }).done(processSubmission);
	});

	$(document).on('click', '.panel-heading span.clickable', function () {
	    var $this = $(undefined);

	    if (!$this.hasClass('panel-collapsed')) {
	        $this.parents('.panel').find('.panel-body').slideUp();
	        $this.addClass('panel-collapsed');
	        $this.find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
	    } else {
	        $this.parents('.panel').find('.panel-body').slideDown();
	        $this.removeClass('panel-collapsed');
	        $this.find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
	    }
	});

/***/ }
/******/ ]);