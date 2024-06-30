import { HttpClient } from '@angular/common/http';
import { CategoriaService } from './../service/categoria.service';
import { Component, OnInit, inject } from '@angular/core';
import { Categoria } from '../model/categoria';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
})
export class CategoriasComponent implements OnInit {
  titulo: string = 'Categorias';
  listaDeCategorias: Categoria[] = [];

  constructor(private categoriaService: CategoriaService) {}
  httpClient = inject(HttpClient);

  ngOnInit(): void {
    this.categoriaService
      .mostrarCategorias()
      .subscribe((lasCategorias) => (this.listaDeCategorias = lasCategorias));
  }

  delete(categoria: Categoria): void {
    Swal.fire({
      title: 'Estas seguro?',
      text: 'No podras cambiarlo',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si eliminalo',
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriaService.eliminarCategoria(categoria.idCategoria).subscribe(
          () => {
            this.categoriaService
              .mostrarCategorias()
              .subscribe((lascategorias) => (this.listaDeCategorias = lascategorias));
            Swal.fire({
              title: 'Eliminar',
              text: 'El registro se elimino satisfactoriamente',
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
