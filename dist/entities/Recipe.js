"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recipe = void 0;
var typeorm_1 = require("typeorm");
var User_1 = require("./User");
var Recipe = /** @class */ (function (_super) {
    __extends(Recipe, _super);
    function Recipe() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
        __metadata("design:type", String)
    ], Recipe.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)('text'),
        __metadata("design:type", String)
    ], Recipe.prototype, "title", void 0);
    __decorate([
        (0, typeorm_1.Column)('text'),
        __metadata("design:type", String)
    ], Recipe.prototype, "thumbnail", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'text', nullable: true }),
        __metadata("design:type", String)
    ], Recipe.prototype, "content", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Recipe.prototype, "serving", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'int', nullable: true }),
        __metadata("design:type", Number)
    ], Recipe.prototype, "all_cost", void 0);
    __decorate([
        (0, typeorm_1.Column)('timestamptz'),
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], Recipe.prototype, "created_at", void 0);
    __decorate([
        (0, typeorm_1.Column)('timestamptz'),
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], Recipe.prototype, "updated_at", void 0);
    __decorate([
        (0, typeorm_1.Column)('uuid'),
        __metadata("design:type", String)
    ], Recipe.prototype, "fk_user_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function (type) { return User_1.User; }, function (user) { return user.id; }, { onDelete: 'CASCADE' }),
        (0, typeorm_1.JoinColumn)({ name: 'fk_user_id' }),
        __metadata("design:type", User_1.User)
    ], Recipe.prototype, "user", void 0);
    Recipe = __decorate([
        (0, typeorm_1.Entity)()
    ], Recipe);
    return Recipe;
}(typeorm_1.BaseEntity));
exports.Recipe = Recipe;
