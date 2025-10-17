import { Apartament } from "./Apartament.ts";

export interface ApartamentPort {
    createApartament(apartament: Omit<Apartament, "id">): Promise<number>;
    getApartamentById(id: number): Promise<Apartament | null>;
    getAllApartaments(): Promise<Apartament[]>
    getApartamentByNumber(apartamentnumber: string): Promise<Apartament | null>;
    getApartamentByUserId(userId: number): Promise<Apartament[]>;
    updateApartament(id: number, apartament: Partial<Apartament>): Promise<boolean>;
    deleteApartament (id: number): Promise<boolean>;
}