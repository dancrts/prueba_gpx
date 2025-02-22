export interface Persona {
    id?: number;
    nombre: string;
    apellido_materno: string;
    apellido_paterno: string;
    telefono: number;
    direccion: string;
    creado_en?: Date;
}