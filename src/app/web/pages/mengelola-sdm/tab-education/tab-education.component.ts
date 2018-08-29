import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActionService } from '../../../../core/services/uninjectable/action.service';
import { InputForm } from '../../../../core/models/input-form';
import { LOVService } from '../../../../core/services/uninjectable/lov.service';
import { CoreFactory } from '../../../../core/factory/core.factory';
import { DataTable } from '../../../../core/models/data-table';
import { TYPE } from '../../../../core/constant/constant';

@Component({
  selector: 'app-tab-education',
  templateUrl: './tab-education.component.html',
  styleUrls: ['./tab-education.component.scss']
})

export class TabEducationComponent implements OnInit {

  @Input()
  public form: number;

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

    this.inputForm = this._factory.inputForm({
      formControls: {
        sdm_id: 113,
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

    this.dataTable = this._factory.dataTable({
      serverSide : true,
      pagingParams : {
        limit : 5
      },
      // searchCriteria : [
      //   { viewValue: 'ID SDM', viewKey: 'sdm_id', type: TYPE.NUMBER }
      // ],
      tableColumns : [
        { prop: 'edu_id', name: 'No', width: 10, sortable: false },
        { prop: 'edu_name', name: 'Nama Sekolah', width: 30, sortable: true },
        { prop: 'gelar', name: 'Tingkat', width: 20, sortable: true },
        { prop: 'edu_subject', name: 'Jurusan', width: 20, sortable: true },
        { prop: 'edu_startdate', name: 'Tahun Masuk', width: 20, sortable: true },
        { prop: 'edu_enddate', name: 'Tahun Keluar', width: 20, sortable: true },
        { prop: 'edu_id', name: 'Action', width: 20,
          cellTemplate: this.tableActionTemplate, sortable: false }
      ]
    });

    this.action = this._factory.actions({
      api: 'sdm/Education',
      dataTable: this.dataTable,
      inputForm: this.inputForm
    });

    this.lovDegree = this._factory.lov({
      api: 'lov/degree',
      initializeData: true
    });
  }
}
