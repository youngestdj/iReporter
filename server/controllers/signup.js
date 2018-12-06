const bcrypt = require('bcryptjs');
const models = require('../models/signup.js');
const helper = require('../helper.js');

exports.signUserUp = async (request, response) => {
  // check if all fields are filled
  const validData = await models.fieldsAreFilled(request.body);
  if (!validData) {
    response.status(400).json({
      status: 400,
      error: 'Invalid data. Ensure that all fields are filled',
    });
    return;
  }

  // check if all alphabetic fields are valid
  const fieldsAreNotLetters = await models.fieldsAreNotLetters(request.body);
  if (fieldsAreNotLetters) {
    response.status(422).json({
      status: 422,
      error: fieldsAreNotLetters,
    });
    return;
  }


  // check if email is valid
  if (!helper.isEmail(request.body.email)) {
    response.status(422).json({
      status: 422,
      error: 'Invalid email',
    });
    return;
  }

  // check if email does not exist in the database already
  const userExists = await models.userExists(request.body.email);
  if (userExists) {
    response.status(409).json({
      status: 409,
      error: 'User already exists',
    });
    return;
  }

 // check if username does not exist in the database already
  const usernameExists = await models.usernameExists(request.body.username);
  if (usernameExists) {
    response.status(409).json({
      status: 409,
      error: 'Username already exists. Pleasee choose another one',
    });
    return;
  }

  // hash password
  const hashedPwd = bcrypt.hashSync(request.body.password, 8);

  // set date up
  const dateObj = new Date();
  const regDate = `${dateObj.getFullYear()} / ${(dateObj.getMonth() + 1)} / ${dateObj.getDate()}`;

  // final data
  const data = {
    firstname: request.body.firstname,
    lastname: request.body.lastname,
    othernames: request.body.othernames,
    email: request.body.email,
    username: request.body.username,
    phonenumber: request.body.phonenumber,
    password: hashedPwd,
    registered: regDate,
  };

  await models.signUserUp(data);
  await delete data.password;

  response.status(201).json({
    status: 201,
    data: [{
      user: data,
    }],
  });
};
