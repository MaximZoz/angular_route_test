import 'zone.js'; // Импортируем Zone.js, необходимый для Angular
import 'zone.js/testing'; // Импортируем тестовую версию Zone.js
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

// Инициализируем тестовую среду Angular
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
