import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular'; 
import { ReactiveFormsModule } from '@angular/forms'; 
import { AuthService } from '../services/auth.service'; 
import { CommonModule } from '@angular/common'; 
import { LoadingController } from '@ionic/angular'; 
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule],
})

export class HomePage implements OnInit {

  loginForm!: FormGroup;
  private loginService = inject(AuthService);
  successMessage: string = '';
  errorMessage: string = '';
  constructor(private fb: FormBuilder,  private loadingController: LoadingController,  private router: Router) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
    // Función para mostrar el loader
    async presentLoading(message: string) {
      const loading = await this.loadingController.create({
        message: message,
        duration: 2000
      });
      await loading.present();
    }
  
    onSubmit() {
      if (this.loginForm.valid) {
        const formData = this.loginForm.value;
        this.presentLoading('Login...');
        this.loginService.login(formData.email, formData.password).subscribe(response => {
          if (response.success) {
            this.presentLoading('Bienvenido! ' + response.user.email);
            this.router.navigate(['/listado']); 
          } else {
            this.presentLoading('Usuario o contraseña incorrectos');
          }
        });
      } else {
        this.presentLoading('Formulario inválido');
      }
    }
  
}
