import { TYPE, COMPARISON_OPERATOR, CONJUNCTION_OPERATOR } from 'app/core/constant/constant';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionService } from '../../../../core/services/uninjectable/action.service';
import { InputForm } from '../../../../core/models/input-form';
import { DataTable } from '../../../../core/models/data-table';
import { LOVService } from '../../../../core/services/uninjectable/lov.service';
import { ActivatedRoute, Router } from '../../../../../../node_modules/@angular/router';
import { CoreFactory } from '../../../../core/factory/core.factory';
import { DefaultNotificationService } from '../../../../core/services/default-notification.service';

export interface Option {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-SDM007',
  templateUrl: './SDM007.component.html',
  styleUrls: ['./SDM007.component.scss']
})
export class SDM007Component implements OnInit {

  // @ViewChild('viewAsDateTemplate')
  // public viewAsDateTemplate: any;
  // @ViewChild('tableActionTemplate')
  // public tableActionTemplate: any;

  public time: Date = new Date();
  public action: ActionService;
  public inputForm: InputForm;
  public dataTable: DataTable;

  public lovSdm: LOVService;
  public lovCondition: LOVService;

  public sdmName: string;
  private selectedId: string;

  constructor(
    public _notif: DefaultNotificationService,
    private _factory: CoreFactory,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe((param) => {
      this.selectedId = param.id;
    });
  }

  public ngOnInit() {

    setInterval(() => {
      this.time = new Date();
    }, 1);
    this.inputForm = this._factory.inputForm({
      formControls: {
        sdm_id: '',
        psyco_id: '',
        sdmpsycological_id: '',
        sdmpsycological_desc: '',
        psycological_date: ''
      },
    });

    // this.dataTable = this._factory.dataTable({
    // serverSide : true,
    // tableColumns : [
    //     { prop: 'sdm_name', name: 'SDM Name', width: 100, sortable: false },
    //     { prop: 'psyco_name', name: 'Condition', width: 100, sortable: false },
    //     { prop: 'sdmpsycological_desc', name: 'Description', width: 100, sortable: false },
    //     { prop: 'psycological_date', name: 'Date', width: 100,
    //       cellTemplate: this.viewAsDateTemplate, sortable: false }
    //   ]
    // });

    this.action = this._factory.actions({
        api: 'sdm/sdmPsycological',
        inputForm: this.inputForm,
        // dataTable: this.dataTable
    });

    this.lovSdm = this._factory.lov({
        api: 'lov/sdm',
        initializeData: true
    });

    this.lovCondition = this._factory.lov({
        api: 'lov/psychologicals',
        initializeData: true
    });

    const readAllApi = this._factory.api ({
      api: 'sdm/sdmPsycological/readAll',
      pagingParams : {
        filter : {
          field : 'sdmpsycological_id',
          operator : COMPARISON_OPERATOR.EQ,
          value : this.selectedId
        }
      }
    });

    this._factory.http().get(readAllApi).subscribe((res: any) => {
      // console.log(res);
      this.action.patchFormData(res.data.items[0]);
      this.sdmName = res.data.items[0].sdm_name;
    });
  }

  public onUpdate() {
    const updateAPI = this._factory.api({
      api : 'sdm/sdmPsycological/update',
      // params : {
      //   client_id : this.selectedId
      // }
    });

    // tslint:disable-next-line:no-empty
    this._factory.http().put(updateAPI + '?sdmpsycological_id=' + this.selectedId, this.action.getFormData()).subscribe((response: any) => {
      this._notif.success({
        message: 'Successfully Update Data'
      });
      setTimeout(() => this.router.navigate(['pages/sdm/SDM008']), 1000);
    });

  }

}
