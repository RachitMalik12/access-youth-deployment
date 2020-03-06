"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.JWT_SECRET;
const routes = ['/create', '/details', '/updateLocation', '/updateDetails'];
router.use(routes, (req, res, next) => {
    // authentication header leads with 'Bearer '
    const authString = (typeof req.headers.authorization === 'string') ? req.headers.authorization.split(' ')[1] : '';
    jsonwebtoken_1.default.verify(authString, secret, (err, decoded) => {
        if (err) {
            res.status(401).send('Invalid token'); // not authenticated
        }
        else {
            res.locals.payload = decoded.payload;
            next();
        }
    });
});
module.exports = router;
