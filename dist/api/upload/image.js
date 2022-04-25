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
const s3upload_1 = __importDefault(require("../../libs/s3upload"));
const image = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (ctx.request.files) {
        const file = ctx.request.files.file;
        const { key, url } = yield (0, s3upload_1.default)(file);
        ctx.body = { key, url };
    }
    else {
        return next();
    }
});
exports.default = image;
