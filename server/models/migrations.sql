CREATE TABLE ireporter_users(
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
CREATE TABLE records(
    id SERIAL PRIMARY KEY,
    createdOn VARCHAR(100) not null,
    createdBy VARCHAR(50) not null,
    type VARCHAR(50) not null,
    location VARCHAR(100) not null,
    status VARCHAR(50) not null default 'draft',
    Images VARCHAR(500),
    Videos VARCHAR(50),
    comment VARCHAR(1000) not null,
    title VARCHAR(100) not null
)
