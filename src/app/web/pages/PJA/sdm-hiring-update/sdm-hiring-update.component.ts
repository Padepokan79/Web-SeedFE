import { Component, OnInit, ViewChild } from '@angular/core';
import { COMPARISON_OPERATOR } from '../../../../core/constant/constant';
import { ActivatedRoute } from '@angular/router';
import { CoreFactory } from '../../../../core/factory/core.factory';
import { Observable } from 'rxjs/Observable';
import { LOVService } from '../../../../core/services/uninjectable/lov.service';
import { DataTable } from '../../../../core/models/data-table';
import { InputForm } from '../../../../core/models/input-form';
import { ActionService } from '../../../../core/services/uninjectable/action.service';

@Component({
  selector: 'app-sdm-hiring-update',
  templateUrl: './sdm-hiring-update.component.html',
  styleUrls: ['./sdm-hiring-update.component.css']
})
export class SdmHiringUpdateComponent implements OnInit {

  @ViewChild('viewAsDateTemplate')
  public viewAsDateTemplate: any;
  @ViewChild('tableActionTemplate')
  public tableActionTemplate: any;

  public action: ActionService;
  public inputForm: InputForm;
  public dataTable: DataTable;
  public lovHiring: LOVService;
  public clients$: Observable<any>;
  private selectedId: number;

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
    this.inputForm = this._factory.inputForm({
      formControls: {
        client_name: '',
        sdm_name: '',
        hirestat_name: '',
      }
      // validationMessages: {
      //   task_id: {
      //     required: 'Silahkan masukkan Task ID',
      //     pattern: 'Hanya boleh angka'
      //   },
      //   user_id: {
      //     required: 'Silahkan masukkan User ID'
      //   }
      // }
    });

    // First Data Table Initialization
    this.dataTable = this._factory.dataTable({
      serverSide : true,
      pagingParams : {
        // filter: {
        //   operator: CONJUNCTION_OPERATOR.AND,
        //   component: [
        //       {
        //           field: 'skilltype_id',
        //           operator: COMPARISON_OPERATOR.EQ,
        //           value: Session.getUserData('skilltype_id')
        //       }
              // {
              //     field: 'kddati2',
              //     operator: COMPARISON_OPERATOR.EQ,
              //     value: Session.getUserData('kddati2')
              // }
        //   ]
        // },
        limit : 10
      },
      // searchCriteria : [
        // { viewValue: 'skilltype_id', viewKey: 'skilltype_id', type: TYPE.NUMBER },
        // { viewValue: 'skilltype_name', viewKey: 'skilltype_name', type: TYPE.NUMBER }
      // ],
      // tableColumns : [
        // { prop: 'skilltype_id', name: 'Skill ID', width: 100, sortable: false },
        // { prop: 'skilltype_name', name: 'Skill Type Name', width: 100, sortable: false },
        // { prop: 'id', name: 'Action', width: 100,
        //   cellTemplate: this.tableActionTemplate, sortable: false }
      // ]
    });

    this.action = this._factory.actions({
        api: 'project/mengelolaHiring',
        inputForm: this.inputForm,
        dataTable: this.dataTable
    });

    this.lovHiring = this._factory.lov({
        api: 'lov/StatusHiring',
        initializeData: true
    });

    const readAllApi = this._factory.api({
      api : 'project/mengelolaHiring/readAll',
      pagingParams : {
        filter : {
          field : 'sdmhiring_id',
          operator : COMPARISON_OPERATOR.EQ,
          value : this.selectedId
        }
      }
    });

    this._factory.http().get(readAllApi).subscribe((res: any) => {
      console.log(res);
      this.action.patchFormData(res.data.items[(this.selectedId - 1)]);

    });

  }
}
