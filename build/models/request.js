"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const RequestSchema = new mongoose_1.default.Schema({
    location: {
        lat: {
            type: Number,
            required: true,
        },
        lon: {
            type: Number,
            required: true,
        }
    },
    phone: {
        type: String,
        required: true,
    },
    details: {
        type: String
    },
    status: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
    collection: 'request'
});
module.exports = mongoose_1.default.model('Request', RequestSchema);
