import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { TodoService } from '../services/todo.service';
import { todoDTO } from '../models/todo.model';
import { AuthGuard } from 'src/Auth/controllers/guards/auth.guard';

@Controller('/todo')
export class TodoController {

    constructor(private todoservice:TodoService){}

    @UseGuards(AuthGuard)
    @Get('/tasks')
    getTodos(@Request() request){
        return this.todoservice.getTodos(request.user.email);
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    getbyid(@Param('id') id: Number): todoDTO {
        return this.todoservice.getById(id);
    }

    @UseGuards(AuthGuard)
    @Post('/add')
    addTodo(@Body() mission : any, @Request() request) {
        return { message : this.todoservice.addTodo({user:request.user.email,...mission})};
        
    }

    @UseGuards(AuthGuard)
    @Post('/update')
    updateTodo(@Body() mission : any, @Request() request) {
        return { message : this.todoservice.updateTodo({user:request.user.email,...mission})};
    }

    @UseGuards(AuthGuard)
    @Delete('/del/:id')
    deletebyid(@Param('id') id:Number,@Request() request){
        this.todoservice.deleteById(id,request.user.email);
    }

}
