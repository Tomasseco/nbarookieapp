import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DetallePage } from './detalle.page'; // Asegúrate de que esta ruta sea la misma en la que acabas de editar
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DetallePage
  }
];

@NgModule({
  declarations: [DetallePage],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes)
  ]
})
export class DetallePageModule {}
// Este módulo se encarga de cargar la página de detalle y sus dependencias.