
import type { Energy } from "./Energy.ts";

export interface EnergyPort {
    createEnergy(energy: Energy): Promise<void>;
    getAllEnergies(): Promise<Energy[]>;
    getEnergyById(id: number): Promise<Energy | null>;
    updateEnergy(id: number, energy: Energy): Promise<void>;
    deleteEnergy(id: number): Promise<void>;
}
