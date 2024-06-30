import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Categoria } from '../model/categoria';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private endPoint: string = 'http://localhost:8484/apiCategoria/categorias';
  private httpHeaders = new HttpHeaders({
    ContentType: 'application/json',
  });

  constructor(private http: HttpClient) {}

  mostrarCategorias(): Observable<Categoria[]> {
    return this.http
      .get(this.endPoint)
      .pipe(map((response) => response as Categoria[]));
  }

  mostrarCategoria(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.endPoint}/${id}`);
  }

  crearCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.endPoint, categoria, {
      headers: this.httpHeaders,
    });
  }

  eliminarCategoria(id: number): Observable<any> {
    return this.http.delete<any>(`${this.endPoint}/${id}`, {
      headers: this.httpHeaders,
    }).pipe(
      catchError(e => {
        console.error('Error eliminando categoría:', e);
        return throwError(() => new Error('No se puede eliminar la categoría porque tiene productos asociados.'));
      })
    );
  }

  actualizarCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(
      `${this.endPoint}/${categoria.idCategoria}`,
      categoria,
      { headers: this.httpHeaders }
    );
  }
}
