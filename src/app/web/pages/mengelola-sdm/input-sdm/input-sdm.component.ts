import { Component, OnInit, ViewChild } from '@angular/core';
import { CoreFactory } from '../../../../core/factory/core.factory';

@Component({
  selector: 'app-input-sdm',
  templateUrl: './input-sdm.component.html',
  styleUrls: ['./input-sdm.component.scss']
})
export class InputSdmComponent implements OnInit {

  public a: number = 1;
  public form = 1;
  public time: Date = new Date();

  constructor(private _factory: CoreFactory) { }

  public ngOnInit() {
    // if (this.a === 1) {
    //   this.form = 1;
    // } else {
    //   this.form = 2;
    // }
  }

}
