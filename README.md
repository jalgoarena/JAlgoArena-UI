# JAlgoArena-UI [![Build Status](https://travis-ci.org/jalgoarena/JAlgoArena-UI.svg?branch=master)](https://travis-ci.org/jalgoarena/JAlgoArena-UI) [![GitHub release](https://img.shields.io/github/release/spolnik/jalgoarena-ui.svg)]() [![Codacy Badge](https://api.codacy.com/project/badge/Grade/42e543b317ca4633ad593fbd6e45dc1a)](https://www.codacy.com/app/jacek-spolnik/JAlgoArena-UI?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=spolnik/JAlgoArena-UI&amp;utm_campaign=Badge_Grade) [![Code Climate](https://codeclimate.com/github/spolnik/JAlgoArena-UI/badges/gpa.svg)](https://codeclimate.com/github/spolnik/JAlgoArena-UI) [![codecov](https://codecov.io/gh/spolnik/JAlgoArena-UI/branch/master/graph/badge.svg)](https://codecov.io/gh/spolnik/JAlgoArena-UI)

JAlgoArena UI is frontent for JAlgoArena services. 

- [Introduction](#introduction)
- [Components](#components)
- [Continuous Delivery](#continuous-delivery)
- [Infrastructure](#infrastructure)
- [Running Locally] (#running-locally)
- [Notes](#notes)

## Introduction

- JAlgoArena UI allows user to see existing problems, create account and using it submit solutions for existing problems in Java. Every solution is limited by time and memory consumption and needs to pass all defined test cases. Problems itself are divided into three difficulty levels for each ones receiving different set of points.
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

## Running locally

There are two ways to run it - from sources or from binaries.
- Default port: `3000`
- prerequisite if you plan to rebuild: `npm run installRequiredGlobalDependencies`

### Running from binaries
- go to [releases page](https://github.com/spolnik/JAlgoArena-UI/releases) and download last app package (JAlgoArena-UI-[version_number].zip)
- after unpacking it, go to folder and edit configuration: `nano client/config/index.js` - change there url to JAlgoArena API Gateway, title, region and team names
- run with command: `npm start`

### Running from sources
- run `git clone https://github.com/spolnik/JAlgoArena-UI` to clone locally the sources
- run `npm install` to install all dependencies
- now, you can build and run project with command `./npm start`
 - there is now some caveat - configuration is embedded into sources under [config](client/config/index.js) file. If you would like to change welcome message, name of teams or regions, url to EUREKA you are supposed to do that in this file. Once you do that, you should repeat above command to rebuild sources
 - in future that configuration/data will go to some other service and will be downloaded by UI on the start

### Recommended way to run - PM2
- the recommended way to run JAlgoArena UI is to use [PM2](http://pm2.keymetrics.io/)
- the command is `npm run pm2start`

## Notes
- [Travis Builds](https://travis-ci.org/spolnik)

![Component Diagram](https://github.com/spolnik/JAlgoArena/raw/master/design/JAlgoArena_Logo.png)
