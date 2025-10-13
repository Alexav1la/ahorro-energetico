import { Router } from "express";
import { EnergyAdapter } from "../adapter/EnergyAdapter.ts";
import { EnergyApplicationService } from "../../application/EnergyApplicationService.ts";
import { EnergyController } from "../controller/EnergyController.ts";

// Instancia del servicio y controlador

const energyAdapter = new EnergyAdapter();
const energyApplicationService = new EnergyApplicationService(energyAdapter);
const energyController = new EnergyController(energyApplicationService);

// Definir las rutas y asociarlas con los métodos del controlador
const router = Router();

router.post("/energies", async (req, res) => {
    try {
        await energyController.createEnergy(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el registro de energía" });
    }
});
router.get("/energies", async (req, res) => {
    try {
        await energyController.getAllEnergies(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los registros de energía" });
    }
});
router.get("/energies/:id", async (req, res) => {
    try {
        await energyController.getEnergyById(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el registro de energía" });
    }
});
router.put("/energies/:id", async (req, res) => {
    try {
        await energyController.updateEnergy(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el registro de energía" });
    }
});
router.delete("/energies/:id", async (req, res) => {
    try {
        await energyController.deleteEnergy(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el registro de energía" });
    }
}); 
export default router;
