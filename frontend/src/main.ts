import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { appConfig } from './app/app.config';
import { provideHttpClient } from '@angular/common/http';


bootstrapApplication(App, {
  providers: [
    ...appConfig.providers,  // ← añade lo que tengas en app.config
    provideHttpClient()      // ← solución al error NG0201
  ]
});

