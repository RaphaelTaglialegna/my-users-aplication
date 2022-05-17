import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from '../services/UserService';
export default class UserController {
  
  public getAll = async (_req: Request, res: Response) => {
    try {
      const usersData = await UserService.getAll();
      
      if (usersData !== null) {
        res.status(StatusCodes.OK).json(usersData);
      } else {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: 'No users in data base' });
      }      
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
  };

  public getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const usersData = await UserService.getById(parseInt(id, 10));
      
      if (usersData !== null) {
        res.status(StatusCodes.OK).json(usersData);
      } else {
        res.status(StatusCodes.NOT_FOUND).json({ message: 'No user in data base or invalid ID' });
      }      
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
  };
}
