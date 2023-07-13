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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoService = void 0;
const common_1 = require("@nestjs/common");
const persistence_1 = require("../../infrastructure/persistence/persistence");
let TodoService = class TodoService {
    constructor(persistence) {
        this.persistence = persistence;
        this.TodoList = this.persistence.loadTodoData();
    }
    saveData(user) {
        this.TodoList.sort((mission1, mission2) => {
            const dateA = new Date(mission1.Date.split('-').reverse().join('-'));
            const dateB = new Date(mission2.Date.split('-').reverse().join('-'));
            return dateA.getTime() - dateB.getTime();
        });
        let idx = 0;
        this.TodoList.filter(item => item.user === user).forEach((item) => {
            item.id = idx;
            idx++;
        });
        this.persistence.saveTodoData(this.TodoList);
    }
    getTodos(user) {
        return this.TodoList.filter(item => item.user === user).map((item) => {
            const { user } = item, data = __rest(item, ["user"]);
            return data;
        });
        ;
    }
    getById(id) {
        return this.TodoList.find((item) => item.id === id);
    }
    FormatDate(Date) {
        const dateParts = Date.split('-');
        const year = dateParts[0];
        const month = dateParts[1];
        const day = dateParts[2];
        const Date1 = day + '-' + month + '-' + year;
        return Date1;
    }
    addTodo(mission) {
        mission.Date = this.FormatDate(mission.Date);
        if (!this.isExistAdd(mission)) {
            this.TodoList.push(mission);
            this.saveData(mission.user);
            return 'OK';
        }
        return 'KO';
    }
    updateTodo(mission) {
        const index = this.TodoList.findIndex(todo => todo.Mission === mission.Mission);
        const date = this.FormatDate(mission.Date);
        if (index !== -1 && !this.isExistUpdate({ id: 0, Mission: '', Date: date, Description: '', user: mission.user })) {
            this.TodoList[index].Mission = mission.Mission;
            this.TodoList[index].Date = this.FormatDate(mission.Date);
            this.TodoList[index].Description = mission.Description;
            this.saveData(mission.user);
            return "OK";
        }
        return "KO";
    }
    isExistAdd(mission) {
        return this.TodoList.some(item => item.Mission === mission.Mission && item.Date === mission.Date && item.user === mission.user) ? true : false;
    }
    isExistUpdate(mission) {
        return this.TodoList.some(item => item.Mission === mission.Mission && item.Date === mission.Date && item.Description === mission.Description && item.user === mission.user) ? true : false;
    }
    deleteById(id, user) {
        const index = this.TodoList.findIndex(todo => todo.id === id && todo.user === user);
        if (index !== -1) {
            this.TodoList.splice(index, 1);
            this.saveData(user);
            return "OK";
        }
        return "KO";
    }
};
TodoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('TodoList')),
    __metadata("design:paramtypes", [persistence_1.PersistenceHandler])
], TodoService);
exports.TodoService = TodoService;
//# sourceMappingURL=todo.service.js.map