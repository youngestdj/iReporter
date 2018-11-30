//import express from 'express';
//import {
//  createRedFlag, getRedFlags, getSpecificRedFlag, updateLocation, updateComment, deleteRedFlag,
//} from '../controllers/red_flags';

const exp = require('express');
const cont = require('../controllers/red_flags.js');

const router = exp.Router();

router.post('/api/v1/red-flags', cont.createRedFlag);
router.get('/api/v1/red-flags', cont.getRedFlags);
router.get('/api/v1/red-flags/:id', cont.getSpecificRedFlag);
router.patch('/api/v1/red-flags/:id/location', cont.updateLocation);
router.patch('/api/v1/red-flags/:id/comment', cont.updateComment);
router.delete('/api/v1/red-flags/:id', cont.deleteRedFlag);

module.exports = router;
