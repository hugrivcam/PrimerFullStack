import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
//import { Empleado } from '../classes/empleado';
import { InterfaceEmpleados } from '../interfaces/interface-empleados';
import { Empleado } from '../classes/empleado';

@Injectable({
  providedIn: 'root'
})
export class ServiceEmpleadoService {

  //Esta URL devuelve todos los empleados del backend
  //private baseUrl:string = "http://localhost:8080/api/v1/empleados";
  private baseUrl:string = "http://54.204.157.165:8080/api/v1/empleados";
  
  constructor(private httpClient: HttpClient) {  }
  //CRUD
  getEmpleados():Observable<InterfaceEmpleados[]>//se puede hacer con la interface on con la clase
  {
    return this.httpClient.get<InterfaceEmpleados[]>(this.baseUrl);
  }

  addEmpleado(em:Empleado):Observable<Empleado>{
    //console.log("Registrando Empleado",em);
    return this.httpClient.post<Empleado>(this.baseUrl,em).pipe(
      catchError((e) => {
          throw Error(" Error creando nuevo empleado: " + e.message );
      })
    );
  }

  public actualizarEmpleado(id:number,em:Empleado):Observable<Empleado>
  {
    //console.log("actualizar empleado 1: ",id,"-",em);
    return this.httpClient.put<Empleado>(this.baseUrl+"/"+id,em).pipe(
      catchError(
        (e) => {throw Error(" Error actualizando empleado: " + e.message );}
      )
    )
  }

  public obtenerEmpleadoPorId(id:number):Observable<Empleado>{
    return this.httpClient.get<Empleado>(this.baseUrl+"/"+id).pipe(
      catchError(
        (e) => {throw Error(" Error consultando empleado: " + e.message );}
      )
    )
  }

  public eliminarEmpleado (id:number):Observable<boolean>{
    return this.httpClient.delete<boolean>(this.baseUrl+"/"+id);
  }

}
  