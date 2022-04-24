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
Object.defineProperty(exports, "__esModule", { value: true });
const Material_1 = require("../../entities/Material");
const server_1 = require("../../server");
function readMaterialAPI(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = ctx.params;
        try {
            const materialRepo = yield server_1.dataSource.getRepository(Material_1.Material);
            const material = yield materialRepo.findOneBy({ id });
            if (!material) {
                ctx.status = 404;
                ctx.body = '해당 식재료가 존재하지 않습니다.';
                return;
            }
            ctx.body = material;
        }
        catch (err) {
            ctx.throw(500, err);
        }
    });
}
exports.default = readMaterialAPI;
