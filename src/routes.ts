import * as Router from 'koa-router';
import controller = require('./controller');

const router = new Router();

// GENERAL ROUTES
router.get('/', controller.general.helloWorld);
router.get('/jwt', controller.general.getJwtPayload);

// USER ROUTES
router.post('/users', controller.user.createOrUpdateUser);

// TODO ROUTES
router.get('/users/:id/todos',    controller.todo.getTodos);
router.post('/users/:id/todos',   controller.todo.createTodo);
router.put('/users/:id/todos/:todoId',    controller.todo.updateTodo);
router.delete('/users/:id/todos/:todoId', controller.todo.deleteTodo);

// WEATHER
router.post('/weather', controller.weather.getWeather);

// PROGRAM ROUTES
router.get('/programs',    controller.program.getPrograms);
// router.post('/users/:id/programs/:programId',   controller.program.addProgram);

router.get('/categories',    controller.category.getCategories);


export { router };
