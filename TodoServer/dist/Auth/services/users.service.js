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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const persistence_1 = require("../../infrastructure/persistence/persistence");
let UsersService = class UsersService {
    constructor(persistence) {
        this.persistence = persistence;
        this.users = [];
        this.users = this.persistence.loadTodoData();
    }
    findOne(email) {
        return this.users.find(user => user.email === email);
    }
    addUser(email, password) {
        this.users.push({ email: email, password: password });
        this.persistence.saveTodoData(this.users);
        return "User Signed Up";
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('users')),
    __metadata("design:paramtypes", [persistence_1.PersistenceHandler])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map