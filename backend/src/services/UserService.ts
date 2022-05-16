import User from "../models/Users";

class UserService{
  private modelUser;

  constructor() {
    this.modelUser = User;
  }

  public getAll = async():Promise<User[]> => {
    const result = await this.modelUser.findAll();
    return result;
  }  
}

export default new UserService()
