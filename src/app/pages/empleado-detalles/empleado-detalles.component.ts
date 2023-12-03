import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from 'src/app/classes/empleado';
import { ServiceEmpleadoService } from 'src/app/services/service-empleado.service';

@Component({
  selector: 'app-empleado-detalles',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
  <h3>Detalles del empleado</h3>
  <div>
    <div style="display:flex">
       <label for=""><b>ID:</b>{{empleado.id}}</label>
    </div>
    <div>
       <label for=""><b>Nombre:</b> {{empleado.nombre}}</label>
    </div>
    <div>
       <label for=""><b>Apellido:</b> {{empleado.apellido}}</label>
    </div>
    <div style="display:flex">
       <label for=""><b>Email:</b> {{empleado.email}}</label>
    </div>

  </div>
  
  
  
  `,
  styleUrls: ['./empleado-detalles.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmpleadoDetallesComponent implements OnInit{ 
  id:number=0;
  empleado!:Empleado;

  constructor(private sev:ServiceEmpleadoService, private router:Router,private route: ActivatedRoute) {}    

  ngOnInit(): void {
    //this.id = this.route.snapshot.paramMap.get('id');//me devuelve un string y puede ser nulo
    this.id = this.route.snapshot.params['id'];
    //this.empleado = new Empleado();
    this.sev.obtenerEmpleadoPorId(this.id).subscribe(
      emp => {
        this.empleado = emp;
      }
    )
  }
}
