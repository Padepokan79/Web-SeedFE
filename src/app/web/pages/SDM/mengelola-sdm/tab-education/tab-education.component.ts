import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActionService } from '../../../../../core/services/uninjectable/action.service';
import { InputForm } from '../../../../../core/models/input-form';
import { DataTable } from '../../../../../core/models/data-table';
import { LOVService } from '../../../../../core/services/uninjectable/lov.service';
import { CoreFactory } from '../../../../../core/factory/core.factory';
import { COMPARISON_OPERATOR, CONJUNCTION_OPERATOR, TYPE } from '../../../../../core/constant/constant';
import { Comparison } from '../../../../../core/enums/comparison-operator.enum';
import { DefaultNotificationService } from '../../../../../core/services/default-notification.service';

// import { default as _rollupMoment, Moment } from 'moment';
// import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS, } from '../../../../../../../node_modules/@angular/material';

// import * as _moment from 'moment';
// // tslint:disable-next-line:no-duplicate-imports

// const moment = _rollupMoment || _moment;

// export const MY_FORMATS = {
//   parse: {
//     dateInput: 'YYYY',
//   },
//   display: {
//     dateInput: 'YYYY',
//   },
// };

@Component({
  selector: 'app-tab-education',
  templateUrl: './tab-education.component.html',
  styleUrls: ['./tab-education.component.scss'],
  // providers: [
  //   {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
  //   {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  // ],
})

export class TabEducationComponent implements OnInit {

  @Input()
  public form: number;
  @Input()
  public id: number;
  @Input()
  public sdmId: number;

  public sdmid: number;

  @ViewChild('viewAsDateTemplate')
  public viewAsDateTemplate: any;
  @ViewChild('tableActionTemplate')
  public tableActionTemplate: any;

  public action: ActionService;
  public inputForm: InputForm;
  public dataTable: DataTable;

  public lovDegree: LOVService;

  constructor(private _factory: CoreFactory,
              public _notif: DefaultNotificationService) {  }

  public ngOnInit() {

    if (this.form === 1) {
      this.sdmid = this.sdmId;
    } else {
      this.sdmid = this.id;
    }

    this.inputForm = this._factory.inputForm({
      formControls: {
        edu_id: null,
        edu_name: '',
        degree_id: '',
        edu_subject: '',
        edu_startdate: '',
        edu_enddate: '',
      },
      immutableFormControls: {
        sdm_id: this.sdmid
      },
      validationMessages: {
        edu_name: {
          required: 'Silahkan masukkan Nama Sekolah'
        },
        edu_startdate: {
          pattern: 'minimum 4 characters of number required'
        },
        edu_enddate: {
          pattern: 'minimum 4 characters of number required'
        }
      }
    });

    // if (this.form === 2) {
    this.dataTable = this._factory.dataTable({
      serverSide: true,
      pagingParams: {
        filter: Comparison.EQ('sdm_id', this.sdmid.toString()),
        limit: 5
      },
      // searchCriteria: [
      //   { viewValue: 'ID SDM', viewKey: 'sdm_id', type: TYPE.NUMBER }
      // ],
      tableColumns: [
        { prop: 'norut', name: 'No', flexGrow: 1, sortable: false },
        { prop: 'edu_name', name: 'Nama Sekolah', flexGrow: 5, sortable: true },
        { prop: 'degree_name', name: 'Tingkat', flexGrow: 3, sortable: true },
        { prop: 'edu_subject', name: 'Jurusan', flexGrow: 5, sortable: true },
        { prop: 'edu_startdate', name: 'Tahun Masuk', flexGrow: 2, sortable: true },
        { prop: 'edu_enddate', name: 'Tahun Keluar', flexGrow: 2, sortable: true },
        {
          prop: 'edu_id', name: 'Action', flexGrow: 2,
          cellTemplate: this.tableActionTemplate, sortable: false
        }
      ]
    });
    // }

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

  public validasiTahun() {
    if (this.action.getFormControlValue('edu_startdate') >= 1901 && this.action.getFormControlValue('edu_enddate') >= 1901 && this.action.getFormControlValue('edu_startdate') <= 2155 && this.action.getFormControlValue('edu_enddate') <= 2155) {
      if (this.action.getFormControlValue('edu_startdate') <= this.action.getFormControlValue('edu_enddate') ) {
          // tslint:disable-next-line:no-unused-expression
          this.action.onSave();
          this._notif.success({
            message: 'Berhasil'
          });
        } else {
          this._notif.error({
            message: 'Cek kembali tahun masuk dan keluar'
          });
        }
      } else {
        this._notif.error({
          message: 'Cek kembali tahun masuk dan keluar'
        });
      }
  }

}
