//import { redFlagFilled, validId, redFlagExists } from '../helper';
//import redFlags from '../mockdata';

const helper = require('../helper.js');
const mockData = require('../mockdata.js')

exports.createRedFlag = (request, response) => {
  if (!helper.redFlagFilled(request.body)) {
    response.status(422).json({ status: 422, error: 'invalid data' });
  } else {
    const id = mockData.redFlags.length + 1;
    const title = request.body.title.trim();
    const dateObj = new Date();
    const createdOn = `${dateObj.getFullYear()} / ${(dateObj.getMonth() + 1)} / ${dateObj.getDate()}`;
    const status = 'new';
    const createdBy = 1;
    const type = 'red-flag';
    const location = request.body.location.trim();
    const comment = request.body.comment.trim();

    const data = {
      id, title, createdOn, status, createdBy, type, location, comment,
    };

    mockData.redFlags.push(data);
    response.status(201).json({ status: 201, data: [{ id, message: 'created red-flag record' }] });
  }
};

exports.getRedFlags = (request, response) => {
  response.status(200).json({ status: 200, data: mockData.redFlags });
};

exports.getSpecificRedFlag = (request, response) => {
  if (!helper.validId(request.params.id)) {
    response.status(422).json({ status: 422, error: 'Invalid URL' });
  } else if (!helper.redFlagExists(request.params.id, mockData.redFlags)) {
    response.status(404).json({ status: 404, error: 'record not found' });
  } else {
    response.status(200).json({ status: 200, data: [mockData.redFlags[request.params.id - 1]] });
  }
};

exports.updateLocation = (request, response) => {
  if (!helper.validId(request.params.id) || !request.body.location) {
    response.status(422).json({ status: 422, error: 'Invalid URL' });
  } else if (!helper.redFlagExists(request.params.id, mockData.redFlags)) {
    response.status(404).json({ status: 404, error: 'record not found' });
  } else {
    mockData.redFlags[request.params.id - 1].location = request.body.location;
    response.status(201).json({ status: 201, data: [{ id: request.params.id, message: 'Updated red-flag record’s location' }] });
  }
};

exports.updateComment = (request, response) => {
  if (!helper.validId(request.params.id) || !request.body.comment) {
    response.status(422).json({ status: 422, error: 'Invalid URL' });
  } else if (!helper.redFlagExists(request.params.id, mockData.redFlags)) {
    response.status(404).json({ status: 404, error: 'record not found' });
  } else {
    mockData.redFlags[request.params.id - 1].comment = request.body.comment;
    response.status(201).json({ status: 201, data: [{ id: request.params.id, message: 'Updated red-flag record’s comment' }] });
  }
};

exports.deleteRedFlag = (request, response) => {
  if (!helper.redFlagExists(request.params.id, mockData.redFlags)) {
    response.status(404).json({ status: 404, error: 'record not found' });
  } else {
    delete mockData.redFlags[request.params.id - 1];
    response.status(200).json({ status: 200, data: [{ id: request.params.id, message: 'red-flag record has been deleted' }] });
  }
};
