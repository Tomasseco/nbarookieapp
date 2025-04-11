import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, deleteDoc, docData } from '@angular/fire/firestore';
import { Jugador } from './jugadores.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FavoritosService {
  constructor(private firestore: Firestore) {}

  // Guardar un favorito
  guardarFavorito(userId: string, jugador: Jugador): Promise<void> {
    if (!userId || !jugador?.id) {
      console.error('Datos inválidos: userId o jugador.id faltan');
      return Promise.reject(new Error('Datos inválidos'));
    }

    const docRef = doc(this.firestore, `usuarios/${userId}/favoritos/${jugador.id}`);
    return setDoc(docRef, jugador)
      .then(() => console.log('Favorito guardado exitosamente'))
      .catch((error) => {
        console.error('Error al guardar favorito:', error);
        throw error; // Relanza el error para que sea manejado por el llamador
      });
  }

  // Eliminar un favorito
  eliminarFavorito(userId: string, jugadorId: string): Promise<void> {
    if (!userId || !jugadorId) {
      console.error('Datos inválidos: userId o jugadorId faltan');
      return Promise.reject(new Error('Datos inválidos'));
    }

    const docRef = doc(this.firestore, `usuarios/${userId}/favoritos/${jugadorId}`);
    return deleteDoc(docRef)
      .then(() => console.log('Favorito eliminado exitosamente'))
      .catch((error) => {
        console.error('Error al eliminar favorito:', error);
        throw error; // Relanza el error para que sea manejado por el llamador
      });
  }

  // Verificar si es favorito
  esFavorito(userId: string, jugadorId: string): Observable<boolean> {
    if (!userId || !jugadorId) {
      console.warn('Datos inválidos: userId o jugadorId faltan');
      return of(false); // Si los datos no son válidos, retornamos false
    }

    const docRef = doc(this.firestore, `usuarios/${userId}/favoritos/${jugadorId}`);
    return docData(docRef).pipe(
      map((doc) => !!doc), // Convertimos el resultado en booleano
      catchError((error) => {
        console.error('Error al verificar favorito:', error);
        return of(false); // Si hay un error, retorna false
      })
    );
  }
}
