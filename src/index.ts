import "./infraestructure/config/enviroment.ts";
import app from "./infraestructure/web/app.ts";
import { server-bootstrap } from "./server/server-boostrap.ts";
import { database } from "./infraestructure/config/database.ts";

const server = new Serverboostrap(app);

(async () => {
    try {
        await database.connect();
        const instances = [server.init()];
        await Promise.all(instances);
    } catch (error) {
        console.error("Error al iniciar la aplicación:", error);
        process.exit(1);
    }
})();
