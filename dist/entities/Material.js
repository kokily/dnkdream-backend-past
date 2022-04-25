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
exports.Material = void 0;
var typeorm_1 = require("typeorm");
var Recipe_1 = require("./Recipe");
var Material = /** @class */ (function (_super) {
    __extends(Material, _super);
    function Material() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
        __metadata("design:type", String)
    ], Material.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)('uuid'),
        __metadata("design:type", String)
    ], Material.prototype, "fk_recipe_id", void 0);
    __decorate([
        (0, typeorm_1.Column)('text'),
        __metadata("design:type", String)
    ], Material.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)('text'),
        __metadata("design:type", String)
    ], Material.prototype, "divide", void 0);
    __decorate([
        (0, typeorm_1.Column)('text'),
        __metadata("design:type", String)
    ], Material.prototype, "unit", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Material.prototype, "usage", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Material.prototype, "price", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Material.prototype, "cost", void 0);
    __decorate([
        (0, typeorm_1.Column)('timestamptz'),
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], Material.prototype, "created_at", void 0);
    __decorate([
        (0, typeorm_1.Column)('timestamptz'),
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], Material.prototype, "updated_at", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function (type) { return Recipe_1.Recipe; }, function (recipe) { return recipe.id; }, { onDelete: 'CASCADE' }),
        (0, typeorm_1.JoinColumn)({ name: 'fk_recipe_id' }),
        __metadata("design:type", Recipe_1.Recipe)
    ], Material.prototype, "recipe", void 0);
    Material = __decorate([
        (0, typeorm_1.Entity)()
    ], Material);
    return Material;
}(typeorm_1.BaseEntity));
exports.Material = Material;
