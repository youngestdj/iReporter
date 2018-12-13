import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

const hashedPwd = bcrypt.hashSync('abcdef', 8);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const createTableUsers = `CREATE TABLE ireporter_users(
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
  )`;
const createTableRecords = `CREATE TABLE records(
    id SERIAL PRIMARY KEY,
    createdOn VARCHAR(100) not null,
    createdBy VARCHAR(50) not null,
    type VARCHAR(50) not null,
    location VARCHAR(100) not null,
    status VARCHAR(50) not null default 'draft',
    Images VARCHAR(500),
    Videos VARCHAR(50),
    title VARCHAR(100) not null,
    comment VARCHAR(1000) not null
  )`;

const query = `INSERT into ireporter_users(
  email, firstname, lastname, othernames, username, registered, phonenumber, password, isadmin) VALUES(
  'jessam@joyson.com', 'john', 'doe', 'jaime', 'lannister', 'today', '123456789', '${hashedPwd}', 'true')`;

const query8 = `INSERT into ireporter_users(
  email, firstname, lastname, othernames, username, registered, phonenumber, password) VALUES(
  'jessam1@joyson.com', 'john', 'doe', 'jaime', 'lannister', 'today', '123456789', '${hashedPwd}')`;

const query1 = `INSERT into records(
  createdOn, createdBy, type, location, comment, title) VALUES(
  'today', '1', 'red-flags', 'Lagos', 'Test comment', 'Test title')`;

const query2 = `INSERT into records(
  createdOn, createdBy, type, location, comment, title) VALUES(
  'today', '1', 'red-flags', 'Lagos', 'Test comment', 'Test title')`;
const query3 = `INSERT into records(
  createdOn, createdBy, type, location, comment, title) VALUES(
  'today', '1', 'red-flags', 'Lagos', 'Test comment', 'Test title')`;
const query4 = `INSERT into records(
  createdOn, createdBy, type, location, comment, title) VALUES(
  'today', '1', 'intervention', 'Lagos', 'Test comment', 'Test title')`;
const query5 = `INSERT into records(
  createdOn, createdBy, type, location, comment, title) VALUES(
  'today', '1', 'intervention', 'Lagos', 'Test comment', 'Test title')`;
const query7 = `INSERT into records(
  createdOn, createdBy, type, location, comment, title) VALUES(
  'today', '1', 'intervention', 'Lagos', 'Test comment', 'Test title')`;
const query6 = 'select id, type from records';


pool.query(createTableUsers).then((res) => {
  pool.query(createTableRecords).then((res) => {
    pool.query(query).then((res) => {
      pool.query(query1).then((res) => {
        pool.query(query2).then((res) => {
          pool.query(query3).then((res) => {
            pool.query(query4).then((res) => {
              pool.query(query5).then((res) => {
                pool.query(query7).then((res) => {
                  pool.query(query8).then((res) => {
                    pool.query(query6).then(res => console.log(res));
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});
