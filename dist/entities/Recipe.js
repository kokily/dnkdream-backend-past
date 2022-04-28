"use strict";
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
const typeorm_1 = require("typeorm");
const Material_1 = require("./Material");
const User_1 = require("./User");
let Recipe = class Recipe extends typeorm_1.BaseEntity {
};
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
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Recipe.prototype, "all_price", void 0);
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
    (0, typeorm_1.ManyToOne)((type) => User_1.User, (user) => user.id, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'fk_user_id' }),
    __metadata("design:type", User_1.User)
], Recipe.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => Material_1.Material, (material) => material.recipe),
    __metadata("design:type", Array)
], Recipe.prototype, "materials", void 0);
Recipe = __decorate([
    (0, typeorm_1.Entity)()
], Recipe);
exports.Recipe = Recipe;
