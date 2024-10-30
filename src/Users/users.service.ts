import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { Users } from "./users.entity";

@Injectable()
export class UsersService{


    constructor(private usersRepository:UsersRepository){}

     getUsers(page:number,limit:number){
        return this.usersRepository.getUsers(page,limit)
    }

     getUserById(id:string){
        return this.usersRepository.getUserById(id)
    }
    updateUser(id:string,user:Partial<Users>){
        return this.usersRepository.updateUser(id, user)
    }
    deleteUser(id:string){
        return this.usersRepository.deleteUser(id)
    }


}