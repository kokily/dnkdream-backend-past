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
exports.dataSource = void 0;
require("dotenv/config");
const https_1 = __importDefault(require("https"));
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
const typeorm_1 = require("typeorm");
const app_1 = __importDefault(require("./app"));
const entities_1 = __importDefault(require("./entities"));
exports.dataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5432,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    synchronize: true,
    logging: false,
    entities: entities_1.default,
});
const _bootStrap = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.dataSource.initialize();
        const configurations = {
            production: { ssl: true, port: 443, hostname: 'api.dnkdream.com' },
            development: { ssl: false, port: 4000, hostname: 'localhost' },
        };
        const environment = process.env.NODE_ENV || 'production';
        const config = configurations[environment];
        let server;
        if (config.ssl) {
            server = https_1.default.createServer({
                key: fs_1.default.readFileSync(`${process.env.SSL_KEY}`),
                cert: fs_1.default.readFileSync(`${process.env.SSL_CERT}`),
            }, app_1.default.callback());
        }
        else {
            server = http_1.default.createServer(app_1.default.callback());
        }
        server.listen(config.port, () => {
            console.log(`D&K Dream API server on ${config.port} port`);
        });
    }
    catch (err) {
        console.log(err);
    }
});
_bootStrap();
