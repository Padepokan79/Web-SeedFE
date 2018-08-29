import { Component, OnInit } from '@angular/core';
import { CoreFactory } from '../../../../../core/factory/core.factory';

@Component({
  selector: 'app-SDM001',
  templateUrl: './SDM001.component.html',
  styleUrls: ['./SDM001.component.scss']
})
export class SDM001Component implements OnInit {

  public form = 1;
  public time: Date = new Date();
  public selected = 0;
  public disabled = [false, true];
  public tab = 0;
  public sdmId: number;

  constructor(private _factory: CoreFactory) { }

  // tslint:disable-next-line:no-empty
  public ngOnInit() {

  }

  // public toDisable() {
  //   this.disabled = true;
  //   this.disabled1 = true;
  //   this.selected = 1;
  //   console.log(this.disabled);
  // }

  public receiveTab($event) {
    this.tab = 1;
    this.disabled[0] = true;
    this.disabled[1] = false;
    this.sdmId = $event;
  }
}
