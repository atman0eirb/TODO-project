import { Inject, Injectable } from '@nestjs/common';
import { PersistenceHandler } from 'src/infrastructure/persistence/persistence';


@Injectable()
export class UsersService {

  users: any[] = [];

  constructor(@Inject('users') private persistence:PersistenceHandler) {
    this.users = this.persistence.loadTodoData();
  }

  findOne(email: string): any {
    return this.users.find(user => user.email === email);
  }

  addUser(email: string, password: string): string {
    this.users.push({ email: email, password: password });
    this.persistence.saveTodoData(this.users);
    return "User Signed Up";
  }

}
