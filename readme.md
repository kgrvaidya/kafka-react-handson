# Kafka - NodeJS - MongoDB - React

## This is a POC for integrating kafka with Node and Mongo, and consuming the data published from node in Kafka on React

**Note** This requires local kafka setup. If you don't have kafka set up locally, follow the below steps to install and run kafka.
This **_how to_** is with respect to windows confuguration.

- use this [link](https://www.goavega.com/install-apache-kafka-on-windows/) to configure kafka for windows machine.

## Getting started\*\*

- Clone or download the repo
- run `npm i` on **kafka-demo-ui** and **server - including producer** since both have dependencies
- After installing dependencies, first run kafka server. How to start kafka can be found [here](https://kafka.apache.org/quickstart). But, change the directory to `bin/windows` and in all the commands, change the relative path for **config** files and replace **.sh** with **.bat**, like this ->

```
  C:\kafka\bin\windows>zookeeper-server-start.bat ../../config/zookeeper.properties
```

- run `npm start` on both **kafka-demo-ui** and **server - including producer** to start client and server
