import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setItem(key: string, value: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error al guardar en localStorage', error);
    }
  }

  getItem(key: string): any {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error al obtener de localStorage', error);
      return null;
    }
  }

  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error al eliminar de localStorage', error);
    }
  }

  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error al limpiar localStorage', error);
    }
  }

  isTutorialSeen(tutorialKey: string): boolean {
    const tutorials = this.getItem('tutorials');
    return tutorials ? tutorials[tutorialKey] : false;
  }

  markTutorialAsSeen(tutorialKey: string): void {
    let tutorials = this.getItem('tutorials') || {};
    tutorials[tutorialKey] = true;
    this.setItem('tutorials', tutorials);
  }
}
