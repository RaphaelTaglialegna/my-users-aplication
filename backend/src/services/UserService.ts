import User from "../models/Users";
import * as bcrypt from 'bcryptjs';

const saltRounds = 10;
class UserService{
  private modelUser;

  constructor() {
    this.modelUser = User;
  }

  public getAll = async(page: number, size: number):Promise<User[] | any> => {
    const result = await this.modelUser.findAndCountAll({
      limit: size,
      offset: page * size,
      attributes: {exclude: ['password']}});
    return result;
  } 

  public getById = async(id: number):Promise<User | null> => {
    const result = await this.modelUser.findByPk(id, {attributes: {exclude: ['password']}});
    return result;
  }

  public createUser = async(username: string, email: string, password: string):Promise<number> => {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    
    const { id } = await this.modelUser.create({ username, email, password: hash })
    return id;
  } 

  public updateUser = async(id: number, username: string, email: string, password: string):Promise<string> => {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    
    await this.modelUser.update({ username, email, password: hash }, { where: { id } })
    return 'OK';
  } 

  public deleteUser = async(id: number):Promise<string> => {    
    await this.modelUser.destroy({ where: { id } })
    return 'OK';
  } 

}

export default new UserService()
