import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActionService } from '../../../../../core/services/uninjectable/action.service';
import { InputForm } from '../../../../../core/models/input-form';
import { DataTable } from '../../../../../core/models/data-table';
import { CoreFactory } from '../../../../../core/factory/core.factory';
import { COMPARISON_OPERATOR } from '../../../../../core/constant/constant';
import { Comparison } from 'app/core/enums/comparison-operator.enum';

@Component({
  selector: 'app-tab-profil',
  templateUrl: './tab-profil.component.html',
  styleUrls: ['./tab-profil.component.css']
})
export class TabProfilComponent implements OnInit {

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

  constructor(private _factory: CoreFactory) { }

  public ngOnInit() {

    if (this.form === 1) {
      this.sdmid = this.sdmId;
    } else {
      this.sdmid = this.id;
    }

    this.inputForm = this._factory.inputForm({
      formControls: {
        profiling_name: '',
        profiling_id: 0,
      },
      immutableFormControls: {
        sdm_id: this.sdmid,
      },
      validationMessages: {
        profiling_name: {
          required: 'Silahkan masukkan Nama Lengkap'
        }
      }
    });

    // if (this.form === 2) {

    this.dataTable = this._factory.dataTable({
      serverSide : true,
      pagingParams : {
        filter: Comparison.EQ('sdm_id', this.sdmid.toString()),
        limit : 500
      },
      tableColumns : [
        { prop: 'norut', name: 'No', width: 10, sortable: false },
        { prop: 'profiling_name', name: 'Keterangan', width: 10, sortable: false },
        { prop: 'profiling_id', name: 'Action', width: 20,
          cellTemplate: this.tableActionTemplate, sortable: false }
      ]
    });
  // }

    this.action = this._factory.actions({
      api: 'sdm/profiling',
      dataTable: this.dataTable,
      inputForm: this.inputForm
    });
  }

}
