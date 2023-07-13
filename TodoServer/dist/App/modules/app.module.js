"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("../controllers/app.controller");
const app_service_1 = require("../services/app.service");
const auth_controller_1 = require("../../Auth/controllers/auth.controller");
const auth_service_1 = require("../../Auth/services/auth.service");
const users_service_1 = require("../../Auth/services/users.service");
const todo_controller_1 = require("../../Todo/controllers/todo.controller");
const todo_service_1 = require("../../Todo/services/todo.service");
const auth_module_1 = require("../../Auth/modules/auth.module");
const FilePersistence_1 = require("../../infrastructure/persistence/FilePersistence");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule],
        controllers: [app_controller_1.AppController, auth_controller_1.AuthController, todo_controller_1.TodoController],
        providers: [
            app_service_1.AppService,
            auth_service_1.AuthService,
            users_service_1.UsersService,
            todo_service_1.TodoService,
            { provide: 'users', useValue: new FilePersistence_1.FilePersistence('./src/infrastructure/persistence/users.json') },
            { provide: 'TodoList', useValue: new FilePersistence_1.FilePersistence('./src/infrastructure/persistence/TodoList.json') }
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map