# Web-workout-manager
[![Build Status](https://travis-ci.org/grozak/Web-workout-manager.svg?branch=master)](https://travis-ci.org/grozak/Web-workout-manager)

## Application public URL
https://web-workout-manager.herokuapp.com/

### Docker Hub repository
https://hub.docker.com/r/dawd333/web-workout-manager

### Application description
#### Application is an online workout manager which main goal is to help collecting your daily progress. It allows user to keep his workout details in one place in a form of calendar and share it with other people. It uses an external workout data from https://wger.de/api/v2/. There is a possibility to register and login using traditional style or via Facebook. Share your workout with your friends and together reach your dreams !!

### Requirements
- Java 8
- Gradle

### How to setup
- clone project : `git clone https://github.com/grozak/Web-workout-manager.git`
- enter directory : `cd Web-workout-manager/`
- install dependencies : `gradle build`

> Yes we are aware of issues with database max connections, but we are poor students - if error occurs please change database to different

### Running locally
- create jar : `gradle bootJar`
- run the application : `gradle bootRun`

### Running with docker
- create Dockerfile and Docker Image : `gradle buildImage`
- start a Docker with application : `docker run -p 9380:9380 dawd333/web-workout-manager:0.0.1`

##### In both cases application will be ready on localhost:9380
##### Signing in and logging with Facebook is not available on localhost - Facebook blocks it


### Database schema
![Database schema](/db_schema.png)
