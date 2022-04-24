"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function setCookies(ctx, tokens) {
    if (tokens) {
        ctx.cookies.set('access_token', tokens.accessToken, {
            httpOnly: tokens.accessToken ? true : undefined,
            domain: process.env.NODE_ENV === 'production' ? '.dnkdream.com' : undefined,
            secure: process.env.NODE_ENV === 'production' && true,
            sameSite: 'lax',
            maxAge: tokens.accessToken ? 1000 * 15 : undefined,
        });
        ctx.cookies.set('refresh_token', tokens.refreshToken, {
            httpOnly: tokens.refreshToken ? true : undefined,
            domain: process.env.NODE_ENV === 'production' ? '.dnkdream.com' : undefined,
            secure: process.env.NODE_ENV === 'production' && true,
            sameSite: 'lax',
            maxAge: tokens.refreshToken ? 1000 * 60 * 60 * 24 * 30 : undefined,
        });
    }
    else {
        ctx.cookies.set('access_token');
        ctx.cookies.set('refresh_token');
    }
}
exports.default = setCookies;
