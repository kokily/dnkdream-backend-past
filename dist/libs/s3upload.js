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
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const fs_1 = __importDefault(require("fs"));
const moment_1 = __importDefault(require("moment"));
// AWS Config
aws_sdk_1.default.config.update({
    region: 'ap-northeast-2',
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
});
// S3 Version
const s3 = new aws_sdk_1.default.S3({
    apiVersion: '2006-03-01',
});
const uploadImage = (file) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const Params = {
            Bucket: 'image.dnkdream.com',
            Body: fs_1.default.createReadStream(file.uri),
            Key: `${(0, moment_1.default)().format('YYMMDD_HHmmss')}_${file.name.trim()}`,
            ContentType: file.type,
        };
        Params.Body.on('error', (err) => {
            reject(err);
        });
        s3.upload(Params, (err, data) => {
            if (err) {
                reject(err);
            }
            else if (data) {
                resolve({
                    key: data.Key,
                    url: data.Location,
                });
            }
        });
    });
});
exports.default = uploadImage;
