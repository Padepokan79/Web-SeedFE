import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionService } from '../../../../core/services/uninjectable/action.service';
import { DataTable } from '../../../../core/models/data-table';
import { CoreFactory } from '../../../../core/factory/core.factory';
import { TYPE } from '../../../../core/constant/constant';

@Component({
  selector: 'app-SDM004',
  templateUrl: './SDM004.component.html',
  styleUrls: ['./SDM004.component.css']
})
export class SDM004Component implements OnInit {
  public time: Date = new Date();
  @ViewChild('viewAsDateTemplate')
  public viewAsDateTemplate: any;
  @ViewChild('tableActionTemplate')
  public tableActionTemplate: any;
  public action: ActionService;
  public dataTable: DataTable;
  constructor(private _factory: CoreFactory) {}

  public ngOnInit() {
    setInterval(() => {
      this.time = new Date();
    }, 1);
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
        { viewValue: 'Nama', viewKey: 'sdm_name', type: TYPE.STRING }
      ],
      tableColumns : [
        { prop: 'sdmhistory_id', name: 'No', width: 20, sortable: true },
        { prop: 'sdm_name', name: 'Nama', width: 100, sortable: true },
        { prop: 'sdm_nik', name: 'NIK', width: 100, sortable: true },
        { prop: 'sdm_address', name: 'Alamat', width: 100, sortable: true },
        { prop: 'sdm_phone', name: 'Telfon', width: 100, sortable: true },
        { prop: 'sdm_startcontract', name: 'Start Date', width: 100,
          cellTemplate: this.viewAsDateTemplate, sortable: true },
        { prop: 'sdm_endcontract', name: 'End Date', width: 100,
          cellTemplate: this.viewAsDateTemplate, sortable: true },
        { prop: 'sdm_status', name: 'Status', width: 100, sortable: false },
        { prop: 'sdm_id', name: 'Action', width: 100,
          cellTemplate: this.tableActionTemplate, sortable: false }
      ]
    });

    this.action = this._factory.actions({
        api: 'sdm/MengelolaHistoriSdm/ReadAll',
        dataTable: this.dataTable
    });
  }
}
