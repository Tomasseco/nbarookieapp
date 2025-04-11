import { Injectable } from '@angular/core';
import { Firestore, collection, doc, setDoc, deleteDoc, docData } from '@angular/fire/firestore';
import { Jugador } from './jugadores.service';
import { Observable, from, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FavoritosService {
  constructor(private firestore: Firestore) {}

  // Guardar un favorito
  guardarFavorito(userId: string, jugador: Jugador): Promise<void> {
    if (!userId || !jugador?.id) {
      return Promise.reject('Datos inválidos');
    }

    const docRef = doc(this.firestore, `usuarios/${userId}/favoritos/${jugador.id}`);
    return setDoc(docRef, jugador)
      .then(() => console.log('Favorito guardado exitosamente'))
      .catch((error) => {
        console.error('Error al guardar favorito:', error);
        throw error;
      });
  }

  // Eliminar un favorito
  eliminarFavorito(userId: string, jugadorId: string): Promise<void> {
    if (!userId || !jugadorId) {
      return Promise.reject('Datos inválidos');
    }

    const docRef = doc(this.firestore, `usuarios/${userId}/favoritos/${jugadorId}`);
    return deleteDoc(docRef)
      .then(() => console.log('Favorito eliminado exitosamente'))
      .catch((error) => {
        console.error('Error al eliminar favorito:', error);
        throw error;
      });
  }

  // Verificar si es favorito
  esFavorito(userId: string, jugadorId: string): Observable<boolean> {
    if (!userId || !jugadorId) {
      console.warn('Datos inválidos: userId o jugadorId no proporcionados');
      return of(false);
    }

    const docRef = doc(this.firestore, `usuarios/${userId}/favoritos/${jugadorId}`);
    return docData(docRef).pipe(
      map((doc) => !!doc),
      catchError((error) => {
        console.error('Error al verificar favorito:', error);
        return of(false);
      })
    );
  }
}
