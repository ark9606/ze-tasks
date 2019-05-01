import { BaseContext } from 'koa';
import { getManager, Repository, Not, Equal } from 'typeorm';
import { validate, ValidationError } from 'class-validator';
import { User } from '../entity/user';
import { Todo } from '../entity/todo';
import { resp } from '../utils';
import * as STATUS_CODE from 'http-status-codes';

export default class UserController {

    public static async createOrUpdateUser (ctx: BaseContext) {
        const userRepository: Repository<User> = getManager().getRepository(User);
        const todoRepository: Repository<Todo> = getManager().getRepository(Todo);

        const { accessToken, email, name, fbID, avatar } = ctx.request.body;

        let userToBeSaved: User = new User();
        
        userToBeSaved.accessToken = accessToken;
        userToBeSaved.name = name;
        userToBeSaved.email = email;
        userToBeSaved.fbID = fbID;
        userToBeSaved.avatar = avatar;

        const errors: ValidationError[] = await validate(userToBeSaved);

        if (errors.length > 0) {
            // ctx.status = STATUS_CODE.BAD_REQUEST;
            ctx.body = resp(false, null, errors);
            return;
        } 
        
        const existedUser: User = await userRepository.findOne({ fbID: userToBeSaved.fbID});

        if (existedUser) {
            userToBeSaved = {
                ...existedUser,
                ...userToBeSaved
            };
        } 

        const user = await userRepository.save(userToBeSaved);

        if(!existedUser) {

            const dt = new Date();

            const h = dt.getHours();
            const m = dt.getMinutes();

            const newTodo = new Todo();
            newTodo.name = 'Register on the best site for planning your life';
            newTodo.date = dt;
            // newTodo.time = `${h}:${m}:00`;
            newTodo.time = dt;
            newTodo.user = user;
            newTodo.done = true;

            const newTodo1 = new Todo();
            newTodo1.name = 'Make your first TODO';
            newTodo1.date = dt;
            newTodo1.user = user;

            await todoRepository.save(newTodo);
            await todoRepository.save(newTodo1);

            ctx.status = STATUS_CODE.CREATED;
            ctx.body = resp(true, user);
            return;
        }

        ctx.status = STATUS_CODE.CREATED;
        ctx.body = resp(true, user);

    }

  }
