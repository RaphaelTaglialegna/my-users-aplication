import * as express from 'express';
import UserController from '../controllers/UserController';

const routerUsers = express.Router();
const userController = new UserController();

routerUsers.get('/', userController.getAll);

export default routerUsers;
