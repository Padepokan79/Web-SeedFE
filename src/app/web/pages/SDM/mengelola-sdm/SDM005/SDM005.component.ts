import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionService } from '../../../../../core/services/uninjectable/action.service';
import { CoreFactory } from '../../../../../core/factory/core.factory';
import { ActivatedRoute } from '../../../../../../../node_modules/@angular/router';
import { COMPARISON_OPERATOR } from '../../../../../core/constant/constant';
import { DataTable } from '../../../../../core/models/data-table';
import { InputForm } from '../../../../../core/models/input-form';

@Component({
  selector: 'app-SDM005',
  templateUrl: './SDM005.component.html',
  styleUrls: ['./SDM005.component.scss']
})
export class SDM005Component implements OnInit {
public action: ActionService;
public action2: ActionService;
public inputForm: InputForm;
public time: Date = new Date();

@ViewChild('viewAsDateTemplate')
public viewAsDateTemplate: any;
@ViewChild('tableActionTemplate')
public tableActionTemplate: any;
public dataTable: DataTable;
public dataTable2: DataTable;
private selectedId: string;

  constructor(
    private _factory: CoreFactory,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((param) => {
      this.selectedId = param.id;
    });
  }

  public ngOnInit() {
    console.log('Selected ID : ' + this.selectedId);
    setInterval(() => {
      this.time = new Date();
    }, 1);
    this.inputForm = this._factory.inputForm({
      formControls: {
        sdm_id: '',
        sdm_name: '',
        edu_name: '',
      },
    });
    this.dataTable = this._factory.dataTable({
      serverSide : true,
      pagingParams : {
      },
      tableColumns : [
          { prop: 'sdm_id', name: 'No', width: 20, sortable: true },
          { prop: 'sdm_name', name: 'Nama', width: 100, sortable: true },
      ]
    });

    this.dataTable2 = this._factory.dataTable({
      serverSide : true,
      pagingParams : {
      },
      tableColumns : [
        { prop: 'edu_id', name: 'No', width: 20, sortable: true },
        { prop: 'edu_name', name: 'Nama', width: 100, sortable: true },
        { prop: 'edu_subject', name: 'Subject', width: 100, sortable: true },    ]
    });

    this.action = this._factory.actions({
      api: 'sdm/MengelolaSdm/',
      inputForm: this.inputForm,
      dataTable: this.dataTable
    });

    this.action2 = this._factory.actions({
  api: 'sdm/Education',
  dataTable: this.dataTable2,
  inputForm: this.inputForm,
});

    const readAllApi = this._factory.api({
      api: 'sdm/MengelolaSdm/ReadAll',
      pagingParams : {
        filter : {
          field : 'sdm_id',
          operator : COMPARISON_OPERATOR.EQ,
          value : this.selectedId
       }
     }
    });

    this._factory.http().get(readAllApi).subscribe((res: any) => {
      console.log(res);
      this.action.patchFormData(res.data.items[0]);
    });
  }
}
