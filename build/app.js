"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
require('dotenv').config();
const app = express_1.default();
const port = 3000;
const connectionString = process.env.DB_CONNECTION_STRING;
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use(body_parser_1.default.urlencoded({ extended: false })); // parse x-www-form-urlencoded
app.use(body_parser_1.default.json()); // parse JSON
app.use('/api/account', require('./middleware/verify'), require('./routes/account'));
app.use('/api/service', require('./middleware/verify'), require('./routes/service'));
app.use('/api/request', require('./routes/request'));
mongoose_1.default.connect(connectionString, // connection string
{ useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log('Unable to connect to Mongo.', err);
        process.exit(1);
    }
    else {
        app.listen(port, () => {
            console.log(`Listening on port ${port}...`);
        });
        mongoose_1.default.connection.on('error', (err) => {
            console.error(err);
        });
    }
});
