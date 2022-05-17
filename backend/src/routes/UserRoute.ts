import * as express from 'express';
import ValidateUser from '../middlewares/userValidation';
import UserController from '../controllers/UserController';

const routerUsers = express.Router();
const userController = new UserController();

routerUsers.get('/', userController.getAll);
routerUsers.get('/:id', userController.getById);
routerUsers.post('/', ValidateUser, userController.createUser);
routerUsers.put('/:id', ValidateUser, userController.updateUser);
routerUsers.delete('/:id', userController.deleteUser);




export default routerUsers;
