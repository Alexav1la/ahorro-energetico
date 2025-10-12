import { DataSource } from "typeorm";
import { User} from "../entities/User.ts"
import dotenv from "dotenv";


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
    entities: [User],
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
