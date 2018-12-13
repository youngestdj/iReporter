import express from 'express';
import Records from '../controllers/records';
import Auth from '../middleware/auth';
import {
  validateUrl,
  validateRecordType,
  getRecordType,
  validateRecordField,
} from '../helper';

const router = express.Router();

router.post('/red-flags', Records.createRecord);
router.post('/interventions', Records.createRecord);
router.get('/red-flags', Records.getRecords);
router.get('/interventions', Records.getRecords);
router.get('/red-flags/:id', getRecordType, validateUrl, Records.getSpecificRecord);
router.get('/interventions/:id', getRecordType, validateUrl, Records.getSpecificRecord);
router.patch('/red-flags/:id/location', getRecordType, validateUrl, validateRecordType, Records.updateRecord);
router.patch('/interventions/:id/location', getRecordType, validateUrl, validateRecordType, Records.updateRecord);
router.patch('/red-flags/:id/status', Auth.verifyAdmin, getRecordType, validateUrl, validateRecordType, Records.updateRecord);
router.patch('/red-flags/:id/comment', getRecordType, validateUrl, validateRecordType, Records.updateRecord);
router.patch('/interventions/:id/comment', getRecordType, validateUrl, validateRecordType, Records.updateRecord);
router.delete('/red-flags/:id', getRecordType, validateUrl, validateRecordField, Records.deleteRecord);

module.exports = router;
