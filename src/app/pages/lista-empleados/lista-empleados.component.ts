import { Router } from '@angular/router';
//import { Empleado } from './../../classes/empleado';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { InterfaceEmpleados } from 'src/app/interfaces/interface-empleados';
import { ServiceEmpleadoService } from 'src/app/services/service-empleado.service';
import { catchError,of } from 'rxjs';
//import { catchError, mergeMap, of, tap, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css']
})
export class ListaEmpleadosComponent implements OnInit,OnDestroy {
  orden = {
    Nombre: 'A',
    Apellido:'A',
    Email:'A'
  }

  listaEmpleados:InterfaceEmpleados[] =[];
  private miSubscripcionPteLimpiar!:Subscription;
  constructor(private sev:ServiceEmpleadoService,private router:Router ){ }

  ngOnInit(): void {
    this.obtenerEmpleados();
  }
  ngOnDestroy(): void {
    //me aseguro de limpiar la subscripcion
    try{
      this.miSubscripcionPteLimpiar.unsubscribe();
    }
    catch(error){
      console.log('ocurrio un error al intentar cancelar la subscripcion');
    }
  }

  public ordenarEmpleados(orderBy:string):void{
    let v1:number = 1; 
    let v2:number = -1;
    //alert(orderBy);
    switch (orderBy){
      case 'nombre':
        console.log(this.orden.Nombre);
        if (this.orden.Nombre ==='D') {v1=-1;v2=1;this.orden.Nombre='A';}
        else this.orden.Nombre='D';
        this.listaEmpleados = this.listaEmpleados.sort((a,b) => a.nombre>b.nombre ? v1 :v2); //es mayo si no menor, 0 seria si son iguales
        console.log(v1,v2);
        break;
      case 'apellido':
        if (this.orden.Apellido ==='D') {v1=-1;v2=1;this.orden.Apellido='A';}
        else this.orden.Apellido='D';
        this.listaEmpleados = this.listaEmpleados.sort((a,b) => a.apellido>b.apellido ? v1 :v2); //es mayo si no menor, 0 seria si son iguales
        break;
      case 'email':
        if (this.orden.Email ==='D') {v1=-1;v2=1;this.orden.Email='A';}
        else this.orden.Email='D';
        this.listaEmpleados = this.listaEmpleados.sort((a,b) => a.email>b.email ? v1 :v2); //es mayo si no menor, 0 seria si son iguales
        break;
    }
    console.log(this.listaEmpleados);
  }

  public obtenerEmpleados(){
    this.sev.getEmpleados().subscribe(lista => this.listaEmpleados = lista);
  }

  public actualizarEmpleado (id:number){
    this.router.navigate(['actualizar-empleado',id]);
  }

  // public eliminarEmpleado (id:number){
  //   this.sev.eliminarEmpleado(id).pipe(
  //     tap(dato => console.log('Registro eliminado',dato)),
  //     mergeMap(() => this.sev.getEmpleados()), //me aseguro que el subscribe de getEmpleados se lanza despues y dentro de mi subscribe eliminar
  //     catchError(
  //         error => {console.log('error al eliminar el registro',error);
  //         return of(error);
  //         //return throwError(error)}
  //       }
  //     )
  //   )
  //   .subscribe(lista => this.listaEmpleados = lista);

  //   //this.obtenerEmpleados();//despues de eliminar refrescamos empleados
  // }
  //eliminar empleado con sweet alert
  public EliminarEmpleadoSA(id:number){
    this.crearSweetAlert().then(res => {
      if (res===true)
        this.eliminarEmpleado(id);
      else
        console.log("el usuario canceló la eliminación");

    })
    .catch((error)=> console.error('Error al mostrar sweetAlert:',error) )
  }

  public eliminarEmpleado (id:number){
    this.miSubscripcionPteLimpiar=this.sev.eliminarEmpleado(id).pipe(
      catchError(
          error => {console.log('error al eliminar el registro',error);
          return of(error);
          //return throwError(error)}
        }
      )
    )
    .subscribe(res => {
      //console.log('eliminar',res);
      this.obtenerEmpleados();//despues de eliminar refrescamos empleados
    });
  }
  

  public verDetallesEmpleado(id:number){
    this.router.navigate(['detalles-empleado',id]);
  }

  public crearSweetAlert(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      Swal.fire({
        title: "¿Quieres eliminar el empleado seleccionado?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Aceptar",
        denyButtonText: "Cancelar"
      }).then((res) => {
        if (res.isConfirmed) {
          Swal.fire("Eliminado!", "", "success");
          resolve(true);
        } else if (res.isDenied) {
          Swal.fire("Operación cancelada", "", "info");
          resolve(false);
        }
      });
    });
  }

}
