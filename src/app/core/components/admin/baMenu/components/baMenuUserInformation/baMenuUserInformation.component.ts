import { CoreFactory } from './../../../../../factory/core.factory';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Session } from '../../../../../utils/session';

@Component({
  selector: 'io-baMenuUserInformation',
  templateUrl: './baMenuUserInformation.component.html',
  styleUrls: ['./baMenuUserInformation.component.scss']
})
export class BaMenuUserInformationComponent {

  @Input()
  public sidebarCollapsed: boolean = false;
  public name: string = '';

  constructor(private _factory: CoreFactory) {
    if (Session.getUserData('nama')) {
      this.name = Session.getUserData('nama');
    }
  }

  public onNoClick(): void {
    console.log('Test');
    // this.dialogRef.close();
  }
}