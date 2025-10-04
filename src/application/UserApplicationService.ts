import type { UserPort } from "../domian/UserPort.ts";
import type { User } from "../domian/User.ts";

export class UserAplicationService {
    private port: UserPort;
    constructor(port: UserPort) {
        this.port =port;
    }
    async createUser(user: Omit<User, "id">): Promise<number> {
        const existingUser = await this.port.getUserByEmail(user.email);
        if (!existingUser){
            return this.port.createUser(user);
        }
        throw new Error("User with this email already exists");
        
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
    async updateUser({ id }: { id: number; user: Partial<User>; }): Promise<boolean>{
        const existingUser = await this.port.getUserById(id);
        if (!existingUser) {
            throw new Error("user not found");
        }
        if (user.email) {
            const emailTaken = await this.port.getUserByEmail(user.email);
            if (emailTaken && emailTaken.id !== id) {
                
            }
        }
        
    }
}