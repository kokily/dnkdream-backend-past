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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateToken(payload, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const secretKey = process.env.JWT_SECRET;
        const jwtOptions = Object.assign({ issuer: 'dnkdream.com', expiresIn: '3d' }, options);
        if (!jwtOptions.expiresIn) {
            delete jwtOptions.expiresIn;
        }
        return new Promise((resolve, reject) => {
            if (!secretKey)
                return;
            jsonwebtoken_1.default.sign(payload, secretKey, jwtOptions, (err, token) => {
                if (err || token === undefined) {
                    reject(err);
                }
                else {
                    resolve(token);
                }
            });
        });
    });
}
exports.default = generateToken;
