import User from "../models/Users";

class UserService{
  private modelUser;

  constructor() {
    this.modelUser = User;
  }

  public getAll = async():Promise<User[]> => {
    const result = await this.modelUser.findAll({attributes: {exclude: ['password']}});
    return result;
  } 

  public getById = async(id: number):Promise<User | null> => {
    const result = await this.modelUser.findByPk(id, {attributes: {exclude: ['password']}});
    return result;
  }  
}

export default new UserService()
