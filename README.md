  

# Techwondoe

  
  

The Task Basically from Node(NestJs+Postgresql) +Docker Setup

  

Requires

  

- Nodejs v18

- Docker v24.0.2

  

# Clone the repository:

  

git clone [https://github.com/girisk/techwondoe.git]

Master branch

  

# project Setup

cd project-name

npm install

  

# Docker Setup

install desktop docker

  

## Postgresql setup inside docker

  

docker pull postgres

docker run --name postgres-container -e POSTGRES_PASSWORD=<password> -p 5432:5432 -d postgres

## check docker

docker ps

psql -h localhost -p 5432 -U postgres //db connect

psql -U <username> -d <database>

## Need to create db inside pg

**CREATE DATABASE techwonde;**

\c techwonde //check db the db

\dt -tables // check tables

  

# Project setup in Docker

inside project folder open and stepout **cd/**

  

Setup **.env** configuration

  

**docker build .\techwonde\ -t giriram/techwonde**

**docker run -p 8080:3000 giriram/techwonde**

  

Accessing the platform from swagger UI

  

http://localhost:8080/api

