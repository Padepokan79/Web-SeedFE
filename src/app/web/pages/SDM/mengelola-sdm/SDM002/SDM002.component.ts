import { Component, OnInit } from '@angular/core';
import { CoreFactory } from '../../../../../core/factory/core.factory';
import { ActivatedRoute } from '../../../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-SDM002',
  templateUrl: './SDM002.component.html',
  styleUrls: ['./SDM002.component.css']
})
export class SDM002Component implements OnInit {

  public form = 2;
  public time: Date = new Date();

  public id: string;
  private selectedId: string;

  constructor(
    private _factory: CoreFactory,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((param) => {
      this.selectedId = param.id;
      this.id = param.id;
    });
  }

  public ngOnInit() {
    console.log('Selected ID : ' + this.selectedId);
  }
}
