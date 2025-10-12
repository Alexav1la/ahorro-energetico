import { Repository } from "typeorm";
import { User as UserDomain } from "../../domain/User";
import { UserPort } from "../../domain/UserPort";
import { User as  UserEntity } from "../entities/User";
import { AppDataSourcet } from "../config/Data-base";

export class UserAdapter implements UserPort {
    private userRepository: Repository <UserEntity>;
    constructor (){ 
        this.userRepository = AppDataSourcet.getRepository(UserEntity);
    }
    private toDOmain(user: UserEntity): UserDomain {
        return {
            id: user.id_user,
            name: user.name_user,
            email: user.emai_user,
            password: user.password_user,
            status: user.status_user
        };
    }
        private toEntity(user: Omit<UserDomain, "id">): UserEntity {
        const userEntity = new UserEntity();
           userEntity.name_user = user.name;
            userEntity.emai_user = user.email;
            userEntity.password_user = user.password;
            userEntity.status_user = user.status;
           return userEntity

    }
     
    async createUser(user: Omit<UserDomain, "id">): Promise<number> {
        try{
            const newUser = this.toEntity(user);
            const SavedUser = await this.userRepository.save(newUser);
            return SavedUser.id_user;
        } catch (error){
            console.error ("Error al crear el usuario", error);
            throw  new Error (" Error al crear usuario");
        }
        
    }
     async getUserById(id: number): Promise<UserDomain | null> {
        try{
            const user = await this.userRepository.findOne ({where:{id_user: id} })
            return user ? this.toDOmain(user): null;
            } catch (error){ 
                console.error("error al recuperar el usuario por ID", error);
        throw new Error("Error al recuperar el usuario por ID");
         }
    }
    async getUserByEmail(email: string): Promise<UserDomain | null> {
        try{
             const user = await this.userRepository.findOne ({where:{emai_user: email} });
             return user ? this.toDOmain(user) :null;
        } catch (error){
            console.error("error al recuperar usuario por email", error);
            throw new Error ("Error al recuperar usuario por email");

        }
    }
    updateUser(id: number, user: Partial<UserDomain>): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    deleteUser(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    async getAllUser(): Promise<UserDomain[]> {
        try{
            const users = await this.userRepository.find();
            return users.map(this.toDOmain);
        } catch (error){
            console.error("erro al recuperar usuarios", error);
            throw new Error (" error al recuperar usuario")
        }
    }
    
}