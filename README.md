# JAlgoArena-UI [![Build Status](https://travis-ci.org/spolnik/JAlgoArena-UI.svg?branch=master)](https://travis-ci.org/spolnik/JAlgoArena-UI)

JAlgoArena UI is frontent for JAlgoArena services. 

- [Introduction](#introduction)
- [Components](#components)
- [Continuous Delivery](#continuous-delivery)
- [Infrastructure](#infrastructure)
- [Notes](#notes)

## Introduction

- JAlgoArena UI allows user to see existing problems, create account and using it submit solutions for existing problems, in one of two languages: Kotlin and Java. Every solution is limited by time and memory consumption and needs to pass all defined test cases. Problems itself are divided into three difficulty levels for each ones receiving different set of points. Additionally Kotlin language is promoted, giving you 150% of usual points in Java with same time.
- Additionally there is module dedicated for Administrator, who can review submissions (any cheating, ticking on requirements, copy pasting), add new problems or update existing ones (the last one is still in progress)

![Component Diagram](https://github.com/spolnik/JAlgoArena-UI/raw/master/design/component_diagram.png)

## Components

- [JAlgoArena](https://github.com/spolnik/JAlgoArena)
- [JAlgoArena API Gateway](https://github.com/spolnik/JAlgoArena-API)

## Continuous Delivery

- initially, developer push his changes to GitHub
- in next stage, GitHub notifies Travis CI about changes
- Travis CI runs whole continuous integration flow, running compilation, tests and generating reports
- application is deployed into Heroku machine

## Infrastructure

- Heroku (PaaS)
- npm, as build and running script, dependency management
- Webpack to build JavaScript bundle script
- ReactJS, Redux - for views and handling state
- Bootstrap - for UI Styles
- TravisCI - https://travis-ci.org/spolnik/JAlgoArena-UI

## Notes
- [Running locally](https://github.com/spolnik/jalgoarena/wiki)
- [Travis Builds](https://travis-ci.org/spolnik)

![Component Diagram](https://github.com/spolnik/JAlgoArena/raw/master/design/JAlgoArena_Logo.png)
