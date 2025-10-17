import { DataSource } from "typeorm";
import { User} from "../entities/User.ts"
import dotenv from "dotenv";
import { apartament } from "../entities/apartament.ts";
import { ConsumoEnergia } from "../entities/consumo_energia.ts";
import { Recomendaciones } from "../entities/recomendaciones.ts";
import { SolicitudServicio } from "../entities/solicitudServicio.ts";


dotenv.config();
export const AppDataSourcet = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST, 
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME, 
    synchronize: true,
    logging: true,
    entities: [User, apartament, ConsumoEnergia, Recomendaciones, SolicitudServicio],
    schema: "ahorro_energetico"
});

export const connectDB = async () => {
    try{
        await AppDataSourcet.initialize();
        console.log( " base de datos conectada con exito");
    } catch (error) {
        console.error ( " error al conectar la base de datos", error);
        process.exit(1);
    }
}
