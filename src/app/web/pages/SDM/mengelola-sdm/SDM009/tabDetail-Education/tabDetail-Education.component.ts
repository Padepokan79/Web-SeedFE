import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActionService } from '../../../../../../core/services/uninjectable/action.service';
import { InputForm } from '../../../../../../core/models/input-form';
import { DataTable } from '../../../../../../core/models/data-table';
import { LOVService } from '../../../../../../core/services/uninjectable/lov.service';
import { CoreFactory } from '../../../../../../core/factory/core.factory';
import { COMPARISON_OPERATOR, TYPE } from '../../../../../../core/constant/constant';

@Component({
  selector: 'app-tabDetail-Education',
  templateUrl: './tabDetail-Education.component.html',
  styleUrls: ['./tabDetail-Education.component.css']
})
export class TabDetailEducationComponent implements OnInit {

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

  public lovDegree: LOVService;

  constructor(private _factory: CoreFactory) { }

  public ngOnInit() {
    if (this.form === 1) {
      this.sdmid = 113;
    } else {
      this.sdmid = this.id;
    }

    this.inputForm = this._factory.inputForm({
      formControls: {
        edu_id: 0,
        sdm_id: this.sdmid,
        edu_name: '',
        degree_id: '',
        edu_subject: '',
        edu_startdate: '',
        edu_enddate: '',
      },
      validationMessages: {
        edu_name: {
          required: 'Silahkan masukkan Nama Sekolah'
        },
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
      searchCriteria : [
        { viewValue: 'ID SDM', viewKey: 'sdm_id', type: TYPE.NUMBER }
      ],
      tableColumns : [
        { prop: 'sdm_id', name: 'No', width: 10, sortable: false },
        { prop: 'edu_name', name: 'Nama Sekolah', width: 30, sortable: true },
        { prop: 'gelar', name: 'Tingkat', width: 20, sortable: true },
        { prop: 'edu_subject', name: 'Jurusan', width: 20, sortable: true },
        { prop: 'edu_startdate', name: 'Tahun Masuk', width: 20, sortable: true },
        { prop: 'edu_enddate', name: 'Tahun Keluar', width: 20, sortable: true },
        { prop: 'edu_id', name: 'Action', width: 20,
          cellTemplate: this.tableActionTemplate, sortable: false }
      ]
    });

  }
    this.action = this._factory.actions({
      api: 'sdm/Education',
      dataTable: this.dataTable,
      inputForm: this.inputForm,
    });

    this.lovDegree = this._factory.lov({
      api: 'lov/degree',
      initializeData: true
    });
  }

}
