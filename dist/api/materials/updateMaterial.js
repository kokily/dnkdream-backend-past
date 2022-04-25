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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var loadUser_1 = __importDefault(require("../../libs/loadUser"));
var utils_1 = require("../../libs/utils");
var Material_1 = require("../../entities/Material");
var Recipe_1 = require("../../entities/Recipe");
var server_1 = require("../../server");
function updateMaterialAPI(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var id, schema, _a, name, divide, unit, usage, price, cost, user_id, recipeRepo, materialRepo, material, recipe, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    id = ctx.params.id;
                    schema = joi_1.default.object().keys({
                        name: joi_1.default.string().required(),
                        divide: joi_1.default.string().required(),
                        unit: joi_1.default.string().required(),
                        usage: joi_1.default.number().required(),
                        price: joi_1.default.number().required(),
                        cost: joi_1.default.number().required(),
                    });
                    if (!(0, utils_1.validateBody)(ctx, schema))
                        return [2 /*return*/];
                    _a = ctx.request.body, name = _a.name, divide = _a.divide, unit = _a.unit, usage = _a.usage, price = _a.price, cost = _a.cost;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 8, , 9]);
                    return [4 /*yield*/, (0, loadUser_1.default)(ctx)];
                case 2:
                    user_id = _b.sent();
                    return [4 /*yield*/, server_1.dataSource.getRepository(Recipe_1.Recipe)];
                case 3:
                    recipeRepo = _b.sent();
                    return [4 /*yield*/, server_1.dataSource.getRepository(Material_1.Material)];
                case 4:
                    materialRepo = _b.sent();
                    return [4 /*yield*/, materialRepo.findOneBy({ id: id })];
                case 5:
                    material = _b.sent();
                    if (!material) {
                        ctx.status = 404;
                        ctx.body = '해당 식재료가 존재하지 않습니다.';
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, recipeRepo.findOneBy({ id: material.fk_recipe_id })];
                case 6:
                    recipe = _b.sent();
                    if (!recipe) {
                        ctx.status = 404;
                        ctx.body = '해당 레시피가 존재하지 않습니다.';
                        return [2 /*return*/];
                    }
                    if (recipe.fk_user_id !== user_id) {
                        ctx.status = 403;
                        ctx.body = '해당 레시피의 작성자가 아닙니다.';
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, materialRepo.update({ id: id }, {
                            name: name,
                            divide: divide,
                            unit: unit,
                            usage: usage,
                            price: price,
                            cost: cost,
                            updated_at: new Date(),
                        })];
                case 7:
                    _b.sent();
                    ctx.status = 200;
                    return [3 /*break*/, 9];
                case 8:
                    err_1 = _b.sent();
                    ctx.throw(500, err_1);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.default = updateMaterialAPI;
