import z from "zod";

export const DefaultIDSchema = z.number({
    required_error: "El parametro ID es requerido",
    invalid_type_error: "El parametro ID debe de ser un numero",
}).int();