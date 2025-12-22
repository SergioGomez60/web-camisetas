import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAuth0 } from '@auth0/auth0-angular'
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideNgxStripe } from 'ngx-stripe';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAuth0({
      domain: 'dev-ibiecj785me6vdl8.eu.auth0.com',
      clientId: 'y9vSme4jIca2Vyinec7UOgUnlFOxBYZg',
      useRefreshTokens: true,
      cacheLocation: 'localstorage',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
    provideNgxStripe('pk_test_51Sh4z4AEGWwabzs5rgm3oUWQagdO9KYud2L4Xt1VNOlS3H6gGGd6uRdUyzobmzvRE3y4mSCYPYeNtihOruNZNWNy00epQxytn7')
  ]
};
