import { IUserDocument } from "@auth/user/interfaces/user.interface";
import { UserModel } from "@auth/user/models/user.schema";

class UserService {
  public async addUserData(data : IUserDocument):Promise<void>{
    await UserModel.create(data);
  }
}

export const userService : UserService = new UserService();
