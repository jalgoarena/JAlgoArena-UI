# JAlgoArena-UI [![Build Status](https://travis-ci.org/jalgoarena/JAlgoArena-UI.svg?branch=master)](https://travis-ci.org/jalgoarena/JAlgoArena-UI) [![GitHub release](https://img.shields.io/github/release/spolnik/jalgoarena-ui.svg)]() [![Codacy Badge](https://api.codacy.com/project/badge/Grade/42e543b317ca4633ad593fbd6e45dc1a)](https://www.codacy.com/app/jacek-spolnik/JAlgoArena-UI?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=spolnik/JAlgoArena-UI&amp;utm_campaign=Badge_Grade) [![Code Climate](https://codeclimate.com/github/spolnik/JAlgoArena-UI/badges/gpa.svg)](https://codeclimate.com/github/spolnik/JAlgoArena-UI) [![codecov](https://codecov.io/gh/spolnik/JAlgoArena-UI/branch/master/graph/badge.svg)](https://codecov.io/gh/spolnik/JAlgoArena-UI)

JAlgoArena UI is frontent for JAlgoArena services. 

- [Introduction](#introduction)
- [Technology](#technology)

## Introduction

- JAlgoArena UI allows user to see existing problems, create account and using it submit solutions for existing problems in Java. Every solution is limited by time and memory consumption and needs to pass all defined test cases. Problems itself are divided into three difficulty levels for each ones receiving different set of points.

![Component Diagram](https://github.com/spolnik/JAlgoArena-UI/raw/master/design/component_diagram.png)

## Technology

- Nomad for scheduling
- npm, as build and running script, dependency management
- Webpack to build JavaScript bundle script
- ReactJS, Redux - for views and handling state
- Bootstrap - for UI Styles
- TravisCI - https://travis-ci.org/jalgoarena/JAlgoArena-UI

![Component Diagram](https://github.com/spolnik/JAlgoArena/raw/master/design/JAlgoArena_Logo.png)
