import { Injectable,NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "./users.entity";
import { Repository } from "typeorm";
import { instanceToPlain } from "class-transformer";

@Injectable()
export class UsersRepository{
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository:Repository<Users>
    ){}

    async addUser(user:Partial<Users>):Promise<Partial<Users>>{
        const newUser=await this.usersRepository.save(user)
        const dbUser=await this.usersRepository.findOneBy({id:newUser.id})
        const {createdAt,updateAt,password,...userNopassword}=dbUser
        return  userNopassword
    }

    async getUsers(page:number=1, limit:number=5):Promise<Partial<Users>[]>{
        const skip =(page-1)*limit;
        const users=await this.usersRepository.find({
            take:limit,
            skip:skip,
        });
        return users.map(({createdAt,updateAt,password,...userNopassword})=>userNopassword)
    }

    async getUserById(id:string):Promise<Partial<Users>>{
        const user=await this.usersRepository.findOne({
            where:{id},
            relations:{orders:true},
            select:{id:true,
                    name:true,
                    email:true,
                    phone:true,
                    address:true,
                    country:true,
                    city:true
            }
        })
        if(!user){
            throw new NotFoundException(`El usuario con id: ${id} no fue encontrado`)
        }
        return instanceToPlain(user); 
    }

    async updateUser(id:string,user:Partial<Users>):Promise<{message:string}>{
        const userExist = await this.usersRepository.findOneBy({ id });
    
        if (!userExist) {
            throw new NotFoundException(`Usuario con id ${id} no encontrado`);
        }   
        await this.usersRepository.update(id,user)
        const {password,isAdmin,...userNopassword}=userExist
        return {
            message:`Usuario con id:${userNopassword.id}  modificado con exito`,
        };
    }

    async deleteUser(id:string):Promise<{message:string}>{
        const userExist = await this.usersRepository.findOneBy({ id });
        if(!userExist){
            throw new NotFoundException(`Usuario con id: ${id} inexistente`)
        }
        this.usersRepository.remove(userExist)
        const {password,isAdmin,...userNopassword}=userExist
         return {message:`Usuario con id: ${id} eliminado correctamente`, }

    }
    async getUserByEmail(email:string): Promise<Users | null>{
        return await this.usersRepository.findOneBy({email})
    }    
}
    


 


