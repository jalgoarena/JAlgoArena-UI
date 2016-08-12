"use strict";

import React from "react";
import Menu from "./components/Menu.jsx";
import Footer from "./components/Footer.jsx";
import {ProblemActions} from "./actions/problems.js";
import {ProblemStore} from "./stores/problems.js";
import Reflux from 'reflux';

const Layout = React.createClass({
    mixins: [
        Reflux.listenTo(
            ProblemStore, 'onFetchProblems'
        )
    ],
    getInitialState: function() {
      return {problems: [{
          "id": "check-perm",
          "title": "Check Permutations",
          "description": "Given two strings, write a method to decide if one is a permutation of other.",
          "time_limit": 1,
          "memory_limit": 32,
          "example": {
              "input": "\"abc\", \"cba\"",
              "output": "true"
          },
          "skeleton_code": "import java.util.*;\nimport org.algohub.engine.type.*;\n\npublic class Solution {\n    /**\n     * @param str1 first string to be checked for permutation match\n     * @param str2 second string to be checked for permutation match\n     * @return  Indicate if one string is a permutation of another\n     */\n    public boolean permutation(String str1, String str2) {\n        // Write your code here\n    }\n}\n"
      }]};
    },
    componentDidMount: function() {
        ProblemActions.FetchProblems();
    },
    render: function() {
        return <div>
            <Menu />
            { React.cloneElement(this.props.children, this.state) }
            <Footer />
        </div>;
    },
    onFetchProblems: function(data) {
        this.setState({problems: data});
    }
});

module.exports = Layout;