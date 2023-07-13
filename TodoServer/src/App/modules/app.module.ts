import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { AuthController } from '../../Auth/controllers/auth.controller';
import { AuthService } from '../../Auth/services/auth.service';
import { UsersService } from '../../Auth/services/users.service';
import { TodoController } from '../../Todo/controllers/todo.controller';
import { TodoService } from '../../Todo/services/todo.service';
import { AuthModule } from '../../Auth/modules/auth.module';
import { FilePersistence } from '../../infrastructure/persistence/FilePersistence';



@Module({
  imports: [AuthModule],
  controllers: [AppController, AuthController, TodoController],
  providers: [
    AppService,
    AuthService,
    UsersService,
    TodoService, 
    { provide : 'users' , useValue : new FilePersistence('./src/infrastructure/persistence/users.json')},
    { provide : 'TodoList' , useValue : new FilePersistence('./src/infrastructure/persistence/TodoList.json')}],
})
export class AppModule {}
