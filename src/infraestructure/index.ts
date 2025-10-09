import "./config/enviroment.ts"
import app from './web/app.ts';
import Serverboostrap from '../server/server-boostrap.ts';

const server = new Serverboostrap (app);
(
    async () => {
    try {
        const intancies =[server.init()];
        await Promise.all(intancies);
    } catch (error){
        console.error(error);
    }
}
)();

