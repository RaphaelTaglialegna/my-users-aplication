import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { send } from 'process';
import UserService from '../services/UserService';
export default class UserController {
  
  public getAll = async (req: Request, res: Response) => {
    try {
      const pageAsNumber = Number.parseInt(req.query.page as any);
      const sizeAsNumber = Number.parseInt(req.query.size as any);

      let page: number = 0;
      if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0) { 
        page = pageAsNumber
      };
      
      let size: number = 10;
      if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) { 
        size = sizeAsNumber
      } 


      const usersData = await UserService.getAll(page, size);
      
      if (usersData !== null) {
        return res.status(StatusCodes.OK).json(usersData);
      } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'No users in data base' });
      }      
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
  };

  public getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const usersData = await UserService.getById(parseInt(id, 10));
      
      if (usersData !== null) {
        return res.status(StatusCodes.OK).json(usersData);
      } else {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'No user in data base or invalid ID' });
      }      
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
  };

  public createUser = async (req: Request, res: Response) => {
    try {
      const { username, email, password } = req.body;
      const id = await UserService.createUser( username, email, password );
      
       return res.status(StatusCodes.CREATED).json({id, username, email});
         
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
  };

  public updateUser = async (req: Request, res: Response) => {
    try {
      const { username, email, password } = req.body;
      const { id } = req.params;
      
      const usersData = await UserService.getById(+id);
      
      if (!usersData) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'No user in data base or invalid ID' });
        
      } else {
        await UserService.updateUser( +id, username, email, password );        
        return res.status(StatusCodes.NO_CONTENT).send();
      } 
         
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
  };

  public deleteUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      
      const usersData = await UserService.getById(+id);
      
      if (!usersData) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'No user in data base or invalid ID' });
        
      } else {
        await UserService.deleteUser(+id);        
        return res.status(StatusCodes.NO_CONTENT).send();
      } 
         
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
  };
}
