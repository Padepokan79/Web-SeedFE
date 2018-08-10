import { TYPE, COMPARISON_OPERATOR, CONJUNCTION_OPERATOR } from 'app/core/constant/constant';
import { Session } from 'app/core/utils/session';
import { CoreFactory } from './../../../../core/factory/core.factory';
import { DataTable } from './../../../../core/models/data-table';
import { InputForm } from './../../../../core/models/input-form';
import { ActionService } from './../../../../core/services/uninjectable/action.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LOVService } from '../../../../core/services/uninjectable/lov.service';

@Component({
  selector: 'app-form-with-table',
  templateUrl: './form-with-table.component.html',
  styleUrls: ['./form-with-table.component.scss']
})
export class FormWithTableComponent implements OnInit {

  @ViewChild('viewAsDateTemplate')
  public viewAsDateTemplate: any;
  @ViewChild('tableActionTemplate')
  public tableActionTemplate: any;

  public action: ActionService;
  public inputForm: InputForm;
  public dataTable: DataTable;

  public lovTask: LOVService;
  public lovUser: LOVService;

  constructor(private _factory: CoreFactory) { }

  public ngOnInit() {
    this.inputForm = this._factory.inputForm({
      formControls: {
        task_id: '',
        user_id: '',
        tas_task_id: '',
        start_date_time: '',
        end_date_time: '',
        description: '',
        is_deleted: '',
        is_complete: '',
        // client_id: '',
        // client_name: '',
        // client_address: '',
        // client_picclient: '',
        // client_mobileclient: '',
      },
      validationMessages: {
        task_id: {
          required: 'Silahkan masukkan Task ID',
          pattern: 'Hanya boleh angka'
        },
        user_id: {
          required: 'Silahkan masukkan User ID'
        }
      }
    });

    // First Data Table Initialization
    this.dataTable = this._factory.dataTable({
      serverSide : true,
      pagingParams : {
        // filter: {
        //   operator: CONJUNCTION_OPERATOR.AND,
        //   component: [
        //       {
        //           field: 'kddati1',
        //           operator: COMPARISON_OPERATOR.EQ,
        //           value: Session.getUserData('kddati1')
        //       },
        //       {
        //           field: 'kddati2',
        //           operator: COMPARISON_OPERATOR.EQ,
        //           value: Session.getUserData('kddati2')
        //       }
        //   ]
        // },
        limit : 5
      },
      searchCriteria : [
        { viewValue: 'Client ID', viewKey: 'client_id', type: TYPE.NUMBER }
      ],
      tableColumns : [
        // { prop: 'client_id', name: 'Client ID', width: 100, sortable: false },
        { prop: 'start_date_time', name: 'Start Date', width: 100,
          cellTemplate: this.viewAsDateTemplate, sortable: false },
        { prop: 'client_name', name: 'Client Name', width: 100, sortable: false },
        { prop: 'end_date_time', name: 'End Date', width: 100,
          cellTemplate: this.viewAsDateTemplate, sortable: false },
        { prop: 'assign_to_username', name: 'Assign To', width: 100, sortable: false },
        { prop: 'is_deleted', name: 'Delete', width: 100, sortable: false },
        { prop: 'is_complete', name: 'Complete', width: 100, sortable: false },
        { prop: 'id', name: 'Action', width: 100,
          cellTemplate: this.tableActionTemplate, sortable: false }
        // { prop: 'client_name', name: 'Client Name', width: 100, sortable: false },
        // { prop: 'client_address', name: 'Client Address', width: 100, sortable: false },
        // { prop: 'client_picclient', name: 'Client PIC', width: 100, sortable: false },
        // { prop: 'client_mobileclient', name: 'Client Mobile', width: 100, sortable: false },

      ]
    });

    this.action = this._factory.actions({
        // api: 'api/management/Task',
        api: 'project/MengelolaClient',
        inputForm: this.inputForm,
        dataTable: this.dataTable
    });

    this.lovTask = this._factory.lov({
        api: 'lov/Task',
        initializeData: true
    });

    this.lovUser = this._factory.lov({
        api: 'lov/Clients',
        initializeData: true
    });
  }
}
