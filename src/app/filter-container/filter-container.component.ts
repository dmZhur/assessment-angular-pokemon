import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-container',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-container.component.html',
  styleUrls: ['./filter-container.component.scss'],
})
export class FilterContainerComponent {
  @Output() filterTypeChange = new EventEmitter<string>();
  @Output() filterNameChange = new EventEmitter<string>();

  filterType = '';
  filterName = '';

  onFilterTypeChange(): void {
    this.filterTypeChange.emit(this.filterType);
  }

  onFilterNameChange(): void {
    this.filterNameChange.emit(this.filterName);
  }
}
