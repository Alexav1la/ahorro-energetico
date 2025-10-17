import { Router } from "express";
import { ApartamentApplicationService } from "../../application/ApartamentsApplicationService";
import { ApartmentAdapter } from "../adapter/ApartamentAdapater";
import { ApartamentController } from "../controller/ApartamentController";

const router = Router();

const ApartamentAdapater = new ApartmentAdapter();
const apartamentApplicationService = new ApartamentApplicationService(ApartamentAdapater);
const apartamentController = new ApartamentController(apartamentApplicationService);

router.post("/", (req, res) =>{
    try {
        apartamentController.createApartent(req, res);
    } catch (error) {
        res.status(400).json({ message: "Error al crear apartamento", error });
    }
});


router.get("/apartamento", (req, res) => {
    try {
        apartamentController.getAllApartaments(req, res);
    } catch (error) {
        res.status(400).json({ message: "Error al obtener apartamentos", error });
    }
});
router.get("/apartamento/:id", (req, res) => {
    try {
        apartamentController.getApartamentById(req, res);
    } catch (error) {
        res.status(400).json({ message: "Error al obtener apartamento por ID", error });
    }
})
router.get(" apartamento/user/:id", (req, res) => {
    try {
        apartamentController.getApartmentsByUserId(req, res);
    } catch (error) {
        res.status(400).json({ message: "Error al obtener apartamentos", error });
    }
})
router.put("apartamento/:id", (req, res) => {
    try {
        apartamentController.UpdateApartament(req, res);
    } catch (error) {
        res.status(400).json({ message: "Error al actualizar apartamento", error });
    }
})
router.delete("apartameto/:id", (req, res) => {
    try {
        apartamentController.DeleteApartament(req, res);
    } catch (error) {
        res.status(400).json({ message: "Error al eliminar apartamento", error });
    }
})


export default router;