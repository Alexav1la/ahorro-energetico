import type { UserAplicationService } from "../../application/UserApplicationService.ts";
import type { Request, Response } from "express";
import type { User } from "../../domian/User.ts";
import type { error } from "console";

export class UserController {
    private app: UserAplicationService;

    constructor(app: UserAplicationService) {
        this.app = app;
    }
    async createUser(req:Request, res:Response){
        // Lógica para manejar la creación de un usuario
        const { name, email, password, status } = req.body;
        try {
            //validaciones con regexserId
            const nameRegex = /^[a-zA-Z\zAñ]+$/;
            if (!name || !nameRegex.test(name)) 
                return res.status(400).json({ message: "Nombre inválido. Solo se permiten letras y espacios." });
            
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            return res.status(400).json({ error: "Email inválido." });

        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password))
            return res.status(400).json({ 
        error: "La contraseña debe tener al menos 8 caracteres, incluyendo letras mayúsculas, minúsculas, números y caracteres especiales." });
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }
}