import * as express from 'express';
import LoginController from '../controllers/loginController';

const routerUsers = express.Router();
const usersController = new LoginController();

routerUsers.get('/', userController.loginValidate);

export default routerUsers;
