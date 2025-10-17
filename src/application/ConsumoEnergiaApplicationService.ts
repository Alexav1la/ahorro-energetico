import { ConsumoEnergia } from "../domain/ConsumoEnergia";
import { ConsumoEnergiaPort } from "../domain/ConsumoEnergiaPort";


export class ConsumoEnergiaApplicationService {
    getConsumoEnergiaByApartamentId(apartament_id: string) {
        throw new Error('Method not implemented.');
    }
    private port: ConsumoEnergiaPort;

    constructor(port: ConsumoEnergiaPort) {
        this.port = port;
    }

    async createConsumoEnergia(consumo: Omit<ConsumoEnergia, "id">): Promise<number> {
        // se hacen validaciones de negocio
        const existingConsumo = await this.port.g(consumo.apartament_id, consumo.mes_facturacion);
        if (existingConsumo) {
            return this.port.createConsumo(consumo);
            }
        throw new Error("Consumo de energia ya registrado para este apartamento");
    }
    
    async getConsumoEnergiaById(id: number): Promise<ConsumoEnergia | null> {
        return await this.port.getconsumoById(id);
    }

    async getByApartamentIdAndMonth(apartament_id: number, month: string): Promise<ConsumoEnergia | null> {
        const result = await this.port.getconsumoByMes(apartament_id, month);
        return 
    }

    async getAllConsumoEnergia(): Promise<ConsumoEnergia[]> {
        return await this.port.getAllconsumo();
    }

    async updateConsumoEnergia(id: number, consumo: Partial<ConsumoEnergia>): Promise<boolean> {
       // Validar si el consumo de energia existe
        const existingConsumo = await this.port.updateconsumo(id, consumo);
        if (!existingConsumo) {
            throw new Error("Consumo de energia no encontrado");
        }
        if (consumo.mes_facturacion && consumo.apartament_id) {
            const consumotaken = await this.port.getconsumoById(consumo.apartament_id);
            if (consumotaken && consumotaken.id !== id) {
                throw new Error("Consumo de energia ya registrado para este apartamento y mes");
            }
        }
        return await this.port.updateconsumo(id, consumo);
    }                
    
    async deleteConsumoEnergia(id: number): Promise<boolean> {
        const existingConsumo = await this.port.deleteconsumo(id);
        if (!existingConsumo) {
            throw new Error("Consumo de energia no encontrado");
        }
        return await this.port.deleteconsumo(id);
    }

}