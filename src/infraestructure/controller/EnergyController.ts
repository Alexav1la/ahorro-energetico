import type { Request, Response } from "express";
import { EnergyApplicationService } from "../../application/EnergyApplicationService.ts";

export class EnergyController {
    async createEnergy(req: Request, res: Response) {
        const energyData = req.body;
        const energy = await EnergyApplicationService.createEnergy(energyData);
        res.status(201).json(energy);
    }

    async getAllEnergies(req: Request, res: Response) {
        const energies = await EnergyApplicationService.getAllEnergies();
        res.status(200).json(energies);
    }

    async getEnergyById(req: Request, res: Response) {
        const { id } = req.params;
        const energy = await EnergyApplicationService.getEnergyById(id);
        if (energy) {
            res.status(200).json(energy);
        } else {
            res.status(404).json({ message: "Registro de energía no encontrado" });
        }
    }

    async updateEnergy(req: Request, res: Response) {
        const { id } = req.params;
        const energyData = req.body;
        const updatedEnergy = await EnergyApplicationService.updateEnergy(id, energyData);
        if (updatedEnergy) {
            res.status(200).json(updatedEnergy);
        } else {
            res.status(404).json({ message: "Registro de energía no encontrado" });
        }
    }

    async deleteEnergy(req: Request, res: Response) {
        const { id } = req.params;
        const deleted = await EnergyApplicationService.deleteEnergy(id);
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "Registro de energía no encontrado" });
        }
    }
}
