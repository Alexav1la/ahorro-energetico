import { database } from "./database.ts";

export const AppDataSource = new database({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "user",
  password: "password",
  database: "database",
  entities: [UserEntity],
  synchronize: true,
});




export { database };

