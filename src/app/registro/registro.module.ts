import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importar ReactiveFormsModule
import { IonicModule } from '@ionic/angular';
import { RegistroPageRoutingModule } from './registro-routing.module';
import { FormBuilder, FormGroup} from '@angular/forms';
import { AuthService } from '../services/auth.service'; // Importa el servicio Auth


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // Asegúrate de importar ReactiveFormsModule
    IonicModule,
    RegistroPageRoutingModule

  ],
  providers: [AuthService, RegistroPage], // Añade el servicio Auth a la lista de providers
  //declarations: [RegistroPage]
})
export class RegistroPage {

  // Definimos el formulario
  registroForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Inicializamos el formulario sin validaciones
    this.registroForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  // Función que se ejecuta al enviar el formulario
  onSubmit() {
    // Al enviar, se imprime por consola los valores del formulario
    console.log('Datos registrados:', this.registroForm.value);
  }
}