import { UserPort } from "../domain/UserPort";
import { User } from "../domain/User";
import { promises } from "dns";


export class UserApplicationService{
    private port: UserPort;

    constructor( port: UserPort){
        this.port = port
    }
    async createUser( user: Omit<User, "id">): Promise <number>{
       const existinUser = await this.port.getUserByEmail(user.email);
        if (!existinUser){
            return this.createUser(user);
         }
         throw new Error ("usuario con email existinte");
         
    }
    async getUserById (id: number): Promise <User | null> {
        return await this.port.getUserById (id);
    }

    async getAllUser (): Promise <User[]> {
        return await this.port.getAllUser();
    }

    async updateUser (id: number, user : Partial<User>): Promise <boolean> {
        const existinUser = await this.port.getUserById(id);
        if (!existinUser) {
            throw new Error (" usuario no encontrado");
        }
        if (user.email){
            const emailTaken = await this.port.getUserByEmail(user.email);
            if ( emailTaken && emailTaken.id !== id){
                throw new Error ("email registrado");
            }
        }
        return await this.port.updateUser(id,user);
    }

    async deleteUser (id:number): Promise<boolean> {
        const existinUser = await this.port.getUserById (id);
        if (!existinUser) {
            throw new Error ("usuario no encontrado");
        }
        return await this.port.deleteUser(id);
    }
}