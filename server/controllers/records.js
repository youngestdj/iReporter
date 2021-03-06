import { recordFilled, dateString } from '../helper';
import RecordsModel from '../models/records';

/**
 * Redflag class
 */
class Records {
/**
 * Create a red flag record
 * @param  {object} request  http request object
 * @param  {object} response http response object
 * @return {object}          json object
 */
  static async createRecord(request, response) {
    if (!recordFilled(request.body)) {
      return response.status(400).json({
        status: 400,
        error: 'invalid data',
      });
    }
    const title = request.body.title.trim();
    const createdOn = dateString();
    let type = request.route.path.substr(1);
    if (type === 'interventions') type = 'intervention';
    const location = request.body.location.trim();
    const comment = request.body.comment.trim();
    const images = (request.body.images) ? request.body.images : '';
    const videos = (request.body.videos) ? request.body.videos : '';
    const createdBy = (request.body.createdby) ? request.body.createdby : request.userid;
    const data = {
      title, createdOn, type, location, comment, images, videos, createdBy,
    };

    const message = `Created ${type} record`;
    const id = await RecordsModel.createRecord(data);
    return response.status(201).json({
      status: 201,
      data: [{
        id,
        message,
      }],
    });
  }

  /**
 * get all red flag records
 * @param  {object} request  http request object
 * @param  {object} response http response object
 * @return {object}          json object
 */
  static async getRecords(request, response) {
    let type = request.route.path.substr(1);
    if (type === 'interventions') type = 'intervention';
    const records = await RecordsModel.getAllRecords(type, request.userid, request.isadmin);
    return response.status(200).json({
      status: 200,
      data: records,
    });
  }

  /**
 * get a specific red flag record
 * @param  {object} request  http request object
 * @param  {object} response http response object
 * @return {object}          json object
 */
  static async getSpecificRecord(request, response) {
    const record = await RecordsModel.getSpecificRecord(request.params.id);
    return response.status(200).json({
      status: 200,
      data: [record],
    });
  }

  /**
 * Update a record's location
 * @param  {object} request  http request object
 * @param  {object} response http response object
 * @return {object}          json object
 */
  static async updateRecord(request, response) {
    const data = {};
    if (request.recordField === 'comment') {
      data.comment = request.content;
    } else if (request.recordField === 'location') {
      data.location = request.content;
    } else {
      data.status = request.content;
      if (data.status !== 'draft' && data.status !== 'resolved'
        && data.status !== 'under investigation' && data.status !== 'rejected') {
        return response.status(400).json({
          status: 400,
          error: 'Status can only be updated as draft, resolved, under investigation or rejected',
        });
      }
    }

    await RecordsModel.updateField(request.params.id, data);
    const message = `Updated ${request.recordType} ${request.recordField}`;
    return response.status(200).json({
      status: 200,
      data: [{
        id: request.params.id,
        message,
      }],
    });
  }

  /**
 * delete a red flag record
 * @param  {object} request  http request
 * @param  {object} response http response
 * @return {object}          json object
 */
  static async deleteRecord(request, response) {
    RecordsModel.deleteRecord(request.params.id);
    const message = `${request.recordType} record has been deleted`;
    return response.status(200).json({
      status: 200,
      data: [{
        id: request.params.id,
        message,
      }],
    });
  }
}

export default Records;
