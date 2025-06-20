export type Locale = 'ru' | 'en';
export interface Translations {
  [locale: string]: { [key: string]: string };
}
