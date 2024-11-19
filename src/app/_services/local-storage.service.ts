import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  // Método para guardar un objeto en localStorage
  setItem(key: string, value: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error al guardar en localStorage', error);
    }
  }

  // Método para obtener un objeto desde localStorage
  getItem(key: string): any {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error al obtener de localStorage', error);
      return null;
    }
  }

  // Método para eliminar un ítem de localStorage
  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error al eliminar de localStorage', error);
    }
  }

  // Método para limpiar todo el localStorage
  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error al limpiar localStorage', error);
    }
  }

  // Método para comprobar si un tutorial ha sido visto
  isTutorialSeen(tutorialKey: string): boolean {
    const tutorials = this.getItem('tutorials');
    return tutorials ? tutorials[tutorialKey] : false;
  }

  // Método para marcar un tutorial como visto
  markTutorialAsSeen(tutorialKey: string): void {
    let tutorials = this.getItem('tutorials') || {};
    tutorials[tutorialKey] = true;
    this.setItem('tutorials', tutorials);
  }
}
