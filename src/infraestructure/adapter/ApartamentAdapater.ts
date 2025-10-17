import { Repository } from "typeorm";
import { apartament as ApartamentEntity} from "../entities/apartament";
import { ApartamentPort as apartamentPort } from "../../domain/ApartamentPort";
import { AppDataSourcet } from "../config/Data-base";
import { apartament as ApartamentDomain } from "../../domain/Apartament";

export class ApartmentAdapter implements apartamentPort {
    private apartmentRepository: Repository<ApartamentEntity>;

    constructor() {
        this.apartmentRepository = AppDataSourcet.getRepository(ApartamentEntity);
    }
     private toDomain(apartment: ApartamentEntity): ApartamentDomain {
        return {
            id: apartment.id_apartament,
            apartament_number: apartment.apartament_number,
            torre: apartment.torre,
            piso: apartment.piso,
            area_m2: parseFloat(apartment.area_m2.toString()),
            user_id: apartment.user_id,
            status: apartment.status
        };
    }
    

    private toEntity(apartment: Omit<ApartamentDomain, "id">): ApartamentEntity {
        const apartmentEntity = new ApartamentEntity();
        apartmentEntity.apartament_number = apartment.apartament_number;
        apartmentEntity.torre = apartment.torre;
        apartmentEntity.piso = apartment.piso;
        apartmentEntity.area_m2 = apartment.area_m2;
        apartmentEntity.user_id = apartment.user_id;
        apartmentEntity.status = apartment.status;
        return apartmentEntity;
    }

  
     async createApartament(apartament: Omit<ApartamentDomain, "id">): Promise<number> {
        try {
            const newApartment = this.toEntity(apartament);
            const savedApartment = await this.apartmentRepository.save(newApartment);
            return savedApartment.id_apartament;
        } catch (error) {
            console.error("Error al crear apartamento", error);
            throw new Error("Error al crear apartamento");
        }
    }
    async getApartamentById(id: number): Promise<ApartamentDomain | null> {
        try {
            const apartment = await this.apartmentRepository.findOne({ 
                where: { id_apartament: id },
                relations: ["user"]
            });
            return apartment ? this.toDomain(apartment) : null;
        } catch (error) {
            console.error("Error al recuperar apartamento por ID", error);
            throw new Error("Error al recuperar apartamento por ID");
        }
    }
    async getAllApartaments(): Promise<ApartamentDomain[]> {
        try {
            const apartments = await this.apartmentRepository.find({
                relations: ["user"]
            });
            return apartments.map(apartment => this.toDomain(apartment));
        } catch (error) {
            console.error("Error al recuperar apartamentos", error);
            throw new Error("Error al recuperar apartamentos");
        }
    }
     async getApartamentByNumber(apartamentnumber: string): Promise<ApartamentDomain | null> {
        try {
            const apartment = await this.apartmentRepository.findOne({ 
                where: { apartament_number: apartamentnumber } 
            });
            return apartment ? this.toDomain(apartment) : null;
        } catch (error) {
            console.error("Error al recuperar apartamento por número", error);
            throw new Error("Error al recuperar apartamento por número");
        }
    }
   async  getApartamentByUserId(userId: number): Promise<ApartamentDomain[]> {
         try {
            const apartments = await this.apartmentRepository.find({ 
                where: { user_id: userId } 
            });
            return apartments.map(apartment => this.toDomain(apartment));
        } catch (error) {
            console.error("Error al recuperar apartamentos por usuario", error);
            throw new Error("Error al recuperar apartamentos por usuario");
        }
    }
    async updateApartament(id: number, apartament: Partial<ApartamentDomain>): Promise<boolean> {
         try {
            const existingApartment = await this.apartmentRepository.findOne({ 
                where: { id_apartament: id } 
            });
            if (!existingApartment) {
                return false;
            }

            if (apartament.apartament_number) existingApartment.apartament_number = apartament.apartament_number;
            if (apartament.torre) existingApartment.torre = apartament.torre;
            if (apartament.piso) existingApartment.piso = apartament.piso;
            if (apartament.area_m2) existingApartment.area_m2 = apartament.area_m2;
            if (apartament.user_id) existingApartment.user_id = apartament.user_id;
            if (apartament.status) existingApartment.status = apartament.status;

            await this.apartmentRepository.save(existingApartment);
            return true;
        } catch (error) {
            console.error("Error al actualizar apartamento", error);
            throw new Error("Error al actualizar apartamento");
        }
    }
      async deleteApartament(id: number): Promise<boolean> {
    try {
        const existingApartament = await this.apartmentRepository.findOne({
            where: { id_apartament: id }
        });

        if (!existingApartament) {
            throw new Error("Apartment not found");
        }

        Object.assign(existingApartament, {
            status_apartament: 0
        });

        await this.apartmentRepository.save(existingApartament);
        return true;

    } catch (error) {
        console.error("Error deleting apartment:", error);
        throw new Error("Error deleting apartment");
    }
}

   

}