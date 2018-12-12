import {
  redFlagFilled, validId, redFlagExists, dateString,
} from '../helper';
import redFlags from '../mockdata';

/**
 * Redflag class
 */
class RedFlag {
/**
 * Create a red flag record
 * @param  {object} request  http request object
 * @param  {object} response http response object
 * @return {object}          json object
 */
  static async createRedFlag(request, response) {
    if (!redFlagFilled(request.body)) {
      response.status(400).json({
        status: 400,
        error: 'invalid data',
      });
    } else {
      const id = redFlags.length + 1;
      const title = request.body.title.trim();
      const createdOn = dateString;
      const status = 'new';
      const createdBy = 1;
      const type = 'red-flag';
      const location = request.body.location.trim();
      const comment = request.body.comment.trim();

      const data = {
        id, title, createdOn, status, createdBy, type, location, comment,
      };

      redFlags.push(data);
      response.status(201).json({
        status: 201,
        data: [{
          id,
          message: 'created red-flag record',
        }],
      });
    }
  }

  /**
 * get all red flag records
 * @param  {object} request  http request object
 * @param  {object} response http response object
 * @return {object}          json object
 */
  static async getRedFlags(request, response) {
    response.status(200).json({
      status: 200,
      data: redFlags,
    });
  }

  /**
 * get a specific red flag record
 * @param  {object} request  http request object
 * @param  {object} response http response object
 * @return {object}          json object
 */
  static async getSpecificRedFlag(request, response) {
    if (!validId(request.params.id)) {
      response.status(422).json({
        status: 422,
        error: 'Invalid URL',
      });
    } else if (!redFlagExists(request.params.id, redFlags)) {
      response.status(404).json({
        status: 404,
        error: 'record not found',
      });
    } else {
      response.status(200).json({
        status: 200,
        data: [redFlags[request.params.id - 1]],
      });
    }
  }

  /**
 * Update a record's location
 * @param  {object} request  http request object
 * @param  {object} response http response object
 * @return {object}          json object
 */
  static async updateLocation(request, response) {
    if (!validId(request.params.id) || !request.body.location) {
      response.status(422).json({
        status: 422,
        error: 'Invalid URL',
      });
    } else if (!redFlagExists(request.params.id, redFlags)) {
      response.status(404).json({
        status: 404,
        error: 'record not found',
      });
    } else {
      redFlags[request.params.id - 1].location = request.body.location;
      response.status(200).json({
        status: 200,
        data: [{
          id: request.params.id,
          message: 'Updated red-flag record’s location',
        }],
      });
    }
  }

  /**
 * Update a record'scomment
 * @param  {object} request  http request object
 * @param  {object} response http response object
 * @return {object}          json object
 */
  static async updateComment(request, response) {
    if (!validId(request.params.id) || !request.body.comment) {
      response.status(422).json({
        status: 422,
        error: 'Invalid URL',
      });
    } else if (!redFlagExists(request.params.id, redFlags)) {
      response.status(404).json({
        status: 404,
        error: 'record not found',
      });
    } else {
      redFlags[request.params.id - 1].comment = request.body.comment;
      response.status(200).json({
        status: 200,
        data: [{
          id: request.params.id,
          message: 'Updated red-flag record’s comment',
        }],
      });
    }
  }

  /**
 * delete a red flag record
 * @param  {object} request  http request
 * @param  {object} response http response
 * @return {object}          json object
 */
  static async deleteRedFlag(request, response) {
    if (!redFlagExists(request.params.id, redFlags)) {
      response.status(404).json({
        status: 404,
        error: 'record not found',
      });
    } else {
      delete redFlags[request.params.id - 1];
      response.status(200).json({
        status: 200,
        data: [{
          id: request.params.id,
          message: 'red-flag record has been deleted',
        }],
      });
    }
  }
}
export default RedFlag;
