import { Router } from "express";
import { ConsumoEnergiaAdapater } from "../adapter/ConsumoEnergiaAdapter";
import { ConsumoEnergiaService } from "../../application/ConsumoEnergiaService";
import { ConsumoEnergiaController } from "../controller/ConsumoEnergiaController.ts";

// Instancia del servicio y controlador

const energyAdapter = new ConsumoEnergiaAdapater();
const energyApplicationService = new ConsumoEnergiaService(energyAdapter);
const energyController = new ConsumoEnergiaController(energyApplicationService);

// Definir las rutas y asociarlas con los métodos del controlador
const router = Router();

router.post("/energies", async (req, res) => {
    try {
        await energyController.CreateConsumo(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el registro de energía" });
    }
});
router.get("/energies", async (req, res) => {
    try {
        await energyController.getAllConsumo(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los registros de energía" });
    }
});
router.get("/energies/:id", async (req, res) => {
    try {
        await energyController.getConsumoEnergiaById(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el registro de energía" });
    }
});

router.get("/apartment/:apartmentId", (req, res) => {
    try {
        energyController.getConsumoByApartamentId(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el consumo de energía por apartamento" });
    }
});


router.get("/apartment/:apartmentId/month", (req, res) => {
        try {
            energyController.getConsumoEnergiaMes(req, res);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener el consumo de energía por mes" });
        }
    });

router.get("/apartment/:apartmentId/average", (req, res) => {
    try {
        energyController.getAverageconsumo(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el consumo de energia" });
    }
});
router.put("/energies/:id", async (req, res) => {
    try {
        await energyController.updateConsumption(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el registro de energía" });
    }
});
router.delete("/energies/:id", async (req, res) => {
    try {
        await energyController.deleteConsumo(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el registro de energía" });
    }
}); 
export default router;
