import { ApartamentPort } from "../domain/ApartamentPort.ts";
import { Apartament } from "../domain/Apartament.ts";

export class ApartamentApplicationService {
    private port: ApartamentPort;

    constructor(port: ApartamentPort) {
        this.port = port;
    }

    async createApartament(apartament: Omit<Apartament, "id">): Promise<number> {
        const existingApartament = await this.port.getApartamentByName(apartament.name);
        if (!existingApartament) {
            return await this.port.createApartament(apartament);
        }
        throw new Error("Apartament with this name already exists");
    }

    async getApartamentById(id: number): Promise<Apartament | null> {
        return await this.port.getApartamentById(id);
    }

    async getAllApartaments(): Promise<Apartament[]> {
        return await this.port.getAllApartaments();
    }

    async updateApartament(id: number, apartament: Partial<Apartament>): Promise<boolean> {
        const existingApartament = await this.port.getApartamentById(id);
        if (!existingApartament) {
            throw new Error("Apartament not found");
        }
        if (apartament.name) {
            const nameTaken = await this.port.getApartamentByName(apartament.name);
            if (nameTaken && nameTaken.id !== id) {
                throw new Error("Apartament name already taken");
            }
        }
        return await this.port.updateApartament(id, apartament);
    }

    async deleteApartament(id: number): Promise<boolean> {
        const existingApartament = await this.port.getApartamentById(id);
        if (!existingApartament) {
            throw new Error("Apartament not found");
        }
        return await this.port.deleteApartament(id);
    }
}