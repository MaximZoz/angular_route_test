import { Injectable, Inject, signal, WritableSignal } from '@angular/core';
import { Locale } from '../models/locale.model';
import { Translations } from '../i18n/translations'; // Импортируем тип Translations

@Injectable({
  providedIn: 'root',
})
export class LocaleService {
  private localeSignal: WritableSignal<Locale> = signal('ru');

  constructor(@Inject('TRANSLATIONS') private translations: Translations) {}

  get locale(): WritableSignal<Locale> {
    return this.localeSignal;
  }

  setLocale(newLocale: Locale): void {
    this.localeSignal.set(newLocale);
  }

  translate(key: string): string {
    const currentLocale = this.localeSignal();
    return this.translations[currentLocale]?.[key] || key;
  }
}
