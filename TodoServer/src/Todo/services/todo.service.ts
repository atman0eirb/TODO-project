import { Inject, Injectable } from '@nestjs/common';
import { todoDTO } from '../models/todo.model';
import { PersistenceHandler } from 'src/infrastructure/persistence/persistence';

@Injectable()
export class TodoService {

  TodoList: todoDTO[];

  constructor( @Inject('TodoList') private persistence:PersistenceHandler) {
    this.TodoList= this.persistence.loadTodoData();
  }

  saveData(user:string) { 

    this.TodoList.sort((mission1, mission2) => {
      const dateA = new Date(mission1.Date.split('-').reverse().join('-'));
      const dateB = new Date(mission2.Date.split('-').reverse().join('-'));
      return dateA.getTime() - dateB.getTime();
    });

    let idx = 0;
        this.TodoList.filter(item => item.user === user ).forEach((item) => {
          item.id = idx;
          idx++;
        });

    this.persistence.saveTodoData(this.TodoList);
  }


  getTodos(user:string): any[] {
    return this.TodoList.filter(item => item.user === user).map((item) => {
      const { user, ...data } = item;
      return data;
    });;
  }

  getById(id: Number): todoDTO {
    return this.TodoList.find((item) => item.id === id);
  }

  FormatDate(Date: string) {
    const dateParts = Date.split('-');
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];
    const Date1 = day + '-' + month + '-' + year;
    return Date1;
  }

  addTodo(mission: todoDTO): string {
    mission.Date = this.FormatDate(mission.Date);
    if (!this.isExistAdd(mission)) {
      this.TodoList.push(mission);
      this.saveData(mission.user);
      return 'OK';
    }
    return 'KO';
  }

  updateTodo(mission: todoDTO): string {
    const index = this.TodoList.findIndex(todo => todo.Mission === mission.Mission);
    const date = this.FormatDate(mission.Date);
    if (index !== -1 && !this.isExistUpdate({id:0 , Mission :'', Date:date, Description:'',user: mission.user})) {
      this.TodoList[index].Mission = mission.Mission;
      this.TodoList[index].Date = this.FormatDate(mission.Date);
      this.TodoList[index].Description = mission.Description;
      this.saveData(mission.user);
      return "OK";
    }
    return "KO";
  }

  isExistAdd(mission: todoDTO): boolean {
    return this.TodoList.some(item => item.Mission === mission.Mission && item.Date === mission.Date && item.user === mission.user ) ? true : false;
  }

  isExistUpdate(mission: todoDTO): boolean {
    return this.TodoList.some(item => item.Mission === mission.Mission && item.Date === mission.Date && item.Description === mission.Description && item.user === mission.user ) ? true : false;
  }



  deleteById(id: Number,user:string): string {
    const index = this.TodoList.findIndex(todo => todo.id === id && todo.user===user );
    if (index !== -1) {
      this.TodoList.splice(index, 1);
      this.saveData(user);
      return "OK";
    }
    return "KO";
  }
}
