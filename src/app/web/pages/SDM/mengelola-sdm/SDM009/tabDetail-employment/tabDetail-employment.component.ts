import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActionService } from '../../../../../../core/services/uninjectable/action.service';
import { InputForm } from '../../../../../../core/models/input-form';
import { DataTable } from '../../../../../../core/models/data-table';
import { CoreFactory } from '../../../../../../core/factory/core.factory';
import { COMPARISON_OPERATOR, TYPE } from '../../../../../../core/constant/constant';
import { LOVService } from '../../../../../../core/services/uninjectable/lov.service';

@Component({
  selector: 'app-tabDetail-employment',
  templateUrl: './tabDetail-employment.component.html',
  styleUrls: ['./tabDetail-employment.component.css']
})
export class TabDetailEmploymentComponent implements OnInit {

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

  public lovEmployment: LOVService;

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
        course_title: {
          required: 'Silahkan masukkan Nama Kursus'
        }
      }
    });

    this.dataTable = this._factory.dataTable({
      serverSide : true,
      pagingParams : {
        limit : 10
      },
      // searchCriteria : [
      //   { viewValue: 'Corp Name', viewKey: 'employment_corpname', type: TYPE.STRING}
      // ],
      tableColumns : [
        { prop: 'employment_corpname', name: 'Nama Perusahaan', width: 40, sortable: false },
        { prop: 'employment_startdate', name: 'Tanggal masuk', width: 100, sortable: false },
        { prop: 'employment_enddate', name: 'Tanggal keluar', width: 100, sortable: false },
        { prop: 'employment_rolejob', name: 'Jabatan', width: 100, sortable: false }
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
          limit : 5
        },
        tableColumns : [
          { prop: 'employment_corpname', name: 'Nama Perusahaan', width: 40, sortable: false },
          { prop: 'employment_startdate', name: 'Tanggal masuk', width: 100, sortable: false },
          { prop: 'employment_enddate', name: 'Tanggal keluar', width: 100, sortable: false },
          { prop: 'employment_rolejob', name: 'Jabatan', width: 100,
            cellTemplate: this.tableActionTemplate, sortable: false }

        ]
      });
    }
    this.action = this._factory.actions({
      api: 'sdm/employment',
      dataTable: this.dataTable
    });

    this.lovEmployment = this._factory.lov({
      api: 'lov/degree',
      initializeData: true
    });
  }

}
