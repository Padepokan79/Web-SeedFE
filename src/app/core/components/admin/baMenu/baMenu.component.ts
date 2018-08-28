import { BaMenuService } from './../../../services/admin/baMenu.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Rx';


import 'style-loader!./baMenu.scss';
import { AppState } from './../../../../app.service';
import { TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular-tree-component';

@Component({
  selector: 'ba-menu',
  templateUrl: './baMenu.html'
})
export class BaMenu {
// nodes = [
//     {
//       id: 1,
//       name: 'root1',
//       children: [
//         { id: 2, name: 'child1'},
//         { id: 3, name: 'child2', 
//           children: [
//             { id: 8, name: 'subsub2.1.1' }
//           ] }
//       ]
//     },
//     {
//       id: 4,
//       name: 'root2',
//       children: [
//         { id: 5, name: 'child2.1' },
//         {
//           id: 6,
//           name: 'child2.2',
//           children: [
//             { id: 7, name: 'subsub' }
//           ]
//         }
//       ]
//     }
//   ];
    
//   filterNodes(text, tree) {
//     tree.treeModel.filterNodes(text);
//   }
  @Input() sidebarCollapsed: boolean = false;
  @Input() menuHeight: number;

  @Output() expandMenu = new EventEmitter<any>();

  public menuItems: any[];
  protected _menuItemsSub: Subscription;
  public showHoverElem: boolean;
  public hoverElemHeight: number;
  public hoverElemTop: number;
  protected _onRouteChange: Subscription;
  public outOfArea: number = -200;

  constructor(
    private _router: Router,
    private _service: BaMenuService,
    private _state: AppState) {
  }

  public updateMenu(newMenuItems) {
    this.menuItems = newMenuItems;
    this.selectMenuAndNotify();
  }

  public selectMenuAndNotify(): void {
    if (this.menuItems) {
      this.menuItems = this._service.selectMenuItem(this.menuItems);
      this._state.notifyDataChanged('menu.activeLink', this._service.getCurrentItem());
    }
  }

  public ngOnInit(): void {
    this._onRouteChange = this._router.events.subscribe((event) => {

      if (event instanceof NavigationEnd) {
        if (this.menuItems) {
          this.selectMenuAndNotify();
        } else {
          // on page load we have to wait as event is fired before menu elements are prepared
          setTimeout(() => this.selectMenuAndNotify());
        }
      }
    });

    this._menuItemsSub = this._service.menuItems.subscribe(this.updateMenu.bind(this));
  }

  public ngOnDestroy(): void {
    this._onRouteChange.unsubscribe();
    this._menuItemsSub.unsubscribe();
  }

  public hoverItem($event): void {
    this.showHoverElem = true;
    this.hoverElemHeight = $event.currentTarget.clientHeight;
    // TODO: get rid of magic 66 constant
    this.hoverElemTop = $event.currentTarget.getBoundingClientRect().top - 32;
  }

  public toggleSubMenu($event): boolean {
    let submenu = $($event.currentTarget).next();

    if (this.sidebarCollapsed) {
      this.expandMenu.emit(null);
      if (!$event.item.expanded) {
        $event.item.expanded = true;
      }
    } else {
      $event.item.expanded = !$event.item.expanded;
      submenu.slideToggle();
    }

    return false;
  }
}
