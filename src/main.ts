import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';

import { AppComponent } from './app/app.component';
import { routes } from './app/app-routing.module';
import { TRANSLATIONS } from './app/i18n/translations';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(BrowserAnimationsModule, MatTableModule),
    { provide: 'TRANSLATIONS', useValue: TRANSLATIONS },
  ],
}).catch((err) => console.error(err));
