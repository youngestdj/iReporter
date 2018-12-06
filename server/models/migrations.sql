CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) not null,
    firstname VARCHAR(50) not null,
    lastname VARCHAR(50) not null,
    othernames VARCHAR(50) not null,
    username VARCHAR(50) not null,
    registered VARCHAR(50) not null,
    phonenumber VARCHAR(50) not null,
    password VARCHAR(200) not null,
    isadmin VARCHAR(10) default 'user'
)