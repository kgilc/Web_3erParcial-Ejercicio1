import { Categoria } from "./categoria";

export class Producto {
    idProducto: number = 0;
    nombreProducto: string = ""; 
    descripcionProducto: string = "";
    precioProducto: number = 0;
    existenciaProducto: number = 0;
    categoria: Categoria = new Categoria(); 
}