import { ApartamentPort } from "../domain/ApartamentPort.ts";
import { apartament } from "../domain/Apartament.ts";

export class ApartamentApplicationService {
    private port: ApartamentPort;

    constructor(port: ApartamentPort) {
        this.port = port;
    }

    async createApartament(apartament: Omit<apartament, "id">): Promise<number> {
        const existingApartament = await this.port.getapartamentByname(apartament.apartament_number);
        if (!existingApartament) {
            return await this.port.createApartament(apartament);
        }
        throw new Error("Apartament con este numero ya registrado");
    }

    async getApartamentById(id: number): Promise<apartament | null> {
        return await this.port.getApartamentById(id);
    }

    async getAllApartaments(): Promise<apartament[]> {
        return await this.port.getAllApartaments();
    }

    async updateApartament(id: number, apartament: Partial<apartament>): Promise<boolean> {
        const existingApartament = await this.port.getApartamentById(id);
        if (!existingApartament) {
            throw new Error("Apartamento no encontrado");
        }
        if (apartament.apartament_number) {
            const nameTaken = await this.port.getApartamentByNumber(apartament.apartament_number);
            if (nameTaken && nameTaken.id !== id) {
                throw new Error("numero de apartamento ya registrado");
            }
        }
        return await this.port.updateApartament(id, apartament);
    }
    async deleteApartament(id: number): Promise<boolean> {
        const existingApartament = await this.port.getApartamentById(id);
        if (!existingApartament) {
            throw new Error("Apartament no encontrado");
        }
        return await this.port.deleteApartament(id);
    }
}