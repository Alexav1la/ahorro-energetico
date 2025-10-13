import { Repository } from "typeorm";
<<<<<<< HEAD
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
    
=======
import type { User as UserDomain } from "../../domian/User.ts";
import type { UserEntity } from "../entities/User.ts";
import type { UserPort } from "../../domian/UserPort.ts";
import { AppDataSource } from "../config/database.ts";


export class UserAdapter implements UserPort {
    private userRepository: Repository<UserEntity>;
    constructor(){
        this.userRepository = AppDataSource.getRepository(UserEntity);
    }
    private toDomain(user: UserEntity): UserDomain {
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            password: user.password,
            status: user.status_user
        };
    }
    private toEntity(user: Omit<UserDomain, "id">): UserEntity {
        const userEntity = new UserEntity();
        userEntity.name = user.name;
        userEntity.email = user.email;
        userEntity.password = user.password;
        userEntity.status_user = user.status;
        return userEntity;

    }
    // Implementación concreta de UserPort
    async createUser(user: Omit<UserDomain, "id">): Promise<number> {
        try{
            const newUser = this.toEntity(user);
            const savedUser = await this.userRepository.save(newUser);
            return savedUser.id;
        } catch (error) {
            console.error("Error de creación:", error);
            throw new Error("No se guardó el usuario creado");
        }
    }
    async getUserById(id: number): Promise<UserDomain | null> {
        try {
            const user = await this.userRepository.findOne({where:{id: id}});
            return user ? this.toDomain(user) : null;
        } catch (error) {
            console.error("Error al obtener usuario por ID:", error);
            throw new Error("No se pudo obtener el usuario por ID");
        }
    }
    async getUserByEmail(email: string): Promise<UserDomain | null> {
        try {
            const user = await this.userRepository.findOne({where:{email: email}});
            return user ? this.toDomain(user) : null;
        } catch (error) {
            console.error("Error al obtener usuario por email:", error);
            throw new Error("No se pudo obtener el usuario por email");
        }
    }   
    async updateUser(id: number, user: Partial<UserDomain>): Promise<boolean> {
        try {
            const existingUser = await this.userRepository.findOne({where:{id: id}});
            if (!existingUser) {
                throw new Error("Usuario no encontrado");
            }
            // Actualizar los atributos enviados
            Object.assign(existingUser, {
                name: user.name ?? existingUser.name,
                email: user.email ?? existingUser.email,
                password: user.password ?? existingUser.password,
                status_user: 1
            });
            await this.userRepository.save(existingUser);
            return true;
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
            throw new Error("No se pudo actualizar el usuario");
        }
    }
    async deleteUser(id: number): Promise<boolean> {
        try {
            const existingUser = await this.userRepository.findOne({where:{id: id}});
            if (!existingUser) {
                throw new Error("Usuario no encontrado");
            }
            Object
            .assign(existingUser ,{
                status_user: 0
            });
            await this.userRepository.save(existingUser);
            return true;
        }   catch (error) {
            console.error("Error al eliminar usuario:", error);
            throw new Error("No se pudo eliminar el usuario");
        }
    }
    async getAllUsers(): Promise<UserDomain[]> {
        try {
            const users = await this.userRepository.find();
            return users.map(this.toDomain);
        } catch (error) {
            console.error("Error al obtener todos los usuarios:", error);
            throw new Error("No se pudo obtener la lista de usuarios");
        }
    }
>>>>>>> main1
}