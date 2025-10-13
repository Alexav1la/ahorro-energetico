import { apartament } from "./Apartament.ts";

export interface ApartamentPort {
    createApartament(apartament: Omit<apartament, "id">): Promise<number>;
    getApartamentById(id: number): Promise<apartament | null>;
    getApartamentByNumber(apartamentnumber: string): Promise<apartament | null>;
    getApartamentByUserId(userId: number): Promise<apartament[]>;
    updateApartament(id: number, apartament: Partial<apartament>): Promise<boolean>;
    deleteApartament (id: number): Promise<boolean>;
}