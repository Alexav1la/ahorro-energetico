import "./infraestructure/config/enviroment.ts";
<<<<<<< HEAD
import app from "./app.ts";
import Serverboostrap from "./infraestructure/server/server-boostrap.ts";
import { connectDB } from "./infraestructure/config/Data-base.ts";

const server = new Serverboostrap(app);

(async () => {
  try {
    await connectDB();
    const instances = [server.init()];
    await Promise.all(instances);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
=======
import app from "./infraestructure/web/app.ts";
import Serverboostrap from "./server/server-boostrap.ts";
import { database } from "./infraestructure/config/database.ts";
const server = new Serverboostrap(app);
(async () => {
    try {
    await database();
    const instances = [server.init()];
    await Promise.all(instances);
} catch (error) {
    console.error("Error al iniciar la aplicación:", error);
    process.exit(1);
}
})();
>>>>>>> main1
