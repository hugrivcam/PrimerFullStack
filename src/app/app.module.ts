import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaEmpleadosComponent } from './pages/lista-empleados/lista-empleados.component';
import { HttpClientModule } from '@angular/common/http';
import { RegistrarEmpleadoComponent } from './pages/registrar-empleado/registrar-empleado.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ActualizarEmpleadoComponent } from './pages/actualizar-empleado/actualizar-empleado.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaEmpleadosComponent,
    RegistrarEmpleadoComponent,
    ActualizarEmpleadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, //si no reconoce los imports automaticamente hay que incluir y modificar el archivo tsconfig.json incluyendo el  siguiente elemento *1
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
//*1

/*
 "include": [
    "src",
    "node_modules"
  ]
*/ 