import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaEmpleadosComponent } from './pages/lista-empleados/lista-empleados.component';
import { RegistrarEmpleadoComponent } from './pages/registrar-empleado/registrar-empleado.component';
import { ActualizarEmpleadoComponent } from './pages/actualizar-empleado/actualizar-empleado.component';
import { EmpleadoDetallesComponent } from './pages/empleado-detalles/empleado-detalles.component';

const routes: Routes = [
  {path: 'empleados',component: ListaEmpleadosComponent},
  {path: 'registrar-empleado',component: RegistrarEmpleadoComponent},
  {path: 'actualizar-empleado/:id',component: ActualizarEmpleadoComponent},
  {path: 'detalles-empleado/:id',component: EmpleadoDetallesComponent},
  {path: '',redirectTo: 'empleados',pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
