import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

import { provideAuth0 } from '@auth0/auth0-angular';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideAuth0({
      domain: 'dev-32mzzfaff4uprtnv.us.auth0.com',
      clientId: 'T7ZO8gLy6JiD0DMT0zOGMkeIxLf5nGtf',
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: "http://camisworld"
      }
    })
  ]
});

