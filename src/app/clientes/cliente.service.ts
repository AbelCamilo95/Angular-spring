import { Injectable } from '@angular/core';
// import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { Observable,of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// la inyeccion de servicios se hacen automaticamente con el providedIn:'root'
export class ClienteService {

  private urlEndPoint:string = 'http://localhost:8080/api/clientes';

  private httpHeaders = new HttpHeaders({'content-type':'application/json'})

  constructor(private http:HttpClient) { }

  // metodo sincrono bloquea la aplicacion
  // getClientes(): Cliente[]{
  //   return CLIENTES
  // }

  // Observable de 'rxjs' esta basado en el patron de diseño observador
  getClientes(): Observable<Cliente[]>{
    //forma automatica sin usar map de rxjs
    // return this.http.get<Cliente[]>(this.urlEndPoint)
    //forma en la que se usa map
    return this.http.get(this.urlEndPoint).pipe(
      map((response) => response as Cliente[])
    );
  }

  create(cliente:Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(this.urlEndPoint,cliente,{headers:this.httpHeaders})
  }

  getCliente(id):Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`)
  }

  update(cliente:Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`,cliente,{headers:this.httpHeaders})
  }

  //clientes.component.ts
  delete(id :number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`,{headers:this.httpHeaders})
  }
}
