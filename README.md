  

# Techwondoe

  
  

The Task Basically from Node(NestJs+Postgresql) +Docker Setup

  

Requires

  

- Nodejs v18

- Docker v24.0.2

  ## Getting Started

# 1 Clone the repository:

  

git clone [https://github.com/girisk/techwondoe.git]

Master branch

  

# 2 project Setup

cd project-name

npm install

  

# 3 Docker Setup

 ## 1. Install Docker Desktop on your machine.

##  2. Pull the PostgreSQL Docker image:
docker pull postgres

##  3. Run a PostgreSQL container:

docker run --name postgres-container -e POSTGRES_PASSWORD=<password> -p 5432:5432 -d postgres

##  4. Check if the Docker container is running:

docker ps

##  5. Connect to the PostgreSQL database:

psql -h localhost -p 5432 -U postgres


##  6. Create a new database:

CREATE DATABASE techwondoe

	Note: Replace `<username>` and `<database>` with your desired values.

##  7. Verify the database creation:

\c techwondoe

To check the tables, use the command:

\dt

  
Setup **.env** configuration

1. Set up the environment variables by creating a `.env` file in the project root directory. Example:

# App Configuration
APP_PORT=3000

# Database Configuration
DB_HOST=172.17.0.2

DB_PORT=5432

DB_USERNAME='name'

DB_PASSWORD='password'

DB_DATABASE='techwondoe'

# JWT Configuration

JWT_SECRET='grokonez-super-secret-key'

JWT_EXPIRATION_TIME=3600




# Building and Running the Project with Docker

inside project folder open and stepout **cd/**
  
## Build the Docker image:
**docker build .\techwonde\ -t giriram/techwonde**
## Run the Docker container
**docker run -p 8080:3000 giriram/techwonde**

  

## Access the API platform from Swagger UI
  

http://localhost:8080/api

## Additional Information

For any further clarification or questions, please feel free to reach out. Enjoy coding!

