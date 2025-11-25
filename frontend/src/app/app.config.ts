import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAuth0 } from '@auth0/auth0-angular'
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAuth0({
      domain: 'dev-32mzzfaff4uprtnv.us.auth0.com',
      clientId: 'T7ZO8gLy6JiD0DMT0zOGMkeIxLf5nGtf',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    })
  ]
};
