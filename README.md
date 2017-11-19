# Ballr

[![Travis](https://img.shields.io/travis/KleoPetroff/react-webpack-boilerplate/master.svg?style=flat-square)](https://github.com/KleoPetroff/react-webpack-boilerplate) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

## Starting the dev server

Make sure you have the latest Stable or LTS version of Node.js installed.

1. `git clone https://github.com/KleoPetroff/react-webpack-boilerplate.git`
2. Run `npm install` or `yarn install`
3. Start the dev server using `npm start`
3. Open [http://localhost:8080](http://localhost:8080)

## Available Commands

- `npm start` - start the dev server
- `npm clean` - delete the dist folder
- `npm run production` - create a production ready build in `dist` folder
- `npm run lint` - execute an eslint check
- `npm test` - run all tests
- `npm run test:watch` - run all tests in watch mode
- `npm run coverage` - generate code coverage report in the `coverage` folder

_________

# Code Jam - DataDive - Ballr

![Boston Celtics Huddle of Players](https://github.com/AndreiUngur/Codejam2017/blob/master/hi-res-183712255-head-coach-brad-stevens-of-the-boston-celtics-meets_crop_650.jpg "Boston Celtics Huddle of Players")

## Category 
Sports

## Datasets used from CodeJam DataDive
* Sports Basketball: Players.csv
* Sports Basketball: Seasons_Stats.csv
* Sports Basketball: NBA Data.csv

## External datasets
* Shot Charts NBA Season 2014-2015: stats.nba.com

## Team members
* Andrei Ungur
* Erick Zhao
* Alexander Bratyshkin
* Olivier Simard-Morissette

## Description
In sports analytics you often hear the tale of the nerd trying to explain to the jock why they should care about the numbers. Basketball is no different. NBA players have a plethora of tools available to them to enhance their game and there are numerous established products to track all sorts of statistics on players.

One area that hasn’t been explored is enhancing the way that basketball plays are diagrammed for players. Below in figure 1 you see Brad Stevens of the Boston Celtics drawing a play on a whiteboard.

While a whiteboard serves the purpose of communicating when and where players should be, it has several limitations:

* Miscommunication: Players may be used to other symbols being drawn on board. Need to standardize. 
* Lacks key statistical information: Statistical information such as shot efficiency is not presented and may help coaches and players decide on the best approach.
* Easily erased and no record kept: Coach may draw a play and it is not easily saved for later.

## Our Solution

![Screenshot](https://github.com/AndreiUngur/Codejam2017/blob/master/Screen%20Shot%202017-11-19%20at%2010.52.26%20AM.png "Screenshot of our project")


We designed a simple prototype web application over the weekend to demonstrate the potential of a virtual play whiteboard. We choose this interface to appeal to the target market of NBA coaches and basketball players. 

The interface allows for a coach to move players around and a convenient color coding scheme will tell the coach how effective that player shoots from that part of the floor. 

We used machine learning, specifically a decision tree to determine what zone the player marker falls into. We decided to take this approach as opposed to determining geometrically where the zones were in order to save time and because we had a large amount of shot chart data which had already been zoned.

## Technology Used
Flask, ScikitLearn, Pandas, Jupyter, SQlite,React and Webpack

## Outcomes

A final product may be better suited for a tablet due to portability and similarity to the existing whiteboard. We choose a web UI for simplicity and quick prototyping. Other features that could be developed in the future include:

* Saving plays - Let a coach save a play that the team frequently uses. This way he does not have to waste time in the huddle redrawing the play and can focus on motivation and fixing player mistakes.
* Give suggestions - Let the coach draw up the play but if the coach draws up a play which leads to players taking shots with a low probability of success, let them know! 
* Allow for an interactive walkthrough - Let the coach interactively have the play replayed in a loop so the coach can use this to accompany their explanation. 
* Explain plays in a foreign language -  From a play, repeat the explanation in another language. The NBA is a growing international game and often foreign players may not understand the coach perfectly. This reduces the barrier to communication. 

