# iReporter
[![Build Status](https://travis-ci.com/youngestdj/iReporter.svg?branch=develop)](https://travis-ci.com/youngestdj/iReporter) [![Coverage Status](https://coveralls.io/repos/github/youngestdj/iReporter/badge.svg?branch=ch-add-unit-tests-162247054)](https://coveralls.io/github/youngestdj/iReporter?branch=ch-add-unit-tests-162247054) <a href="https://codeclimate.com/github/youngestdj/iReporter/test_coverage"><img src="https://api.codeclimate.com/v1/badges/75d056a46438dc517072/test_coverage" /></a> [![Maintainability](https://api.codeclimate.com/v1/badges/75d056a46438dc517072/maintainability)](https://codeclimate.com/github/youngestdj/iReporter/maintainability)


iReporter enables any/every citizen to bring any form of corruption to the notice of appropriate authorities and the general public.
## Getting started
The instructions below will guide you on how to run a copy of the project locally.
### Prerequisites
You need to have `node.js`  installed on your machine. Other `node` packages will be installed with `npm install`
### Installation
Clone the repo to your machine and run `npm install` in your terminal
### Running the app
`npm start`
### Running the tests
To run the tests type `npm run test` in your terminal.

## Rest API
### Get all red flag records
`GET api/v1/red-flags`

### Create a new red flag record
`POST api/v1/red-flags`
#### Request
```
{
      "title": "Test red-flag",
      "location": "Test location",
      "comment": "Test comment",
}
```

### Get a specific red flag record
`GET api/v1/red-flags/:id`
#### Request
`GET api/v1/red-flags/1`

### Update specific red flag record location
`PATCH api/v1/red-flags/:id/location`
#### Request
`PATCH api/v1/red-flags/1/location`
```
{
    "location":"6.5244° N, 3.3792° E"
}
```

### Update specific red flag record comment
`PATCH api/v1/red-flags/:id/comment`
#### Request
`PATCH api/v1/red-flags/1/comment`
```
{
    "comment": "This new comment replaces the old one"
}
```

### delete a specific red flag record
`DELETE api/v1/red-flags/:id`
#### Request
`DELETE api/v1/red-flags/1`

### Sign up
`POST api/v1/auth/signup`
#### Request
```
{
    "email": "email@domain.com",
    "firstname": "firstname",
    "lastname": "lastname",
    "othernames": "Othernames",
    "phonenumber": "12345678910",
    "password": "pass",
    "username": "username"
}
```

### Log in
`POST api/v1/auth/login`
#### Request
```
{
    "email": "email@domain.com",
    "password": "pass"
}
```

##### Links
* https://youngestdj.github.io/iReporter - template url
* https://jessam-ireporter.herokuapp.com - server url
* https://www.pivotaltracker.com/n/projects/2226817 - Pivotal tracker board


