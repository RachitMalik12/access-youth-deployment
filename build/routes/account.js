"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const validator_1 = __importDefault(require("validator"));
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.JWT_SECRET;
const Account = require('../models/account');
router.post('/create', (req, res, next) => {
    // if (!validator.isEmail(req.body.email)) {
    //   res.status(400).send('email is not valid');
    //   return;
    // }
    if (!validator_1.default.isAlphanumeric(req.body.username)) {
        res.status(400).send('username is not valid');
        return;
    }
    else if (!validator_1.default.isLength(req.body.password, { min: 8 })) {
        res.status(400).send('password is not valid');
        return;
    }
    // callback cheese, revamp to promises
    Account.findOne({
        username: req.body.username,
        status: 'valid'
    }, (err, account) => {
        if (err) {
            res.status(500).send('Internal Error');
            return;
        }
        else {
            if (account) {
                res.status(400).send('Username already taken');
                return;
            }
            else {
                Account.create({
                    // email: req.body.email,
                    username: req.body.username,
                    password: crypto_1.default.createHash('md5').update(req.body.password).digest('hex'),
                    accountType: req.body.accountType,
                    status: 'valid'
                }, (err, account) => {
                    if (err) {
                        res.status(500).send('Internal Error');
                    }
                    else {
                        res.status(200).send(account);
                    }
                });
            }
        }
    });
});
router.get('/details', (req, res, next) => {
    // goes through the verify middleware so if it reaches here token is valid
    res.status(200).send(res.locals.payload);
    return;
});
router.post('/login', (req, res, next) => {
    // if (!validator.isEmail(req.body.email)) {
    //   res.status(400).send('email is not valid');
    //   return;
    // }
    if (!validator_1.default.isAlphanumeric(req.body.username)) {
        res.status(400).send('username is not valid');
        return;
    }
    else if (!validator_1.default.isLength(req.body.password, { min: 8 })) {
        res.status(400).send('password is not valid');
        return;
    }
    Account.findOne({
        // email: req.body.email,
        username: req.body.username,
        password: crypto_1.default.createHash('md5').update(req.body.password).digest('hex'),
        status: 'valid'
    }, (err, account) => {
        if (err) {
            res.status(500).send('Internal Error');
        }
        else if (!account) {
            res.status(400).send('Account not found');
        }
        else {
            jsonwebtoken_1.default.sign({ payload: account }, secret, { expiresIn: 86400 }, (err, token) => {
                if (err) {
                    res.status(500).send('Failed to create token');
                }
                else {
                    res.status(200).send(token);
                }
            });
        }
    });
});
module.exports = router;
