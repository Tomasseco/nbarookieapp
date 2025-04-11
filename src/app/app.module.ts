import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { HttpClientModule } from '@angular/common/http';

// Nueva API Modular de Angular Firebase
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(), // Asegura que Ionic esté configurado correctamente
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    HttpClientModule
  ],
  
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebase)), // Proveedor de Firebase
    provideFirestore(() => getFirestore()), // Proveedor de Firestore
    provideAuth(() => getAuth()), // Proveedor de Auth
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Permite el uso de componentes personalizados como ion-router-outlet
  bootstrap: [AppComponent],
})
export class AppModule {}
