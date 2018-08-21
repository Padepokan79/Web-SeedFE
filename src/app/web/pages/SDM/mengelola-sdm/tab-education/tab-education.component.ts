import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActionService } from '../../../../../core/services/uninjectable/action.service';
import { InputForm } from '../../../../../core/models/input-form';
import { DataTable } from '../../../../../core/models/data-table';
import { LOVService } from '../../../../../core/services/uninjectable/lov.service';
import { CoreFactory } from '../../../../../core/factory/core.factory';
import { COMPARISON_OPERATOR, CONJUNCTION_OPERATOR, TYPE } from '../../../../../core/constant/constant';
import { Comparison } from '../../../../../core/enums/comparison-operator.enum';

@Component({
  selector: 'app-tab-education',
  templateUrl: './tab-education.component.html',
  styleUrls: ['./tab-education.component.css']
})

export class TabEducationComponent implements OnInit {

  public selected = 0;
  public disabled = true;
  public disabled1 = false;
  public sdmterbesar = 0;

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

  constructor(private _factory: CoreFactory) { }

  public ngOnInit() {

    this.sdmid = this.sdmId;

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
          pattern: 'Masukkan tahun'
        },
        edu_enddate: {
          pattern: 'Masukkan tahun'
        }
      },
      isNewData: this.form === 1 ? true : false
    });

    if (this.form === 2) {
      // const readAllApi = this._factory.api({
      //   api: 'sdm/education/readAll',
      //   pagingParams: {
      //     filter: {
      //       field: 'sdm_id',
      //       operator: COMPARISON_OPERATOR.EQ,
      //       value: this.id
      //     }
      //   }
      // });

      // this._factory.http().get(readAllApi).subscribe((res: any) => {
      //   console.log(res);
      //   this.action.patchFormData(res.data.items[0]);
      // });

      this.dataTable = this._factory.dataTable({
        serverSide: true,
        pagingParams: {
          filter: Comparison.EQ('sdm_id', this.id.toString()),
          limit: 5
        },
        // searchCriteria: [
        //   { viewValue: 'ID SDM', viewKey: 'sdm_id', type: TYPE.NUMBER }
        // ],
        tableColumns: [
          { prop: 'norut', name: 'No', width: 10, sortable: false },
          { prop: 'edu_name', name: 'Nama Sekolah', width: 30, sortable: true },
          { prop: 'degree_name', name: 'Tingkat', width: 20, sortable: true },
          { prop: 'edu_subject', name: 'Jurusan', width: 20, sortable: true },
          { prop: 'edu_startdate', name: 'Tahun Masuk', width: 20, sortable: true },
          { prop: 'edu_enddate', name: 'Tahun Keluar', width: 20, sortable: true },
          {
            prop: 'edu_id', name: 'Action', width: 20,
            cellTemplate: this.tableActionTemplate, sortable: false
          }
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

  public resetForm() {
    this.action.onReset();
  }
}
