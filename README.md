# JAlgoArena-UI [![Build Status](https://travis-ci.org/spolnik/JAlgoArena-UI.svg?branch=master)](https://travis-ci.org/spolnik/JAlgoArena-UI)

JAlgoArena UI is frontent for JAlgoArena services. 

- [Introduction](#introduction)
- [Components](#components)
- [Continuous Delivery](#continuous-delivery)
- [Infrastructure](#infrastructure)
- [Running Locally] (#running-locally)
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

## Running locally

There are two ways to run it - from sources or from binaries.
- Default port: `3000`

### Running from binaries
- go to [releases page](https://github.com/spolnik/JAlgoArena-UI/releases) and download last app package (JAlgoArena-UI-[version_number].zip)
- after unpacking it, go to folder and run `./run.sh` (to make it runnable, invoke command `chmod +x run.sh`)
 - there is now some caveat - configuration is embedded into sources under [config](client/config/index.js) file. If you would like to change welcome message, name of teams or regions, url to EUREKA you are supposed to do that in this file. Once you do that, you should replace command `npm run prod` from `run.sh` with `npm start` which will rebuild sources
 - in future that configuration/data will go to some other service and will be downloaded by UI on the start
- you can modify port, api gateway service url run.sh script, depending on your infrastructure settings. The script itself can be found in here: [run.sh](run.sh)

### Running from sources
- run `git clone https://github.com/spolnik/JAlgoArena-UI` to clone locally the sources
- now, you can build project with command `./npm run build` which will create runnable jar package with app sources. Next, run `npm run prod` which will start application
 - there is now some caveat - configuration is embedded into sources under [config](client/config/index.js) file. If you would like to change welcome message, name of teams or regions, url to EUREKA you are supposed to do that in this file. Once you do that, you should repeat above command to rebuild sources
 - in future that configuration/data will go to some other service and will be downloaded by UI on the start

### Recommended way to run - PM2
- the recommended way to run JAlgoArena UI is to use [PM2](http://pm2.keymetrics.io/)
- prerequisit - `npm install pm2 -g`
- the command is `pm2 start server.js --name jalgoarena-ui`, after you build sources with `npm run build` or when using released version

## Notes
- [Travis Builds](https://travis-ci.org/spolnik)

![Component Diagram](https://github.com/spolnik/JAlgoArena/raw/master/design/JAlgoArena_Logo.png)
