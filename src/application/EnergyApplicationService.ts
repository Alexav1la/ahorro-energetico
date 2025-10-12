
import { Energy } from "../domian/Energy.ts";
import type { EnergyPort } from "../domian/EnergyPort.ts";

export class EnergyApplicationService {
    private energyPort: EnergyPort;

    constructor(energyPort: EnergyPort) {
        this.energyPort = energyPort;
    }

    async createEnergy(energy: Energy): Promise<void> {
        const { buildingId, date, consumptionKwh, cost } = energy;
        const newEnergy = new Energy(buildingId, date, consumptionKwh, cost);
       return await this.energyPort.createEnergy(newEnergy);
    }
    async getAllEnergies(): Promise<Energy[]> {
        return await this.energyPort.getAllEnergies();
    }

    async getEnergyById(id: number): Promise<Energy | null> {
        return await this.energyPort.getEnergyById(id);
    }
    async updateEnergy(id: number, energy: Energy): Promise<void> {
        const { buildingId, date, consumptionKwh, cost } = energy;
        const updatedEnergy = new Energy(buildingId, date, consumptionKwh, cost, id);
        return await this.energyPort.updateEnergy(id, updatedEnergy);
    }
    async deleteEnergy(id: number): Promise<void> {
        return await this.energyPort.deleteEnergy(id);
    }

    async calculateEfficiency(energy: Energy): Promise<number> {
        return energy.efficiency;
    }
}
