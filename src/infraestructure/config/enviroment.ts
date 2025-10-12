import joi from 'joi';
import "dotenv/config";

export type ReturnEnvironmentVars ={
    PORT: Number;
    DB_HOST: string;
    DB_PORT: number;
    DB_USER: string;
    DB_PASSWORD:string;
    DB_NAME:string;
}

type validationEnviroment ={
    error: joi.ValidationError | undefined;
    value: ReturnEnvironmentVars;
}

function ValidateEnvVars( vars:NodeJS.ProcessEnv):validationEnviroment{
    const envSchema = joi.object({
        PORT: joi.number().default(4000), 
        DB_HOST: joi.string().required(),
        DB_PORT: joi.number().default(5432),
        DB_USER: joi.string().required(),
        DB_PASSWORD: joi.string().allow("").optional(),
        DB_NAME: joi.string().required()
    }).unknown(true);
    const {error,value} = envSchema.validate(vars)
    return{error,value}
}
const LoadEnvVars=(): ReturnEnvironmentVars =>{
    const result = ValidateEnvVars (process.env);
    if (result.error){
        throw new Error ( `error en la validacion de variables: ${result.error.message} ` );
    }3
    const value= result.value;
    return{
    PORT: value.PORT,
    DB_HOST: value.DB_HOST,
    DB_PORT: value.DB_PORT,
    DB_USER: value.DB_USER,
    DB_PASSWORD: value.DB_PASSWORD,
    DB_NAME: value.DB_NAME
    }
}
const envs = LoadEnvVars();
export default envs;