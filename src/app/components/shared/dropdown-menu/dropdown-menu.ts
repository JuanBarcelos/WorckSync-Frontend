import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown-menu',
  imports: [CommonModule],
  templateUrl: './dropdown-menu.html',
  styleUrl: './dropdown-menu.scss',
})
export class DropdownMenu {
  @Input() menuOptions: string[] = []; // itens do menu
  @Output() itemSelected = new EventEmitter<string>();

  dropdownOpen = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectItem(item: string) {
    this.itemSelected.emit(item);
    this.dropdownOpen = false;
  }
}
