import { BaseContext } from 'koa';
import { getManager, Repository, Not, Equal } from 'typeorm';
import { validate, ValidationError } from 'class-validator';
import { User } from '../entity/user';
import { resp } from '../utils';
import * as STATUS_CODE from 'http-status-codes';

export default class UserController {

    public static async createOrUpdateUser (ctx: BaseContext) {
        const userRepository: Repository<User> = getManager().getRepository(User);
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
        
        const existedUser: User = await userRepository.findOne({ email: userToBeSaved.email});

        if (existedUser) {
            userToBeSaved = {
                ...existedUser,
                ...userToBeSaved
            };
        } 

        const user = await userRepository.save(userToBeSaved);

        ctx.status = STATUS_CODE.CREATED;
        ctx.body = resp(true, user);

    }

  }
