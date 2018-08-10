import { TYPE, CONJUNCTION_OPERATOR, COMPARISON_OPERATOR } from 'app/core/constant/constant';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActionService } from '../../../../core/services/uninjectable/action.service';
import { InputForm } from '../../../../core/models/input-form';
import { DataTable } from '../../../../core/models/data-table';
import { CoreFactory } from '../../../../core/factory/core.factory';
import { LOVService } from '../../../../core/services/uninjectable/lov.service';
import { Session } from '../../../../core/utils/session';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sdm-assignment',
  templateUrl: './sdm-assignment.component.html',
  styleUrls: ['./sdm-assignment.component.css']
})

export class SdmAssignmentComponent implements OnInit {

  @ViewChild('viewAsDateTemplate')
  public viewAsDateTemplate: any;
  @ViewChild('tableActionTemplate')
  public tableActionTemplate: any;

  public action: ActionService;
  public inputForm: InputForm;
  public dataTable: DataTable;
  public lovClient: LOVService;
  // public dataRow: any;
  // public lovUser: LOVService;

  constructor(
    private _factory: CoreFactory,
    private router: Router
  ) { }

  public ngOnInit() {

    this.inputForm = this._factory.inputForm({
      formControls: {
        sdmassign_id: '',
        sdmassign_loc: '',
        sdmassign_picclient: '',
        client_id: '',
        client_name: '',
        method_id: '',
        method_name: '',
      }
      // validationMessages: {
      //   task_id: {
      //     required: 'Silahkan masukkan Task ID',
      //     pattern: 'Hanya boleh angka'
      //   },
      //   user_id: {
      //     required: 'Silahkan masukkan User ID'
      //   }
      // }
    });

    // First Data Table Initialization
    this.dataTable = this._factory.dataTable({
      serverSide : true,
      pagingParams : {
        limit : 10
      },
      searchCriteria : [
        { viewValue: 'sdmassign_id', viewKey: 'ID', type: TYPE.NUMBER },
        { viewValue: 'sdmassign_picclient', viewKey: 'Client', type: TYPE.STRING }
      ],
      tableColumns : [
        { prop: 'sdmassign_id', name: 'Assign ID', width: 15, sortable: false },
        { prop: 'sdmassign_startdate', name: 'Start', width: 15, sortable: false },
        { prop: 'sdmassign_enddate', name: 'End', width: 15, sortable: false },
        { prop: 'sdmassign_loc', name: 'Location', width: 20, sortable: false },
        { prop: 'sdmassign_picclient', name: 'PIC Name', width: 50, sortable: false },
        { prop: 'sdmassign_picclientphone', name: 'PIC Contact', width: 50, sortable: false },
        { prop: 'sdmassign_id', name: 'Action', width: 15,
          cellTemplate: this.tableActionTemplate, sortable: false }
      ]
    });

    this.action = this._factory.actions({
        api: 'project/SdmAssignment',
        inputForm: this.inputForm,
        dataTable: this.dataTable
    });

    this.lovClient = this._factory.lov({
        api: 'lov/Clients',
        initializeData: true
    });

  }

  public navigateEditMenu(id) {
    this.router.navigate(['/pages/pja/PJA011', { id }]);
  }

}
