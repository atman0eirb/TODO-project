import { TodoService } from '../services/todo.service';
import { todoDTO } from '../models/todo.model';
export declare class TodoController {
    private todoservice;
    constructor(todoservice: TodoService);
    getTodos(request: any): any[];
    getbyid(id: Number): todoDTO;
    addTodo(mission: any, request: any): {
        message: string;
    };
    updateTodo(mission: any, request: any): {
        message: string;
    };
    deletebyid(id: Number, request: any): void;
}
