import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActionService } from '../../../../../core/services/uninjectable/action.service';
import { InputForm } from '../../../../../core/models/input-form';
import { DataTable } from '../../../../../core/models/data-table';
import { CoreFactory } from '../../../../../core/factory/core.factory';
import { COMPARISON_OPERATOR } from '../../../../../core/constant/constant';

@Component({
  selector: 'app-tab-employment',
  templateUrl: './tab-employment.component.html',
  styleUrls: ['./tab-employment.component.css']
})
export class TabEmploymentComponent implements OnInit {

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

  constructor(private _factory: CoreFactory) { }

  public ngOnInit() {

    if (this.form === 1) {
      this.sdmid = 113;
    } else {
      this.sdmid = this.id;
    }

    this.inputForm = this._factory.inputForm({
      formControls: {
        employment_id: 0,
        sdm_id: this.sdmid,
        employment_corpname: '',
        employment_startdate: '',
        employment_enddate: '',
        employment_rolejob: '',
      },
      validationMessages: {
        employment_corpname: {
          required: 'Silahkan masukkan Nama Perusahaan'
        }
      }
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
        limit : 5
      },
      tableColumns : [
        { prop: 'employment_id', name: 'No', width: 10, sortable: false },
        { prop: 'employment_corpname', name: 'Nama Perusahaan', width: 30, sortable: true },
        { prop: 'employment_startdate', name: 'Dari', width: 30, sortable: true },
        { prop: 'employment_enddate', name: 'Sampai', width: 30, sortable: true },
        { prop: 'employment_id', name: 'Action', width: 20,
          cellTemplate: this.tableActionTemplate, sortable: false }
      ]
    });
  }

    this.action = this._factory.actions({
      api: 'sdm/Employment',
      inputForm: this.inputForm,
      dataTable: this.dataTable
    });
  }

}
