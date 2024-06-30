import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Categoria } from '../model/categoria';
import { Producto } from '../model/producto';
import Swal from 'sweetalert2';
import { ProductoService } from '../service/producto-service.service';
import { CategoriaService } from '../service/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './producto-form.component.html',
  styleUrl: './producto-form.component.css'
})
export class ProductoFormComponent implements OnInit {
  titulo: string = 'Datos del producto';
  producto: Producto = new Producto();
  listaDeCategorias: Categoria[] = [];

  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private router: Router,
    private activateRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarCategorias();
    this.mostrarProducto();
  }

  cargarCategorias(): void {
    this.categoriaService.mostrarCategorias().subscribe((categorias) => {
      this.listaDeCategorias = categorias;
    });
  }

  registrarProducto(): void {
    Swal.fire({
      title: '¿Estás seguro de registrar el producto?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Registrar',
      denyButtonText: `No registrar`
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.crearProducto(this.producto).subscribe(
          (elProducto) => {
            this.router.navigate(['/productos']);
          },
          (error) => {
            Swal.fire('Error al registrar el producto', error.message, 'error');
          }
        );
      } else if (result.isDenied) {
        Swal.fire('Los cambios no han sido guardados', '', 'info');
      }
    });
  }

  actualizarProducto(): void {
    Swal.fire({
      title: '¿Estás seguro de actualizar el producto?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Actualizar',
      denyButtonText: `No actualizar`
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.actualizarProducto(this.producto).subscribe(
          (elProducto) => {
            this.router.navigate(['/productos']);
          },
          (error) => {
            Swal.fire('Error al actualizar el producto', error.message, 'error');
          }
        );
      } else if (result.isDenied) {
        Swal.fire('Los cambios no han sido guardados', '', 'info');
      }
    });
  }

  mostrarProducto(): void {
    this.activateRouter.params.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.productoService.mostrarProducto(id).subscribe(
          (elProducto) => (this.producto = elProducto)
        );
      }
    });
  }
}
