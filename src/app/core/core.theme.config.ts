import { Injectable } from '@angular/core';
import { ThemeConfigProvider } from './core.theme.config.providers';

@Injectable()
export class ThemeConfig {

  constructor(private _config: ThemeConfigProvider) {
  }
  
  config() {

  }
}
