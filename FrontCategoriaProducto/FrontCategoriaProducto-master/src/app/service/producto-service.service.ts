import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../model/producto';
import { Observable, map, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private endPoint: string = 'http://localhost:8484/apiProducto/productos';
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) { }

  mostrarProductos(): Observable<Producto[]> {
    return this.http
      .get(this.endPoint)
      .pipe(map((response) => response as Producto[]));
  }

  mostrarProducto(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.endPoint}/${id}`);
  }

  crearProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.endPoint, producto, {
      headers: this.httpHeaders,
    });
  }

  eliminarProducto(id: number): Observable<any> {
    return this.http.delete<any>(`${this.endPoint}/${id}`, {
      headers: this.httpHeaders,
    }).pipe(
      catchError(e => {
        console.error('Error eliminando producto:', e);
        return throwError(() => new Error('No se puede eliminar el producto.'));
      })
    );
  }

  actualizarProducto(producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(
      `${this.endPoint}/${producto.idProducto}`,
      producto,
      { headers: this.httpHeaders }
    );
  }
}
