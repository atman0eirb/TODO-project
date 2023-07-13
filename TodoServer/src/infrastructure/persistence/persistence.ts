export abstract class PersistenceHandler {
    abstract loadTodoData() : any[];
    abstract saveTodoData(Data:any);

}