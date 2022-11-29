# BeFIT

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Features](#features)
* [Setup](#setup)

## General info

This project is a web application for a fitness center that will speed up customer record keeping. Developed server part, client part and admin panel.

![](demo-befit.gif)

## Technologies
Project is created with:
* React: 18.1.0
* SAAS: 1.51.0
* Bootstrap: 5.1.3
* MySQL: 2.3.3
* Express: 4.17.2
* Sequelize: 6.15.0

## Features

The web application provides the following features: 
- [x] Client registration and authorization;
- [x] Client registration for classes; 
- [x] Cancellation of class registration by the client and the administrator;
- [x] Displaying the current schedule; 
- [x] Adding reviews by the client;
- [x] Adding/deleting/editing customer data; 
- [x] Adding/deleting/editing administrator data; 
- [x] Adding/deleting/editing trainer data;
- [x] Adding/deleting/editing class data;
- [x] Adding/deleting/updating class data (creating a schedule);
- [x] Adding/deleting/updating class registration data.

## Setup

To run this project, install it locally using npm:

```
$ npm install
$ cd backend
$ npm start
$ cd ../frontend/client
$ npm start
$ cd ../admin
$ npm start
```
