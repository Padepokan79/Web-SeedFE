import { Component, OnInit } from '@angular/core';
import { Routes } from '@angular/router';

import { PAGES_MENU } from './pages.menu';
import { BaMenuService } from '../../core/services/admin/baMenu.service';

@Component({
  selector: 'pages',
  template: `
    <ba-sidebar style="width:300px"></ba-sidebar>
   <!-- <ba-sidebar-top></ba-sidebar-top>-->
    <ba-page-top></ba-page-top>
    <div class="al-main">
      <div class="al-content">
        <ba-content-top></ba-content-top>
        <router-outlet></router-outlet>
      </div>
    </div>
    <footer class="al-footer clearfix">
    </footer>
    <ba-back-top position="200"></ba-back-top>
    `
})
export class PagesComponent implements OnInit {

  constructor(private _menuService: BaMenuService) {
  }

  public ngOnInit() {
    this._menuService.updateMenuByRoutes(PAGES_MENU as Routes);
  }
}
