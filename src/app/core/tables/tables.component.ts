import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent<T extends SelectableData> implements OnInit {
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;

  @Input() columns: TableColumn<T>[] = [];
  @Input() data: T[] = [];
  @Output() onRowChecked = new EventEmitter<T[]>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onCheckboxChange(item: T) {
    const checkedRows = this.data.filter(dataItem => dataItem.isSelected);
    this.onRowChecked.emit(checkedRows);
  }
}

export interface TableColumn<T> {
  propertyName: keyof T;
  displayName: string;
}

export interface SelectableData {
  isSelected: boolean;
  id: string | number;
}
