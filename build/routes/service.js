"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const validator_1 = __importDefault(require("validator"));
const Service = require('../models/service');
router.post('/create', (req, res, next) => {
    if (!validator_1.default.isUUID(req.body.uuid)) {
        res.status(400).send('Invalid UUID');
        return;
    }
    else if (!validator_1.default.isLatLong([req.body.currentLocation.lat, req.body.currentLocation.lon].join())) {
        res.status(400).send('currentLocation must have lat and lon');
        return;
    }
    Service.create({
        uuid: req.body.uuid,
        type: req.body.type,
        name: req.body.name,
        currentLocation: req.body.currentLocation,
        details: req.body.details
    }, (err, service) => {
        if (err) {
            res.status(500).send('Internal Error');
        }
        else {
            res.status(200).send(service);
        }
    });
});
router.get('/getService', (req, res, next) => {
    if (!validator_1.default.isUUID(req.body.uuid)) {
        res.status(400).send('Invalid UUID');
        return;
    }
    Service.findOne({
        uuid: req.query.uuid
    }, (err, service) => {
        if (err) {
            res.status(500).send('Internal Error');
        }
        else {
            res.status(200).send(service);
        }
    });
});
router.post('/updateLocation', (req, res, next) => {
    if (!validator_1.default.isUUID(req.body.uuid)) {
        res.status(400).send('Invalid UUID');
        return;
    }
    else if (!validator_1.default.isLatLong([req.body.currentLocation.lat, req.body.currentLocation.lon].join())) {
        res.status(400).send('currentLocation must have lat and lon');
        return;
    }
    Service.updateOne({
        uuid: req.body.uuid
    }, {
        $set: { currentLocation: req.body.currentLocation }
    }, (err, service) => {
        if (err) {
            res.status(500).send({ message: err });
        }
        else {
            res.status(200).send("Location updated successfully");
        }
    });
});
router.post('/getLocation', (req, res, next) => {
    if (!validator_1.default.isUUID(req.body.uuid)) {
        res.status(400).send('Invalid UUID');
        return;
    }
    Service.findOne({
        uuid: req.body.uuid
    }, (err, service) => {
        if (err) {
            res.status(500).send('Internal Error');
        }
        else if (!service) {
            res.status(404).send('Service not found');
        }
        else {
            res.status(200).send(service.currentLocation);
        }
    });
});
router.get('/getAllServices', (req, res, next) => {
    Service.find({}, (err, services) => {
        if (err) {
            res.status(500).send('Internal Error');
        }
        else {
            res.status(200).send(services);
        }
    });
});
router.post('/updateDetails', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!validator_1.default.isUUID(req.body.uuid)) {
        res.status(400).send('Invalid UUID');
        return;
    }
    else if (!req.body.details) {
        res.status(500).send("Invalid details");
        return;
    }
    Service.updateOne({
        uuid: req.body.uuid
    }, {
        $set: { details: req.body.details }
    }, (err, service) => {
        if (err) {
            res.status(500).send({ message: err });
        }
        else {
            res.status(200).send("Details updated successfully");
        }
    });
}));
module.exports = router;
