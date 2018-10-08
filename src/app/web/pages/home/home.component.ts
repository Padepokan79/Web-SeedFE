import { Component, OnInit } from '@angular/core';
import { ActionService } from '../../../core/services/uninjectable/action.service';
import { CoreFactory } from '../../../core/factory/core.factory';
import { HttpClient } from '../../../../../node_modules/@angular/common/http';

@Component({
    templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
  public action: ActionService;

  constructor(
    public _factory: CoreFactory,
    private http: HttpClient) {

  }

  public ngOnInit() {
    // tslint:disable-next-line:prefer-const

    this.http.get(this._factory.api({api: 'sdm/mengelolaHistoriSdm/cekStatusSdm'})).subscribe((res: any) => {
      console.log(res);
    });
    this.http.get(this._factory.api({api: 'project/sdmAssignment/cekDataAssign'})).subscribe((res: any) => {
      console.log(res);
    });
  }
}
