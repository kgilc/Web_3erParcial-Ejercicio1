import { HttpClient } from '@angular/common/http';
import { ProductoService } from './../service/producto-service.service';
import { Component, OnInit, inject } from '@angular/core';
import { Producto } from '../model/producto';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {
  titulo: string = 'Productos';
  listaDeProductos: Producto[] = [];

  constructor(private productoService: ProductoService) {}
  httpClient = inject(HttpClient);

  ngOnInit(): void {
    this.productoService
      .mostrarProductos()
      .subscribe((losProductos) => (this.listaDeProductos = losProductos));
  }

  delete(producto: Producto): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.eliminarProducto(producto.idProducto).subscribe(
          () => {
            this.productoService
              .mostrarProductos()
              .subscribe((losProductos) => (this.listaDeProductos = losProductos));
            Swal.fire({
              title: 'Eliminado',
              text: 'El producto se eliminó satisfactoriamente',
              icon: 'success',
            });
          },
          (error) => {
            Swal.fire({
              title: 'Error',
              text: error.message,
              icon: 'error',
            });
          }
        );
      }
    });
  }
}
