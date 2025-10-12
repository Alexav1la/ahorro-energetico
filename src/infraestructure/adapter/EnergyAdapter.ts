import { Repository } from "typeorm";
import type { Energy as EnergyDomain } from "../../domian/Energy.ts";
import { Energy, EnergyEntity } from "../entities/Energy.ts";
import type { EnergyPort } from "../../domian/EnergyPort.ts";
import { AppDataSource } from "../config/database.ts";

export class EnergyAdapter implements EnergyPort {
    private energyRepository: Repository<EnergyEntity>;
    constructor() {
        this.energyRepository = AppDataSource.getRepository(EnergyEntity);
    }
    private toDomain(energy: EnergyEntity): EnergyDomain {
        return {
            id: energy.id,
            buildingId: energy.building_id,
            date: energy.date,
            consumptionKwh: energy.consumption_kwh,
            cost: energy.cost,
            efficiency: energy.efficiency,
            calculateEfficiency: function (): number {
                const idealConsumption = 100;
                return (idealConsumption / this.consumptionKwh) * 100;
            }
        };
    }
    private toEntity(energy: Omit<EnergyDomain, "id" | "calculateEfficiency">): EnergyEntity {
        const energyEntity = new EnergyEntity();
        energyEntity.building_id = energy.buildingId;
        energyEntity.date = energy.date;
        energyEntity.consumption_kwh = energy.consumptionKwh;
        energyEntity.cost = energy.cost;
        energyEntity.efficiency = energy.efficiency;
        return energyEntity;
    }
    // Implementación concreta de EnergyPort
    async createEnergy(energy: Omit<EnergyDomain, "id" | "calculateEfficiency">): Promise<void> {
        try {
            const newEnergy = this.toEntity(energy);
            await this.energyRepository.save(newEnergy);
        } catch (error) {
            console.error("Error de creación:", error);
            throw new Error("No se guardó el registro de energía creado");
        }
    }
    async getAllEnergy(id: number): Promise<EnergyDomain[]> {
        try {
            const energies = await this.energyRepository.find({ where: { building_id: id } });
            return energies.map(this.toDomain);
        } catch (error) {
            console.error("Error al obtener todos los registros de energía:", error);
            throw new Error("No se pudieron obtener los registros de energía");
        }
    }
    async getEnergyById(id: number): Promise<EnergyDomain | null> {
        try {
            const energy = await this.energyRepository.findOne({ where: { id: id } });
            return energy ? this.toDomain(energy) : null;
        } catch (error) {
            console.error("Error al obtener registro de energía por ID:", error);
            throw new Error("No se pudo obtener el registro de energía por ID");
        }
    }
    async updateEnergy(id: number, energy: Omit<EnergyDomain, "id" | "calculateEfficiency">): Promise<void> {
        try {
            const energyToUpdate = await this.energyRepository.findOne({ where: { id: id } });
            if (!energyToUpdate) {
                throw new Error("Registro de energía no encontrado");
            }
            // Actualizar los atributos enviados
            Object.assign(energyToUpdate, {
                building_id: energy.buildingId ?? energyToUpdate.building_id,
                date: energy.date ?? energyToUpdate.date,
                consumption_kwh: energy.consumptionKwh ?? energyToUpdate.consumption_kwh,
                cost: energy.cost ?? energyToUpdate.cost,
                efficiency: energy.efficiency ?? energyToUpdate.efficiency,
            });
            await this.energyRepository.save(energyToUpdate);
        } catch (error) {
            console.error("Error al actualizar registro de energía:", error);
            throw new Error("No se pudo actualizar el registro de energía");
        }
    }
    async deleteEnergy(id: number): Promise<void> {
        try {
            const existingEnergy = await this.energyRepository.findOne({ where: { id: id } });
            if (!existingEnergy) {
                throw new Error("Registro de energía no encontrado");
            }
            Object.assign(existingEnergy, {
                id: existingEnergy.id,
            });
            await this.energyRepository.remove(existingEnergy);
            return true;
        } catch (error) {
            console.error("Error al eliminar registro de energía:", error);
            throw new Error("No se pudo eliminar el registro de energía");
        }
    }
    async getAllEnergies(): Promise<EnergyDomain[]> {
        try {
            const energies = await this.energyRepository.find();
            return energies.map(this.toDomain);
        } catch (error) {
            console.error("Error al obtener todos los registros de energía:", error);
            throw new Error("No se pudieron obtener los registros de energía");
        }
    }
}
