import * as joi from 'joi';
import "dotenv/config";

export type ReturnEnvironmentVars ={
    PORT: Number;
}

type validationEnviroment ={
    error: joi.ValidationError | undefined;
    value: ReturnEnvironmentVars;
}

function ValidateEnvVars( vars:NodeJS.ProcessEnv):validationEnviroment{
    const envSchema = joi.object({
        PORT: joi.number().required()
    }).unknown(true);
    const {error,value} = envSchema.validate(vars)
    return{error,value}
}
const LoadEnvVars=(): ReturnEnvironmentVars =>{
    const result = ValidateEnvVars (process.env);
    if (result.error){
        throw new Error ( `error en la validacion de variables: ${result.error.message}` );
    }
    const value= result.value;
    return{
        PORT: value.PORT
    }
}