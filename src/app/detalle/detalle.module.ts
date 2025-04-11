import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { DetallePage } from './detalle.page'; // Importamos el componente independiente

const routes: Routes = [
  {
    path: '',
    component: DetallePage // Definimos el componente de la ruta
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    DetallePage // Importamos el componente aquí, ya que es standalone
  ]
})
export class DetallePageModule {}
