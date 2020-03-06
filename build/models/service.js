"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ServiceSchema = new mongoose_1.default.Schema({
    uuid: {
        type: String,
        required: true,
    },
    serviceType: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    currentLocation: {
        lat: {
            type: Number,
            required: true,
        },
        lon: {
            type: Number,
            required: true,
        }
    },
    details: {
        type: String
    }
}, {
    timestamps: true,
    collection: 'service'
});
module.exports = mongoose_1.default.model('Service', ServiceSchema);
