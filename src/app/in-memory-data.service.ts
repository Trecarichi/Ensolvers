import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Item } from './item/item';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const items = [
      { id: 11, name: 'Lavandina', description: "limpieza", completed: false },
      { id: 12, name: 'papel', description: "limpieza", completed: false},
      { id: 13, name: 'Harina' , description: "alimentos", completed: false},
      { id: 14, name: 'papas' , description : "verdura", completed: false},
      { id: 15, name: 'milanesas', description: "carne", completed: false},
      { id: 16, name: 'pure', description: "alimentos" , completed: false},
      { id: 17, name: 'Cerveza', description:"bebidas", completed: false},
      { id: 18, name: 'Jugo', description:"bebidas" , completed: false},
      { id: 19, name: 'Gaseosas', description: "bebidas" , completed: false},
      { id: 20, name: 'Noquis', description: "alimentos" , completed: false}
    ];
    return {items};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(items: Item[]): number {
    return items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 11;
  }
}