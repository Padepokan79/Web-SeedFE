import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActionService } from '../../../../core/services/uninjectable/action.service';
import { InputForm } from '../../../../core/models/input-form';
import { CoreFactory } from '../../../../core/factory/core.factory';
import { DataTable } from '../../../../core/models/data-table';

@Component({
  selector: 'sdm-tab-employment',
  templateUrl: './tab-employment.component.html',
  styleUrls: ['./tab-employment.component.scss']
})
export class TabEmploymentComponent implements OnInit {

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

    this.dataTable = this._factory.dataTable({
      serverSide : true,
      pagingParams : {
        limit : 5
      },
      tableColumns : [
        { prop: 'employment_id', name: 'No', width: 10, sortable: false },
        { prop: 'employment_corpname', name: 'Nama Perusahaan', width: 30, sortable: true },
        { prop: 'employment_id', name: 'Action', width: 20,
          cellTemplate: this.tableActionTemplate, sortable: false }
      ]
    });

    this.action = this._factory.actions({
      api: 'sdm/employment',
      inputForm: this.inputForm,
      dataTable: this.dataTable
    });
  }

}
