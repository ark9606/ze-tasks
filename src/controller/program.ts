import { BaseContext } from 'koa';
import { getManager, Repository, Not, Equal } from 'typeorm';
import { validate, ValidationError } from 'class-validator';
import { User } from '../entity/user';
import { Todo } from '../entity/todo';
import { Program } from '../entity/program';
import { UserProgram } from '../entity/userProgram';
import { Category } from '../entity/category';

import { resp } from '../utils';
import * as STATUS_CODE from 'http-status-codes';

const repeatTypesArray: string[] = Object.keys(Todo.REPEAT_TYPE);

export default class ProgramController {

    public static async getPrograms (ctx: BaseContext) {
        const userId = +ctx.params.id;

        const userRepository: Repository<User> = getManager().getRepository(User);
        const programRepository: Repository<Program> = getManager().getRepository(Program);
        const userProgramRepository: Repository<UserProgram> = getManager().getRepository(UserProgram);

        const user: User = await userRepository.findOne(userId);
        if(!user) {
            // ctx.status = STATUS_CODE.NOT_FOUND;
            ctx.body = resp(false, 'User not found');
            return;
        }

        let programs: Program[] = await programRepository.find({
            relations: ['todos'],
        }); 

        // let p = await   programRepository
        //                 .createQueryBuilder('program')
        //                 .innerJoinAndSelect("program.todos", "todo", "todo.id = 117")
        //                 // .leftJoinAndSelect(`program.todos`, 'todo')
        //                 // .where("todo.user = NULL", {val: null})
        //                 .getMany();
        // console.log(p);
        

        const userPrograms: UserProgram[] = await userProgramRepository.find({
            where: {
                user
            },
            relations: ['program']
        });

        const markedPrograms: any[] = [...programs];

        for (let i = 0; i < markedPrograms.length; i++) {
            if(userPrograms.filter(up => up.program.id === markedPrograms[i].id).length > 0) {
                markedPrograms[i].isTakePartIn = true;
            }
            else {
                markedPrograms[i].isTakePartIn = false;
            }
        }
        

        ctx.status = STATUS_CODE.OK;
        // ctx.body = resp(true, programs);
        ctx.body = resp(true, markedPrograms);
    }

    public static async addProgram(ctx: BaseContext) {
        const userId = +ctx.params.id;
        const programId = +ctx.params.programId;

        const userRepository: Repository<User> = getManager().getRepository(User);
        const programRepository: Repository<Program> = getManager().getRepository(Program);
        const userProgramRepository: Repository<UserProgram> = getManager().getRepository(UserProgram);
        const todoRepository: Repository<Todo> = getManager().getRepository(Todo);


        const user: User = await userRepository.findOne(userId);
        if(!user) {
            // ctx.status = STATUS_CODE.NOT_FOUND;
            ctx.body = resp(false, 'User not found');
            return;
        }

        const program: Program = await programRepository.findOne(programId);
        if (!program) {
            // ctx.status = STATUS_CODE.NOT_FOUND;
            ctx.body = resp(false, 'Program not found');
            return;
        }

        const newUserProgram: UserProgram = new UserProgram();

        newUserProgram.program = program;
        newUserProgram.user = user;
        newUserProgram.start = new Date();

        const savedUp = await userProgramRepository.save(newUserProgram);

        const originalTodos: Todo[] = await todoRepository.find({
            where: {
                program
            },
            relations: ['user', 'program']
        });

        console.log(originalTodos);
        

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        const newUserTodos: Todo[] = [];

        for (let i = 0; i < originalTodos.length; i++) {
            const example = {...originalTodos[i]};

            const newTodo = new Todo();
            newTodo.name = example.name;
            newTodo.description = example.description;
            newTodo.date = tomorrow;
            newTodo.time = example.time;
            newTodo.repeat = example.repeat;
            newTodo.category = example.category;

            // newTodo.program = example.program;
            newTodo.user = user;

            newUserTodos.push(newTodo);
        }

        console.log(newUserTodos);
        

        await todoRepository.save(newUserTodos);



        // newUserProgram.programs.push(program);


        // await programRepository.delete(todoId);
        // const userTodos: Todo[] = await todoRepository.find({
        //     where: {
        //         user: user.id
        //     }
        // }); 

        ctx.status = STATUS_CODE.OK;
        ctx.body = resp(true, savedUp);
    }


  }
