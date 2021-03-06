import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActionService } from '../../../../core/services/uninjectable/action.service';
import { InputForm } from '../../../../core/models/input-form';
import { CoreFactory } from '../../../../core/factory/core.factory';
import { DataTable } from '../../../../core/models/data-table';

@Component({
  selector: 'sdm-tab-profil',
  templateUrl: './tab-profil.component.html',
  styleUrls: ['./tab-profil.component.scss']
})
export class TabProfilComponent implements OnInit {

  @Input()
  public form: number;

  @ViewChild('viewAsDateTemplate')
  public viewAsDateTemplate: any;
  @ViewChild('tableActionTemplate')
  public tableActionTemplate: any;

  public action: ActionService;
  public inputForm: InputForm;
  public dataTable: DataTable;

  constructor(private _factory: CoreFactory) { }

  public ngOnInit() {

    this.inputForm = this._factory.inputForm({
      formControls: {
        sdm_id: 113,
        profiling_name: '',
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
        limit : 5
      },
      tableColumns : [
        { prop: 'profiling_name', name: 'No', width: 10, sortable: false },
        { prop: 'profiling_id', name: 'Action', width: 20,
          cellTemplate: this.tableActionTemplate, sortable: false }
      ]
    });

    this.action = this._factory.actions({
      api: 'sdm/profiling',
      dataTable: this.dataTable,
      inputForm: this.inputForm
    });
  }

}
