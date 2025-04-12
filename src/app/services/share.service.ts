import { Injectable } from '@angular/core';
import { Share } from '@capacitor/share';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor() { }


  async compartirTexto(texto: string): Promise<void> {
    try {
      await Share.share({
        text: texto,
      });
      console.log('Contenido compartido con éxito');
    } catch (error) {
      console.error('Error al compartir:', error);
    }
  }

}
