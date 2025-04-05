import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular'; // Importa IonicModule
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { AuthService } from '../services/auth.service';  // Importa el servicio AuthService
import { CommonModule } from '@angular/common';  // Importa CommonModule
import { LoadingController } from '@ionic/angular';  // Importa LoadingController

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule],  // Asegúrate de importar IonicModule aquí
})

export class RegistroPage implements OnInit {

  registroForm!: FormGroup;  // Usamos el operador de aserción no nula "!"
  private loginService = inject(AuthService);  // Inyecta el servicio AuthService
  successMessage: string = '';  // Mensaje de éxito
  errorMessage: string = '';    // Mensaje de error
  constructor(private fb: FormBuilder,  private loadingController: LoadingController) {}

  ngOnInit() {
    this.registroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
    // Función para mostrar el loader
    async presentLoading(message: string) {
      const loading = await this.loadingController.create({
        message: message,
        duration: 2000 // Duración del cargando (en milisegundos)
      });
      await loading.present();
    }
  
    onSubmit() {
      if (this.registroForm.valid) {
        const formData = this.registroForm.value;
        this.presentLoading('Registrando...');  // Muestra el cargando
        this.loginService.register(formData.email, formData.password).subscribe(response => {
          if (response.success) {
            this.presentLoading('Registro exitoso!');
          } else {
            this.presentLoading('Error al registrar');
          }
        });
      } else {
        this.presentLoading('Formulario inválido');
      }
    }
  
}
