import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActionService } from '../../../../../core/services/uninjectable/action.service';
import { InputForm } from '../../../../../core/models/input-form';
import { DataTable } from '../../../../../core/models/data-table';
import { CoreFactory } from '../../../../../core/factory/core.factory';
import { COMPARISON_OPERATOR } from '../../../../../core/constant/constant';
import { Comparison } from 'app/core/enums/comparison-operator.enum';

@Component({
  selector: 'app-tab-employment',
  templateUrl: './tab-employment.component.html',
  styleUrls: ['./tab-employment.component.scss']
})
export class TabEmploymentComponent implements OnInit {

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
  public date: Date = new Date();
  public currentDate: Date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate()-1);
  constructor(private _factory: CoreFactory) { }

  public ngOnInit() {

    if (this.form === 1) {
      this.sdmid = this.sdmId;
    } else {
      this.sdmid = this.id;
    }

    this.inputForm = this._factory.inputForm({
      formControls: {
        employment_id: 0,
        employment_corpname: '',
        employment_startdate: '',
        employment_enddate: '',
        employment_rolejob: '',
      },
      immutableFormControls: {
        sdm_id: this.sdmid,
      },
      validationMessages: {
        employment_corpname: {
          required: 'Silahkan masukkan Nama Perusahaan'
        }
      }
    });

    // if (this.form === 2) {
    this.dataTable = this._factory.dataTable({
      serverSide : true,
      pagingParams : {
        filter: Comparison.EQ('sdm_id', this.sdmid.toString()),
        limit : 5
      },
      tableColumns : [
        { prop: 'norut', name: 'No', flexGrow: 1, sortable: false },
        { prop: 'employment_corpname', name: 'Nama Perusahaan', flexGrow: 10, sortable: true },
        { prop: 'employment_startdate', name: 'Dari', flexGrow: 2, sortable: true },
        { prop: 'employment_enddate', name: 'Sampai', flexGrow: 2, sortable: true },
        { prop: 'employment_id', name: 'Action', flexGrow: 2,
          cellTemplate: this.tableActionTemplate, sortable: false }
      ]
    });
  // }

    this.action = this._factory.actions({
      api: 'sdm/Employment',
      inputForm: this.inputForm,
      dataTable: this.dataTable
    });
  }

}
