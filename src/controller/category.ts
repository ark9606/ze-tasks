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


export default class Controller {

    public static async getCategories (ctx: BaseContext) {
        const catRepository: Repository<Category> = getManager().getRepository(Category);

        const categories: Category[] = await catRepository.find()

        ctx.status = STATUS_CODE.OK;
        ctx.body = resp(true, categories);
    }

 

  }
