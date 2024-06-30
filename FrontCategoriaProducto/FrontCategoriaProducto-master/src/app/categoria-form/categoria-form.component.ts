import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Categoria } from '../model/categoria';
import Swal from 'sweetalert2';
import { CategoriaService } from '../service/categoria.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-categoria-form',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './categoria-form.component.html',
  styleUrl: './categoria-form.component.css'
})
export class CategoriaFormComponent implements OnInit {
  
  titulo: string = "Datos de la categoria"
  categoria: Categoria = new Categoria

  constructor(
    private categoriaService: CategoriaService,
    private router: Router,
    private activateRouter: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.mostrarCategoria()
    }

    registrarCategoria(): void {
      Swal.fire({
        title: "Estas seguro de actualizar la categoria?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Actualizar",
        denyButtonText: `No actualizar`
      }).then((result) => {
        if (result.isConfirmed) {
          this.categoriaService.crearCategoria(this.categoria).subscribe(
            (laCategoria) => {
                this.router.navigate(['/categorias']); 
            },
            (error) => {
              Swal.fire("Error al actualizar la categoría", error.message, "error");
            }
          );
        } else if (result.isDenied) {
          Swal.fire("Los cambios no han sido guardados", "", "info");
        }
      });
    }

  actualizarCategoria(): void {
    Swal.fire({
      title: "Estas seguro de actualizar la categoria?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Actualizar",
      denyButtonText: `No actualizar`
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriaService.actualizarCategoria(this.categoria).subscribe(
          (laCategoria) => {
              this.router.navigate(['/categorias']); 
          },
          (error) => {
            Swal.fire("Error al actualizar la categoría", error.message, "error");
          }
        );
      } else if (result.isDenied) {
        Swal.fire("Los cambios no han sido guardados", "", "info");
      }
    });
  }

  mostrarCategoria(){
    this.activateRouter.params.subscribe(
      (params) => {
        let id = params['id'];
        if(id){
          this.categoriaService.mostrarCategoria(id)
          .subscribe(
            (laCategoria) => (this.categoria = laCategoria)
          )
        }
      }
    )
  }

  
}
