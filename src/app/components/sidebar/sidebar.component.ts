import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() isPhone = false; // Свойство для привязки
  @Output() isPhoneChange = new EventEmitter<boolean>(); // Событие для двусторонней привязки
  icons = ['home', 'settings', 'info', 'help'];

  toggleImage(): void {
    this.isPhone = !this.isPhone; // Переключаем значение
    this.isPhoneChange.emit(this.isPhone); // Уведомляем об изменении
  }
}
