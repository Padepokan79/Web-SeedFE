import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActionService } from '../../../../../../core/services/uninjectable/action.service';
import { DataTable } from '../../../../../../core/models/data-table';
import { InputForm } from '../../../../../../core/models/input-form';
import { CoreFactory } from '../../../../../../core/factory/core.factory';
import { COMPARISON_OPERATOR, TYPE } from '../../../../../../core/constant/constant';
import { LOVService } from '../../../../../../core/services/uninjectable/lov.service';

@Component({
  selector: 'app-tabDetail-profil',
  templateUrl: './tabDetail-profil.component.html',
  styleUrls: ['./tabDetail-profil.component.css']
})
export class TabDetailProfilComponent implements OnInit {

  public selected = 0;
  public disabled = true;
  public disabled1 = false;
  public sdmterbesar = 0;

  @Input()
  public form: number;
  @Input()
  public id: number;

  public sdmid: number;

  @ViewChild('viewAsDateTemplate')
  public viewAsDateTemplate: any;
  @ViewChild('tableActionTemplate')
  public tableActionTemplate: any;

  public action: ActionService;
  public inputForm: InputForm;
  public dataTable: DataTable;

  public lovProfiling: LOVService;

  constructor(private _factory: CoreFactory) { }

  public ngOnInit() {

      if (this.form === 1) {
        this.sdmid = 113;
      } else {
        this.sdmid = this.id;
      }

      this.inputForm = this._factory.inputForm({
        formControls: {
          sdm_id: this.sdmid,
          profiling_name: '',
          profiling_id: 0,
        },
        validationMessages: {
          profiling_name: {
            required: 'Silahkan masukkan Nama Lengkap'
          }
        }
      });

      this.dataTable = this._factory.dataTable({
        serverSide : true,
        pagingParams : {
          limit : 10
        },
        searchCriteria : [
          { viewValue: 'Edu Name', viewKey: 'edu_name', type: TYPE.STRING}
        ],
        tableColumns : [
          { prop: 'profiling_id', name: 'No', width: 40, sortable: false },
          { prop: 'profiling_name', name: 'Profil', width: 100, sortable: false },
        ]
      });

      if (this.form === 2) {

      this.dataTable = this._factory.dataTable({
        serverSide : true,
        pagingParams : {
          filter: {
            field: 'sdm_id',
            operator: COMPARISON_OPERATOR.EQ,
            value: this.id
          },
          limit : 500
        },
        tableColumns : [
          { prop: 'profiling_id', name: 'id', width: 10, sortable: false },
          { prop: 'profiling_name', name: 'No', width: 10, sortable: false },
          { prop: 'profiling_id', name: 'Action', width: 20,
            cellTemplate: this.tableActionTemplate, sortable: false }
        ]
      });
    }

      this.action = this._factory.actions({
        api: 'sdm/profiling',
        dataTable: this.dataTable,
        inputForm: this.inputForm
      });

      this.lovProfiling = this._factory.lov({
        api: 'lov/degree',
        initializeData: true
      });
  }

}
