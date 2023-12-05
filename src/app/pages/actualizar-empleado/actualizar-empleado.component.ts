//import { ensureOriginalSegmentLinks } from '@angular/compiler-cli/src/ngtsc/sourcemaps/src/source_file';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from 'src/app/classes/empleado';
import { ServiceEmpleadoService } from 'src/app/services/service-empleado.service';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './actualizar-empleado.component.html',
  styleUrls: ['./actualizar-empleado.component.css']
})
export class ActualizarEmpleadoComponent {
  //RUTA_VALID:string = "../../../assets/icons/Valid.png";
  RUTA_VALID:string = "./assets/icons/Valid.png";
  RUTA_CANCEL:string = "./assets/icons/cancel.png";
  id:number = -1;
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
  
  constructor(private sev:ServiceEmpleadoService, private router:Router,private route: ActivatedRoute) {}    
  
  ngOnInit(): void {
    this.getParam();
    if (this.id>=0){
      this.traerEmpleado(this.id);
      //this.mostrarEmpleado();
    } 
    
    //console.log(this.em);
  }

  getParam(){
    const id = this.route.snapshot.paramMap.get('id'); 
    console.log(id);
    if(id!==null)
      this.id = +id;//+convierte el texto en nº
  }

  get currentEmpleado(){
    const e = this.empleadoForm.value as Empleado;
    this.em = e;
    return e;
  }
  
  traerEmpleado(id:number):void{
    this.sev.obtenerEmpleadoPorId(id).subscribe(emp =>{ 
      //console.log(emp);
      this.em = emp;
      //console.log(this.em);
      this.mostrarEmpleado();
    });
  }
  //cargo los datos en el formulario
  mostrarEmpleado() {
    //console.log(this.em);
    if (this.em.nombre !== null) {
      this.empleadoForm.patchValue({
        nombre: this.em.nombre,
        apellido: this.em.apellido,
        email: this.em.email
      });
    }
  }
  //actualizar los datos con el servicio
  onSubmit(){
    const em:Empleado = this.currentEmpleado;
    //console.log(em);
    //console.log("actualizar empleado 0: ", this.id);
    if (this.empleadoForm.valid)
      this.sev.actualizarEmpleado(this.id,em).subscribe(data => {
        Swal.fire("Actualizado!", "", "success");
        this.router.navigate(['/empleados']);
        return data;

      });
    else
    {
      console.log("Formulario no valido");
    }
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
