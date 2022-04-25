"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const cors = (ctx, next) => {
    const allowedHosts = [/^https:\/\/dnkdream.com$/, /^https:\/\/image.dnkdream.com$/];
    if (!utils_1.isProd) {
        allowedHosts.push(/^http:\/\/localhost/);
    }
    const { origin } = ctx.headers;
    if (origin) {
        const valid = allowedHosts.some((regex) => regex.test(origin));
        if (!valid)
            return next();
        ctx.set('Access-Control-Allow-Origin', origin);
        ctx.set('Access-Control-Allow-Credentials', 'true');
        if (ctx.method === 'OPTIONS') {
            ctx.set('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Cookie');
            ctx.set('Access-Control-Allow-Methods', 'GET,HEAD,PUT,POST,DELETE,PATCH');
        }
        return next();
    }
    else {
        return next();
    }
};
exports.default = cors;
