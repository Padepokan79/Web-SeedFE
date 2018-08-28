import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';

import { DATE_FORMATS } from './core/constant/constant';

import { CoreDateAdapter } from './core/adapter/core-date-adapter';
import { CoreConfigModule } from './core/core.config.module';
import { CoreModule } from './core/core.module';
import { PagesModule } from './web/pages/pages.module';

import {
  DateAdapter,
  MAT_DATE_FORMATS
} from '@angular/material';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { JwtModule } from '@auth0/angular-jwt';
/*
 * Platform and Environment providers/directives/pipes
 */
import { environment } from 'environments/environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { AppLoader } from 'app/app.loader';
import { AppTheme } from 'app/app.theme';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'app/auth.interceptor';

// Application wide providers
export function tokenGetter() {
  return localStorage.getItem('access_token');
}

const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState,
  AppLoader,
  AppTheme,
  DatePipe,
  { provide: DateAdapter, useClass: CoreDateAdapter },
  { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];

interface StoreType {
  state: InternalStateType;
  restoreInputValues: () => void;
  disposeOldHosts: () => void;
}

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent
  ],
  /**
   * Import Angular's modules.
   */
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    PagesModule,
    CoreModule.forRoot(),
    CoreConfigModule,
    SimpleNotificationsModule.forRoot(),
    RouterModule.forRoot(ROUTES, {
      useHash: Boolean(history.pushState) === false,
      preloadingStrategy: PreloadAllModules
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains:  ['*']
      }
    }),

    /**
     * This section will import the `DevModuleModule` only in certain build types.
     * When the module is not imported it will get tree shaked.
     * This is a simple example, a big app should probably implement some logic
     */
    ...environment.showDevModule ? [ ] : [],
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [
    environment.ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {}
