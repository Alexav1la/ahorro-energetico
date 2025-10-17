import { Repository, Between } from "typeorm";
import { ConsumoEnergia as EnergiaDomain } from "../../domain/ConsumoEnergia";
import { ConsumoEnergiaPort } from "../../domain/ConsumoEnergiaPort";
import { ConsumoEnergia as EnergiaEntity } from "../entities/consumo_energia";
import { AppDataSourcet } from "../config/Data-base";

export class ConsumoEnergiaAdapater implements ConsumoEnergiaPort {
    private energyRepository: Repository<EnergiaEntity>;

    constructor() {
        this.energyRepository = AppDataSourcet.getRepository(EnergiaEntity);
    }
    async getaverageconsumo(apartament_id: number, month: number): Promise<number> {
         try {
            const consumptions = await this.energyRepository
                .createQueryBuilder("consumption")
                .where("consumption.apartment_id = :apartmentId", { apartament_id })
                .orderBy("consumption.reading_date", "DESC")
                .limit(month)
                .getMany();

            if (consumptions.length === 0) {
                return 0;
            }

            const total = consumptions.reduce((sum, c) => sum + parseFloat(c.consumo_kwh.toString()), 0);
            return total / consumptions.length;
        } catch (error) {
            console.error("Error al calcular promedio de consumo", error);
            throw new Error("Error al calcular promedio de consumo");
        }
    }
   async createConsumo(consumo: Omit<EnergiaDomain, "id">): Promise<number> {
        try {
            const newConsumption = this.toEntity(consumo);
            const savedConsumption = await this.energyRepository.save(newConsumption);
            return savedConsumption.id_consumo;
        } catch (error) {
            console.error("Error al crear consumo", error);
            throw new Error("Error al crear consumo");
        }
    }
    async  getconsumoById(id: number): Promise<EnergiaDomain | null> {
        try {
            const consumption = await this.energyRepository.findOne({ 
                where: { id_consumo: id },
                relations: ["apartment"]
            });
            return consumption ? this.toDomain(consumption) : null;
        } catch (error) {
            console.error("Error al recuperar consumo por ID", error);
            throw new Error("Error al recuperar consumo por ID");
        }
    }
   async  getconsumoByApartamentId(apartament_id: number): Promise<EnergiaDomain[]> {
        try {
            const consumptions = await this.energyRepository.find({ 
                where: { apartament_id: apartament_id },
                order: { fecha_lectura: "DESC" }
            });
            return consumptions.map(c => this.toDomain(c));
        } catch (error) {
            console.error("Error al recuperar consumos por apartamento", error);
            throw new Error("Error al recuperar consumos por apartamento");
        }
    }
   async getconsumoByMes(apartament_id: number, month: string): Promise<EnergiaDomain[]> {
        try {
            const consumptions = await this.energyRepository.find({ 
                where: { 
                    apartament_id: apartament_id,
                    mes_facturacion: month
                }
            });
            return consumptions.map(c => this.toDomain(c));
        } catch (error) {
            console.error("Error al recuperar consumos por mes", error);
            throw new Error("Error al recuperar consumos por mes");
        }
    }
    async  getconnsumoByrangofecha(apartament_id: number, comienzofecha: Date, finalfecha: Date): Promise<EnergiaDomain[]> {
        try {
            const consumptions = await this.energyRepository.find({ 
                where: { 
                    apartament_id: apartament_id,
                    fecha_lectura: Between(comienzofecha, finalfecha)
                },
                order: { fecha_lectura: "ASC" }
            });
            return consumptions.map(c => this.toDomain(c));
        } catch (error) {
            console.error("Error al recuperar consumos por rango de fechas", error);
            throw new Error("Error al recuperar consumos por rango de fechas");
        }
    }
   async  getAllconsumo(): Promise<EnergiaDomain[]> {
        try {
            const consumptions = await this.energyRepository.find({
                relations: ["apartment"],
                order: { fecha_lectura: "DESC" }
            });
            return consumptions.map(c => this.toDomain(c));
        } catch (error) {
            console.error("Error al recuperar consumos", error);
            throw new Error("Error al recuperar consumos");
        }
    }
     async  updateconsumo(id: number, consumo: Partial<EnergiaDomain>): Promise<boolean> {
       try {
            const existingConsumption = await this.energyRepository.findOne({ 
                where: { id_consumo: id } 
            });
            if (!existingConsumption) {
                return false;
            }

            if (consumo.consumo_kwh) existingConsumption.consumo_kwh = consumo.consumo_kwh;
            if (consumo.costo) existingConsumption.cost= consumo.costo;
            if (consumo.fecha_lectura) existingConsumption.fecha_lectura = consumo.fecha_lectura;
            if (consumo.mes_facturacion) existingConsumption.mes_facturacion = consumo.mes_facturacion;
            if (consumo.lectura_medidor) existingConsumption.lectura_medidor = consumo.lectura_medidor;
            if (consumo.notas !== undefined) existingConsumption.notas = consumo.notas;

            await this.energyRepository.save(existingConsumption);
            return true;
        } catch (error) {
            console.error("Error al actualizar consumo", error);
            throw new Error("Error al actualizar consumo");
        }
    }
    async  deleteconsumo(id: number): Promise<boolean> {
          try {
        const existingConsumption = await this.energyRepository.findOne({
            where: { id_consumo: id }
        });

        if (!existingConsumption) {
            throw new Error("Apartment not found");
        }

        Object.assign(existingConsumption, {
            status_consumo: 0
        });

        await this.energyRepository.save(existingConsumption);
        return true;

    } catch (error) {
        console.error("Error deleting apartment:", error);
        throw new Error("Error deleting apartment");
    }
    }

    private toDomain(energy: EnergiaEntity): EnergiaDomain {
        return {
            id: energy.id_consumo,
            apartament_id: energy.apartament_id,
            consumo_kwh: parseFloat(energy.consumo_kwh.toString()),
            costo: parseFloat(energy.cost.toString()),
            fecha_lectura: energy.fecha_lectura,
            mes_facturacion: energy.mes_facturacion,
            lectura_medidor: parseFloat(energy.lectura_medidor.toString()),
            notas: energy.notas
        };
    }

    private toEntity(energy: Omit<EnergiaDomain, "id">): EnergiaEntity {
        const energyEntity = new EnergiaEntity();
        energyEntity.apartament_id = energy.apartament_id;
        energyEntity.consumo_kwh = energy.consumo_kwh;
        energyEntity.cost = energy.costo;
        energyEntity.fecha_lectura = energy.fecha_lectura;
        energyEntity.mes_facturacion = energy.mes_facturacion;
        energyEntity.lectura_medidor = energy.lectura_medidor;
        energyEntity.notas = energy.notas || "";
        return energyEntity;
    }

}