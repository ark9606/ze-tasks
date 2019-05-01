import { BaseContext } from 'koa';
import { getManager, Repository, Not, Equal } from 'typeorm';
import { validate, ValidationError } from 'class-validator';
// import { User } from '../entity/user';
// import { Todo } from '../entity/todo';
// import { Category } from '../entity/category';

import * as request from 'request-promise';

import { resp } from '../utils';
import * as util from 'util';

import * as STATUS_CODE from 'http-status-codes';


export default class Controller {

    public static async getWeather (ctx: BaseContext) {
        const { latitude, longitude, date } = ctx.request.body;

        const weather = await request(`http://opogode.ua/api/v1/forecasts.json?latitude=${latitude}&longitude=${longitude}&date=${date}`)
        // const weather = await request(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${latitude}&lon=${longitude}&cnt=1`)

        ctx.status = STATUS_CODE.OK;
        ctx.body = resp(true, JSON.parse(weather));
    }




  }
