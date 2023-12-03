import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Empleado } from 'src/app/classes/empleado';
import { ServiceEmpleadoService } from 'src/app/services/service-empleado.service';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './registrar-empleado.component.html',
  styleUrls: ['./registrar-empleado.component.css']
})
export class RegistrarEmpleadoComponent implements OnInit {
  em:Empleado = new Empleado();//es una clase
  nombreValido:number = -1;
  apellidoValido:number=-1;
  emailValido:number = -1;

  //reactive form
  public empleadoForm = new FormGroup(
    {
      nombre: new FormControl(<string>(''),{nonNullable:true}),
      apellido: new FormControl(<string>(''),{nonNullable:true}),
      email: new FormControl(<string>(''),{nonNullable:true})
    })
  constructor(private sev:ServiceEmpleadoService, private router:Router) {}

  ngOnInit(): void {
    //console.log(this.em);
  }

  RegistrarEmpleado(empleado:Empleado){//registra el empleado en la base de datos
    //console.log("addempleado: ",this.em);
    this.sev.addEmpleado(empleado).subscribe(dato => {
      //console.log("Registrando Empleado",dato);
      Swal.fire("Añadido!", "", "success");
      this.irAlaRutaDeEmpleados();
    });    
  }
  get currentEmpleado(){
    const e = this.empleadoForm.value as Empleado;
    this.em = e;
    return e;
  }
  onSubmit(){
    //this.em = this.empleadoForm.value as Empleado;//el problema está aqui
    //console.log(this.currentEmpleado);
    //console.log("value: ",this.empleadoForm.value);
    if (this.empleadoForm.valid){
      this.RegistrarEmpleado(this.currentEmpleado);
      //this.router.navigateByUrl('empleados');//lo metemos dentro del subscribe para asegurar que se añade el registro y luego se refresca
    } 
  }

  irAlaRutaDeEmpleados(){
    this.router.navigateByUrl('empleados');
  }

  comprobarNombre(){ //blur al salir del cuadro comprueba 
    const res = this.empleadoForm.get('nombre')!.valid;
    if (this.empleadoForm.get('nombre')!.value.length > 0)
      if (res) this.nombreValido = 1; 
      else this.nombreValido = 2; 
    else
      this.nombreValido = -1;  
  }
  comprobarApellido(){ //blur al salir del cuadro comprueba 
    const control = this.empleadoForm.get('apellido'); 
    const res = control!.valid;
    if (control!.value.length > 0)
      if (res) this.apellidoValido = 1; 
      else this.apellidoValido = 2; 
    else
      this.apellidoValido = -1;  
  }
  //https://www.anerbarrena.com/html5-email-input-1837/
  comprobarEmail(){ //blur al salir del cuadro comprueba 
    const control = this.empleadoForm.get('email'); 
    const res = control!.valid;
    if (control!.value.length > 0)
      if (res) this.emailValido = 1; 
      else this.emailValido = 2; 
    else
      this.emailValido = -1;  
  }   

}
