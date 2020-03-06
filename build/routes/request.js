"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const validator_1 = __importDefault(require("validator"));
const UserRequest = require('../models/request');
router.post('/create', (req, res, next) => {
    if (!validator_1.default.isLatLong([req.body.location.lat, req.body.location.lon].join())) {
        res.status(400).send('location must have lat and lon');
        return;
    }
    else if (!validator_1.default.isMobilePhone(req.body.phone, validator_1.default.isMobilePhoneLocales)) {
        res.status(400).send('Invalid phone number');
        return;
    }
    UserRequest.create({
        location: req.body.location,
        phone: req.body.phone,
        details: req.body.details,
        status: 'valid'
    }, (err, userRequest) => {
        if (err) {
            res.status(500).send('Internal Error');
        }
        else {
            res.status(200).send(userRequest);
        }
    });
});
router.get('/getAllRequests', (req, res, next) => {
    UserRequest.find({ status: 'valid' }, (err, userRequest) => {
        if (err) {
            res.status(500).send('Internal Error');
        }
        else {
            res.status(200).send(userRequest);
        }
    });
});
module.exports = router;
