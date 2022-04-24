"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function loadUser(ctx) {
    const { user_id } = ctx.state.user;
    if (!user_id) {
        ctx.status = 401;
        ctx.body = '로그인 후 이용하세요.';
        return;
    }
    return user_id;
}
exports.default = loadUser;
