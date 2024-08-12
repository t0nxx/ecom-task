# Ecom Task

## Installation

- open your terminal and follow this steps
- clone this repository

```bash
$ git clone https://github.com/t0nxx/ecom-task.git
```

- navigate to the project directory

```bash
$ cd ecom-task
```

- create a .env file copied from .env.example

```bash
$ cp .env.example .env
```

- change required credentials with your credentials in .env file

- install required dependencies

```bash
$ npm install
```

- migrate and clean db (after u set a valid database url in .env file)

```bash
$ npm run db:reset
```

- (optional) seed the database (prepared records)

```bash
$ npm run db:seed
```

## Running the app

```bash
# development
$ npm run start:dev
```

- visit swagger api doc in your browser 
http://127.0.0.1:3003/docs
