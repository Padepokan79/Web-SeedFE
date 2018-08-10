import { Router } from '@angular/router';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { ConfigService } from './services/config.service';

export function configServiceFactory(
  config: ConfigService
) {
  return () => {
    return config.load();
  };
}

@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: configServiceFactory,
      deps: [ConfigService],
      multi: true
    },
    ConfigService
  ]
})
export class CoreConfigModule { }
