import { Request, Response } from "express";
import { ConsumoEnergiaService } from "../../application/ConsumoEnergiaService";
import { apartament } from "../entities/apartament";
import { parse } from "path";


export class ConsumoEnergiaController {
    constructor (private energyService: ConsumoEnergiaService){}

    async CreateConsumo( req: Request , res: Response): Promise<void>{
        try{
            const { apartament_id, consumo_kwh, costo, fecha_lectura, mes_facturacion, lectura_medidor, notas } = req.body;

            if (!apartament_id || !consumo_kwh || !costo || !fecha_lectura || !mes_facturacion || !lectura_medidor) {
                res.status(400).json({ error: "Todos los campos son obligatorios" });
                return;
            }
        
        const Consumo_Id = await this.energyService.createConsumoEnergia({
            apartament_id : parseInt(apartament_id),
            consumo_kwh: parseFloat(consumo_kwh),
            costo: parseFloat(costo),
            fecha_lectura: new Date(fecha_lectura),
            mes_facturacion,
            lectura_medidor: parseFloat(lectura_medidor),
            notas
        });
        res.status(201).json({
            message: "Consumo de Energía creado correctamente",
            Consumo_Id
        });
        } catch (error: any) {
            res.status(400).json({ error: error.message || "Error al crear el consumo de energía" });
        }
    }

    async getConsumoEnergiaById(req: Request, res: Response): Promise<void>{
        try {
            const id = parseInt(req.params.id ?? "");
            if (isNaN(id)) {
                res.status(400).json({ error: "ID inválido" });
                return;
            }
            const consumoEnergia = await this.energyService.getConsumoEnergiaById(id);
            if (!consumoEnergia) {
                res.status(404).json({ error: "Consumo de Energía no encontrado" });
                return;
            }
            res.status(200).json(consumoEnergia);
        } catch (error: any) {
            res.status(500).json({ error: error.message || "Error al obtener el consumo de energía" });
        }
    }

    async getConsumoByApartamentId(req: Request, res: Response): Promise<void>{
        try {
            const apartament_id = parseInt(req.params.id ?? "");
            if (isNaN(apartament_id)) {
                res.status(400).json({ error: "ID inválido" });
                return;
            }
            const consumoEnergia = await this.energyService.getConsumoByApartamentId(apartament_id);
            if (!consumoEnergia) {
                res.status(404).json({ error: "Consumo de Energía no encontrado" });
                return;
            }
            res.status(200).json(consumoEnergia);
        } catch (error: any) {
            res.status(500).json({ error: error.message || "Error al obtener el consumo de energía" });
        }
    }

    async getConsumoEnergiaMes (req: Request, res : Response): Promise <void>{
      try {
        const apartament_id = parseInt(req.params.apartament_id ?? "");
        const {month} = req.query

        if(isNaN(apartament_id)) {
            res.status(400).json({ error: " apartamento o mes invalido" });
            return;
    }
        const consumo = await this.energyService.getConsumoByMes(apartament_id, month as string);
        res.status(200).json({
            count: consumo.length,
            consumo
            });
        } catch (error: any) {
            res.status(500).json({ error: error.message || "Error al obtener el consumo de energía del mes" });
        }
    }

    async getAverageconsumo (req: Request, res: Response ): Promise <void>{
        try {
            const apartament_id = parseInt(req.params.apartament_id ?? "");
            const months = parseInt(req.params.month ?? "");

            if (isNaN(apartament_id)) {
                res.status(400).json({ error: " ID apartamento invalido"});
            return;
           
            }
            
            const average = await this.energyService.getAverageConsumo(apartament_id, months);
            res.status(200).json({
                apartmentid: apartament_id,
                months,
                average_kwh: average
            });
        } catch (error: any) {
            res.status(500).json({ error: error.message || "Error al calcular promedio" });
        }
    }

    async getAllConsumo(req: Request, res: Response): Promise<void> {
        try {
            const Consumo = await this.energyService.getAllConsumo();
            res.status(200).json({
                count: Consumo.length,
                Consumo
            });
        } catch (error: any) {
            res.status(500).json({ error: error.message || "Error al obtener consumos" });
        }
    }

    async updateConsumption(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id ?? "");
            const { Consumo_kwh, costo, fecha_lectura, mes_facturacion, lectura_medidor, notas } = req.body;

            if (isNaN(id)) {
                res.status(400).json({ error: "ID inválido" });
                return;
            }

            const updated = await this.energyService.updateConsumo(id, {
                consumo_kwh: Consumo_kwh ? parseFloat(Consumo_kwh) : undefined,
                costo: costo ? parseFloat(costo) : undefined,
                fecha_lectura: fecha_lectura ? new Date(fecha_lectura) : undefined,
                mes_facturacion,
                lectura_medidor: lectura_medidor ? parseFloat(lectura_medidor) : undefined,
                notas
            });

            if (!updated) {
                res.status(404).json({ error: "Consumo no encontrado" });
                return;
            }

            res.status(200).json({ message: "Consumo actualizado exitosamente" });
        } catch (error: any) {
            res.status(400).json({ error: error.message || "Error al actualizar consumo" });
        }
    }

    async deleteConsumo(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id ?? "");
            if (isNaN(id)) {
                res.status(400).json({ error: "ID inválido" });
                return;
            }

            const deleted = await this.energyService.deleteconsumo(id);
            if (!deleted) {
                res.status(404).json({ error: "Consumo no encontrado" });
                return;
            }

            res.status(200).json({ message: "Consumo eliminado exitosamente" });
        } catch (error: any) {
            res.status(400).json({ error: error.message || "Error al eliminar consumo" });
        }
    }
  }