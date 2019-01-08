import { Pool } from 'pg';
import { insert, update, deleteRow } from './db_helpers';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

/**
 * RecordsModel class
 */
class RecordsModel {
  /**
   * Insert record into database
   * @param  {object} data record details
   * @return {boolean}      true
   */
  static async createRecord(data) {
    const id = insert(data, 'records');
    return id;
  }

  /**
   * Get either intervention or red flag records from the database
   * @param  {string} type intervention or red-flags
   * @param  {int} id userid
   * @param  {string} isAdmin true or false
   * @return {object}      records object
   */
  static async getAllRecords(type, id, isAdmin) {
    let query;
    if (isAdmin === 'true') query = `SELECT * from records where type = '${type}'`;
    else query = `SELECT * from records where type = '${type}' AND createdby = '${id}'`;
    const result = await pool.query(query);
    return result.rows;
  }

  /**
   * Get a specific record
   * @param  {int} id   record id
   * @param  {string} type record type
   * @return {object}      record object
   */
  static async getSpecificRecord(id) {
    const query = `SELECT * from records where id = '${id}'`;
    const result = await pool.query(query);
    return result.rows[0];
  }

  /**
   * Update a record'slocation
   * @param  {int} id   record id
   * @param  {object} data data
   * @return {boolean}      true
   */
  static async updateField(id, data) {
    update(id, data, 'records');
  }

  /**
   * delete a record
   * @param  {int} id record id
   * @return {boolean}    success or failure
   */
  static async deleteRecord(id) {
    deleteRow(id, 'records');
  }
}
export default RecordsModel;
