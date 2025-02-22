import z from "zod";

export const PersonaSchema = z.object({
    nombre: z.string({
        required_error: "Es necesario un nombre",
    }).regex(/^[a-zA-Z]+$/, "Solo se admiten letras en el nombre!"),
    apellido_materno: z.string({
        required_error: "Es necesario un apellido materno",
    }).regex(/^[a-zA-Z]+$/, "Solo se admiten letras en el apellido materno!"),
    apellido_paterno: z.string({
        required_error: "Es necesario un apellido paterno",
    }).regex(/^[a-zA-Z]+$/, "Solo se admiten letras en el apellido paterno!"),
    telefono: z.string({
        required_error: "Es necesario un telefono",
        invalid_type_error: "El telefono debe de contener solo numeros!",
    }).regex(/^[0-9]+$/).length(10, "El telefono debe de tener 10 digitos!"),
    direccion: z.string({
        required_error: "Es necesaria una dirección"
    }).regex(/^[a-zA-Z0-9. ]+$/, "La direccion debe de contener solo letras, numeros, espacios y puntos!")
});

export interface Persona {
    nombre: string;
    apellido_materno: string;
    apellido_paterno: string;
    telefono: string;
    direccion: string;
}