import { Component, OnInit } from '@angular/core';
import { Item } from './item';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  items!: Item[];
  selectedItem!: Item;

  /* item: Item = {
    id: 1,
    name: 'Windstorm',
    description: 'aves'
  }; */
   
  constructor(private itemService: ItemService) {}

  onSelect(item: Item): void {
    this.selectedItem = item;
  }
  getItems(): void {
    this.itemService.getItems()
        .subscribe(items => this.items = items);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.itemService.addItem({ name } as Item)
      .subscribe(item => {
        this.items.push(item);
      });
  }

  delete(item: Item): void {
    this.items = this.items.filter(i => i !== item);
    this.itemService.deleteItem(item).subscribe();
  }

 /*  item: Item
 */
  /* constructor(name: String, description: String) {
    this.name = name;
    this.description = description;
  } */

/*   constructor(item: Item) {
    this.item = item;
  }
 */
  ngOnInit(): void {
    this.getItems();
  }
}
