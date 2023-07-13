import { todoDTO } from '../models/todo.model';
import { PersistenceHandler } from 'src/infrastructure/persistence/persistence';
export declare class TodoService {
    private persistence;
    TodoList: todoDTO[];
    constructor(persistence: PersistenceHandler);
    saveData(user: string): void;
    getTodos(user: string): any[];
    getById(id: Number): todoDTO;
    FormatDate(Date: string): string;
    addTodo(mission: todoDTO): string;
    updateTodo(mission: todoDTO): string;
    isExistAdd(mission: todoDTO): boolean;
    isExistUpdate(mission: todoDTO): boolean;
    deleteById(id: Number, user: string): string;
}
