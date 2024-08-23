import { IAuthJob } from "@auth/interfaces/auth.interface";
import { BaseQueue } from "./base.queue";
import { authWorker } from "@worker/auth.worker";
import { userWorker } from "@worker/user.worker";
import { IUserJob } from "@auth/user/interfaces/user.interface";

class UserQueue extends BaseQueue {
  constructor(){
    super('user');
    this.processJob('addUserToDB', 5, userWorker.addUserToDB);
  }

  public addUserJob(name : string , data : any):void{
     this.addJob(name , data);
  }

}

export const userQueue : UserQueue = new UserQueue()
