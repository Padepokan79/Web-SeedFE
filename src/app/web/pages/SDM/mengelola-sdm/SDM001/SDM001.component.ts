import { Component, OnInit } from '@angular/core';
import { CoreFactory } from '../../../../../core/factory/core.factory';

@Component({
  selector: 'app-SDM001',
  templateUrl: './SDM001.component.html',
  styleUrls: ['./SDM001.component.css']
})
export class SDM001Component implements OnInit {

  public form = 1;
  public time: Date = new Date();
  public selected = 0;
  public disabled = false;
  public disabled1 = false;

  constructor(private _factory: CoreFactory) { }

  public ngOnInit() {

  }

  public toDisable(){
    this.disabled = true;
    this.disabled1 = true;
    this.selected = 1;
    console.log(this.disabled);
  }
}
