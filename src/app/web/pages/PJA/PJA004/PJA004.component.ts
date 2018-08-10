import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionService } from '../../../../core/services/uninjectable/action.service';
import { DataTable } from '../../../../core/models/data-table';
import { CoreFactory } from '../../../../core/factory/core.factory';
import { TYPE } from '../../../../core/constant/constant';
import { Router } from '../../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-PJA004',
  templateUrl: './PJA004.component.html',
  styleUrls: ['./PJA004.component.css']
})
export class PJA004Component implements OnInit {

  public time: Date = new Date();

  // public btnClick = function() {
  //   this.router.navigateByUrl('/dashboard');
  // };

  @ViewChild('tableActionTemplate')
  public tableActionTemplate: any;

  public action: ActionService;
  public dataTable: DataTable;

  constructor(private _factory: CoreFactory, private router: Router) { }

  public ngOnInit() {

    setInterval(() => {
      this.time = new Date();
    }, 1);

    // First Data Table Initialization
    this.dataTable = this._factory.dataTable({
      serverSide : true,
      pagingParams : {
        limit : 10
      },
      searchCriteria : [
        { viewValue: 'Client Name', viewKey: 'client_name', type: TYPE.STRING }
      ],
      tableColumns : [
        { prop: 'no_urut', name: 'No', width: 100, sortable: false },
        { prop: 'client_name', name: 'Client Name', width: 30, sortable: true },
        { prop: 'client_picclient', name: 'PIC Handler', width: 20, sortable: true },
        { prop: 'client_mobileclient', name: 'Contact Person', width: 20, sortable: true },
        { prop: 'client_name', name: 'Action', width: 20,
          cellTemplate: this.tableActionTemplate, sortable: false }

      ]
    });

    this.action = this._factory.actions({
      api: 'project/MengelolaClient',
      dataTable: this.dataTable
  });
  }

  public navigateEditMenu(id) {
    this.router.navigate(['/pages/pja/PJA006', { id }]);
  }
}
