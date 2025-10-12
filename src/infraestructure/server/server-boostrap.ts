export default class Serverboostrap {
    private app: any;
    constructor(app: any) {
        this.app = app;
    }

    async init(): Promise<boolean> {
        return new Promise( async(resolve, reject) => { 
        const PORT = 4000; 
        
        this.app.listen(PORT)
        .on("listening", () => {
            console.log(`Servidor en puerto ${PORT}`);
            console.log(`Servidor en http://localhost:${PORT}`);
            resolve(true);
        })
        .on("error",(err: Error)=>{
            console.error(`error al iniciar el servidor ${err}`)
            reject(false)
        });

    });
         }}
    
