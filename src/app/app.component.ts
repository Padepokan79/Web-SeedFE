/**
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { environment } from 'environments/environment';
import { AppState } from './app.service';
import { AppLoader } from './app.loader';
import { AppTheme } from './app.theme';

/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.scss',
    './core/initial.scss'
  ],
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit {

  public isMenuCollapsed: boolean = false;
  public showDevModule: boolean = environment.showDevModule;

  constructor(
    private appState: AppState,
    private appLoader: AppLoader,
    private appTheme: AppTheme) {
      this.appLoader.register(
        this.appTheme.loadBackgroundImage());

      this.appState.subscribe('menu.isCollapsed', (isCollapsed) => {
        this.isMenuCollapsed = isCollapsed;
      });
  }

  public ngAfterViewInit(): void {
    this.appLoader.load().then((values) => {
      this.appTheme.hidePreloader();
    });
  }

}

/**
 * Please review the https://github.com/AngularClass/angular-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
