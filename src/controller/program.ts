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
        const programRepository: Repository<Program> = getManager().getRepository(Program);

        const programs: Program[] = await programRepository.find({
            relations: ['todos'],
        }); 

        ctx.status = STATUS_CODE.OK;
        ctx.body = resp(true, programs);
    }

    public static async addProgram(ctx: BaseContext) {
        const userId = +ctx.params.id;
        const programId = +ctx.params.programId;

        const userRepository: Repository<User> = getManager().getRepository(User);
        const programRepository: Repository<Program> = getManager().getRepository(Program);


        const user: User = await userRepository.findOne(userId);
        if(!user) {
            ctx.status = STATUS_CODE.NOT_FOUND;
            ctx.body = 'User not found';
            return;
        }

        const program: Program = await programRepository.findOne(programId);
        if (!program) {
            ctx.status = STATUS_CODE.NOT_FOUND;
            ctx.body = 'Program not found';
            return;
        }

        const newUserProgram: UserProgram = new UserProgram();
        // newUserProgram.programs.push(program);


        // await programRepository.delete(todoId);
        // const userTodos: Todo[] = await todoRepository.find({
        //     where: {
        //         user: user.id
        //     }
        // }); 

        ctx.status = STATUS_CODE.OK;
        // ctx.body = userTodos;
    }


  }
