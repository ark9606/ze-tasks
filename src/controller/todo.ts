import { BaseContext } from 'koa';
import { getManager, Repository, Not, Equal } from 'typeorm';
import { validate, ValidationError } from 'class-validator';
import { User } from '../entity/user';
import { Todo } from '../entity/todo';
import { Category } from '../entity/category';

import { resp } from '../utils';
import * as STATUS_CODE from 'http-status-codes';

const repeatTypesArray: string[] = Object.keys(Todo.REPEAT_TYPE);

export default class TodoController {

    public static async getTodos (ctx: BaseContext) {
        const userRepository: Repository<User> = getManager().getRepository(User);
        const todoRepository: Repository<Todo> = getManager().getRepository(Todo);

        const user: User = await userRepository.findOne(+ctx.params.id);

        if (!user) {
            // ctx.status = STATUS_CODE.NOT_FOUND;
            ctx.body = resp( false, null, 'The user you are trying to retrieve doesn\'t exist in the db');
            return;
        }

        const userTodos: Todo[] = await todoRepository.find({
            where: {
                user: user.id
            },
            relations: ['category', 'program'],
            order: {
                time: "ASC",
            }
        }); 

        ctx.status = STATUS_CODE.OK;
        ctx.body = resp(true, userTodos);
    }

    public static async createTodo(ctx: BaseContext) {
        const { name, description, date, time, repeat, categoryId } = ctx.request.body;
        const userId = +ctx.params.id;

        const userRepository: Repository<User> = getManager().getRepository(User);
        const todoRepository: Repository<Todo> = getManager().getRepository(Todo);

        // category of TODO
        const categoryRepository: Repository<Category> = getManager().getRepository(Category);

        const newTodo = new Todo();
        newTodo.name = name;
        newTodo.description = description;
        newTodo.date = date;
        newTodo.time = time;
        newTodo.repeat = repeat;  

        if(categoryId) {
            const todoCategory: Category = await categoryRepository.findOne(categoryId);
            if(!todoCategory) {
                // ctx.status = STATUS_CODE.NOT_FOUND;
                ctx.body = resp( false, null, 'Category not found');
                return;
            }        
            newTodo.category = todoCategory;   
        }
   

        const errors: ValidationError[] = await validate(newTodo);
        if(errors.length > 0) {
            // ctx.status = STATUS_CODE.BAD_REQUEST;
            ctx.body = resp( false, null, errors);
            return;
        }
        else if(newTodo.repeat) {

            const isRepeatUndefined = !repeatTypesArray.includes(newTodo.repeat);
            if(isRepeatUndefined) {
                // ctx.status = STATUS_CODE.BAD_REQUEST;
                ctx.body = resp( false, null, `Repeat should be one of ${repeatTypesArray}`);
                return;
            }
        }

        const user: User = await userRepository.findOne(userId);
        if(!user) {
            // ctx.status = STATUS_CODE.NOT_FOUND;
            ctx.body = resp( false, null, 'User not found');
            return;
        }

        // TODO check if todo with same name already exists

        newTodo.user = user;
        const todo: Todo = await todoRepository.save(newTodo);
        ctx.status = STATUS_CODE.CREATED;
        ctx.body = resp(true, todo);

    }

    public static async updateTodo(ctx: BaseContext) {
        const userId = +ctx.params.id;
        const todoId = +ctx.params.todoId;

        const userRepository: Repository<User> = getManager().getRepository(User);
        const todoRepository: Repository<Todo> = getManager().getRepository(Todo);

        const user: User = await userRepository.findOne(userId);
        if(!user) {
            // ctx.status = STATUS_CODE.NOT_FOUND;
            ctx.body = resp( false, null, 'User not found');
            return;
        }

        let todo = await todoRepository.findOne({id: todoId, user});
        if (!todo) {
            // ctx.status = STATUS_CODE.NOT_FOUND;
            ctx.body = resp( false, null, 'Todo not found');
            return;
        }

        todo.done = !todo.done;
        todo = await todoRepository.save(todo);

        ctx.status = STATUS_CODE.OK;
        ctx.body = resp(true, todo);

        // const userTodos: Todo[] = await todoRepository.find({
        //     where: {
        //         user: user.id
        //     },
        //     relations: ['category', 'program'],
        //     order: {
        //         time: "ASC",
        //     }
        // }); 

        // ctx.status = STATUS_CODE.OK;
        // ctx.body = resp(true, userTodos);
    }

    public static async deleteTodo(ctx: BaseContext) {
        const userId = +ctx.params.id;
        const todoId = +ctx.params.todoId;

        const userRepository: Repository<User> = getManager().getRepository(User);
        const todoRepository: Repository<Todo> = getManager().getRepository(Todo);

        const user: User = await userRepository.findOne(userId);
        if(!user) {
            // ctx.status = STATUS_CODE.NOT_FOUND;
            ctx.body = resp( false, null, 'User not found');
            return;
        }
        else if (!await todoRepository.findOne({id: todoId, user})) {
            // ctx.status = STATUS_CODE.NOT_FOUND;
            ctx.body = resp( false, null, 'Todo not found');
            return;
        }

        await todoRepository.delete(todoId);
        const userTodos: Todo[] = await todoRepository.find({
            where: {
                user: user.id
            }
        }); 

        ctx.status = STATUS_CODE.OK;
        ctx.body = resp( true, userTodos);
    }


  }
