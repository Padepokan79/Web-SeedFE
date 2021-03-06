import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActionService } from '../../../../../../core/services/uninjectable/action.service';
import { InputForm } from '../../../../../../core/models/input-form';
import { DataTable } from '../../../../../../core/models/data-table';
import { LOVService } from '../../../../../../core/services/uninjectable/lov.service';
import { CoreFactory } from '../../../../../../core/factory/core.factory';
import { COMPARISON_OPERATOR, TYPE } from '../../../../../../core/constant/constant';
import { ActivatedRoute } from '@angular/router';
import { Comparison } from '../../../../../../core/enums/comparison-operator.enum';
import { Location } from '@angular/common';
@Component({
  selector: 'app-tabDetail-Education',
  templateUrl: './tabDetail-Education.component.html',
  styleUrls: ['./tabDetail-Education.component.scss']
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
  private selectedId: any;

  constructor( private _factory: CoreFactory,
               private route: ActivatedRoute,
               private location: Location
  ) {
    this.route.params.subscribe((param) => {
      this.selectedId = param.id;
      console.log(this.selectedId);
    });
  }

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
        degree_name: '',
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
        filter: Comparison.EQ('sdm_id', this.selectedId),
        limit : 10
      },
      // searchCriteria : [
      //   { viewValue: 'Edu Name', viewKey: 'edu_name', type: TYPE.STRING}
      // ],
      tableColumns : [
        { prop: 'edu_name', name: 'Nama Sekolah', flexGrow: 5, sortable: false },
        { prop: 'edu_subject', name: 'Jurusan', flexGrow: 4, sortable: false },
        { prop: 'degree_name', name: 'Tingkat', flexGrow: 3, sortable: false },
        { prop: 'edu_startdate', name: 'Tahun Masuk', flexGrow: 2, sortable: false },
        { prop: 'edu_enddate', name: 'Tahun Keluar', flexGrow: 2, sortable: false }
      ]
    });

  //   if (this.form === 2) {

  //   this.dataTable = this._factory.dataTable({
  //     serverSide : true,
  //     pagingParams : {
  //       filter: {
  //         field: 'sdm_id',
  //         operator: COMPARISON_OPERATOR.EQ,
  //         value: this.id
  //       },
  //       limit : 5
  //     },
  //     searchCriteria : [
  //       { viewValue: 'ID SDM', viewKey: 'sdm_id', type: TYPE.NUMBER }
  //     ],
  //     tableColumns : [
  //       { prop: 'sdm_id', name: 'No', width: 10, sortable: false },
  //       { prop: 'edu_name', name: 'Nama Sekolah', width: 30, sortable: true },
  //       { prop: 'degree_name', name: 'Tingkat', width: 20, sortable: true },
  //       { prop: 'edu_subject', name: 'Jurusan', width: 20, sortable: true },
  //       { prop: 'edu_startdate', name: 'Tahun Masuk', width: 20, sortable: true },
  //       { prop: 'edu_enddate', name: 'Tahun Keluar', width: 20, sortable: true },
  //       { prop: 'edu_id', name: 'Action', width: 20,
  //         cellTemplate: this.tableActionTemplate, sortable: false }
  //     ]
  //   });

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

    const readAllApi = this._factory.api({
      api : 'sdm/education/readAll',
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
      // this.dataTable = res.data.items[0];
    });
  }
  public goBack() {
      this.location.back();
    }
}
