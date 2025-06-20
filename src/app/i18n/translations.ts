import { inject } from '@angular/core';
import { LocaleService } from '../services/locale.service';

export interface Translations {
  [locale: string]: { [key: string]: string };
}

export const TRANSLATIONS: Translations = {
  en: {
    uuid: 'UUID',
    address: 'Destination Address',
    mask: 'Mask',
    gateway: 'Gateway',
    interface: 'Interface',
    internet: 'Internet Connection',
    guest: 'Guest Network',
    home: 'Home Network',
    sortBy: 'Sort by:', // Добавляем перевод для "Сортировать по:"
  },
  ru: {
    uuid: 'UUID',
    address: 'Адрес назначения',
    mask: 'Маска',
    gateway: 'Шлюз',
    interface: 'Интерфейс',
    internet: 'Подключение интернет',
    guest: 'Гостевая сеть',
    home: 'Домашняя сеть',
    sortBy: 'Сортировать по:', // Добавляем перевод для "Сортировать по:"
  },
};
