import { Request, Response } from "express";
import { ApartamentApplicationService } from "../../application/ApartamentsApplicationService";
import { string } from "joi";


export class ApartamentController {
     constructor (private apartamentService: ApartamentApplicationService){}

     async createApartent( req : Request, res: Response): Promise <void>{
        try{
            const{ apartament_number, torre, piso, area_m2, user_id, status } = req.body;
            if (!apartament_number || !torre || !piso || !area_m2 || !user_id || !status) {
                res.status(400).json({ message: "Todos los campos son obligatorios" });
                return;
            }
            const apartament_id = await this.apartamentService.createApartament({apartament_number,
                torre,
                piso : parseInt(piso),
                area_m2: parseFloat(area_m2),
                user_id : parseInt(user_id),
                status: status || "active"});
            res.status(201).json({ 
                message: "Apartamento creado correctamente", apartament_id });
        } catch (error : any) {
            res.status(400).json({
                error: error.message || "Error al crear apartamento"});
        }
     } 

     async getApartamentById( req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id ?? "");
            if (isNaN(id)) 
            { res.status(400).json({ message: " ID invalido" });
                return; 
            }          
            const apartament = await this.apartamentService.getApartamentById(id);
            if (!apartament) {
                res.status(404).json({ error: "Apartamento no encontrado" });
                return;
            }
            res.status(200).json(apartament);
        } catch (error: any) {
        res.status(500).json({ error: error.message || "Error al obtener el apartamento |" });
        }
    }
    async getApartmentsByUserId(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.params.userId ?? "");
            if (isNaN(userId)) {
                res.status(400).json({ error: "User ID inválido" });
                return;
            }

            const apartments = await this.apartamentService.getApartmentsByUserId(userId);
            res.status(200).json({
                count: apartments.length,
                apartments
            });
        } catch (error: any) {
            res.status(500).json({ error: error.message || "Error al obtener apartamentos" });
        }
    }

    async getAllApartaments( req: Request, res: Response) {
        try {
            const apartaments = await this.apartamentService.getAllApartaments();
            res.status(200).json({
                count: apartaments.length,
                apartaments
            });
        } catch (error: any) {
            res.status(500).json({ error: error.message || "Error al obtener los apartamentos" });
        }
    }

    async UpdateApartament ( req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id ?? "");
            const { apartament_number, torre, piso, area_m2, user_id, status } = req.body;
            if (isNaN(id)) {
                res.status(400).json({ message: " ID invalido" });
                return;
            }
            const update = await this.apartamentService.updateApartament(id, {
                apartament_number,
                torre,
                piso: piso? parseInt(piso) : undefined,
                area_m2: area_m2 ? parseFloat(area_m2) : undefined,
                user_id: user_id ? parseInt(user_id) : undefined,
                status 
            });
            if (!update) {
                res.status(404).json({ error: "Apartamento no encontrado" });
                return;
            }
            res.status(200).json({ message: "Apartamento actualizado correctamente" });
        } catch (error: any) {
            res.status(500).json({ error: error.message || "Error al actualizar el apartamento" });
        }
    }

    async DeleteApartament ( req: Request, res: Response) {
try {
            const id = parseInt(req.params.id ?? "");
            if (isNaN(id)) {
                res.status(400).json({ error: "ID inválido" });
                return;
            }

            const deleted = await this.apartamentService.deleteApartament(id);
            if (!deleted) {
                res.status(404).json({ error: "Apartamento no encontrado" });
                return;
            }

            res.status(200).json({ message: "Apartamento eliminado exitosamente" });
        } catch (error: any) {
            res.status(400).json({ error: error.message || "Error al dejar inactivo el apartamento" });
        }
    }
}