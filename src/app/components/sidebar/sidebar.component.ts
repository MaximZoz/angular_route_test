import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { WritableSignal } from '@angular/core';
import { LocaleService } from '../../services/locale.service'; // Импортируем LocaleService

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() isPhone!: WritableSignal<boolean>; // Управление телефоном/компьютером

  constructor(private localeService: LocaleService) {} // Инжектируем LocaleService

  togglePhone(): void {
    this.isPhone.set(!this.isPhone()); // Переключаем значение isPhone
  }

  toggleLocale(): void {
    const currentLocale = this.localeService.locale(); // Получаем текущую локаль
    const newLocale = currentLocale === 'en' ? 'ru' : 'en'; // Определяем новую локаль
    this.localeService.setLocale(newLocale); // Устанавливаем новую локаль
  }

  get locale(): string {
    return this.localeService.locale(); // Получаем текущую локаль
  }
}
