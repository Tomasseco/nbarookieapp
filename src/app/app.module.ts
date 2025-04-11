import { EnvironmentProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(environment.firebase)), // Inicializa Firebase
      provideFirestore(() => getFirestore()), // Habilita Firestore
      provideAuth(() => getAuth()) // Habilita Auth
    ),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
function importProvidersFrom(arg0: EnvironmentProviders, arg1: EnvironmentProviders, arg2: EnvironmentProviders): any[] | import("@angular/core").Type<any> | import("@angular/core").ModuleWithProviders<{}> {
  throw new Error('Function not implemented.');
}

