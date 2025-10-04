import type { UserPort } from "../domian/UserPort.ts";
import type { User } from "../domian/User.ts";

export class UserAplicationService {
    private port: UserPort;
    constructor(port: UserPort) {
        this.port =port;
    }
    async createUser(user: Omit<User, "id">): Promise<number> {
        // se hacen validaciones de negocio
        const existingUser = await this.port.getUserByEmail(user.email);
        if (!existingUser){
            return this.port.createUser(user);
        }
        throw new Error("El email ya está en uso");
        
    }
    async getUserById(id: number): Promise<User | null>{
        return await this.port.getUserById(id);
    }
    async getUserByEmail(email:string): Promise<User | null>{
        return await this.port.getUserByEmail(email);
    }
    async getAllUsers(): Promise<User[]> {
        return await this.port.getallUsers();
    }
    async updateUser({ id, user }: { id: number; user: Partial<User>; }): Promise<boolean> {
        // Validar si el usuario existe
        const existingUser = await this.port.getUserById(id);
        if (!existingUser) {
            throw new Error("El usuario no fue encontrado");
        }
        if (user.email) {
            const emailTaken = await this.port.getUserByEmail(user.email);
            if (emailTaken && emailTaken.id !== id) {
                throw new Error("El email ya está en uso");
            }
        }
        return await this.port.updateUser(id, user);
    }
    async deleteUser(id: number): Promise<boolean> {
        // Validar si el usuario existe
        const existingUser = await this.port.getUserById(id);
        if (!existingUser) {
            throw new Error("El usuario no fue encontrado");
        }
        return await this.port.deleteUser(id);
    }
}