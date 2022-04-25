"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = exports.isProd = void 0;
exports.isProd = process.env.NODE_ENV === 'production';
function validateBody(ctx, schema) {
    const { error } = schema.validate(ctx.request.body);
    if (error === null || error === void 0 ? void 0 : error.details) {
        ctx.status = 400;
        ctx.body = error.details[0].message;
        return false;
    }
    return true;
}
exports.validateBody = validateBody;
