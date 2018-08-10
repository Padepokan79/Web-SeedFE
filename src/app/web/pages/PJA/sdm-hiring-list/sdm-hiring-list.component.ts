import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionService } from '../../../../core/services/uninjectable/action.service';
import { InputForm } from '../../../../core/models/input-form';
import { DataTable } from '../../../../core/models/data-table';
import { LOVService } from '../../../../core/services/uninjectable/lov.service';
import { CoreFactory } from '../../../../core/factory/core.factory';
import { TYPE } from '../../../../core/constant/constant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sdm-hiring-list',
  templateUrl: './sdm-hiring-list.component.html',
  styleUrls: ['./sdm-hiring-list.component.css']
})
export class SdmHiringListComponent implements OnInit {

  public selectedValue: string;

  // public foods: Food[] = [
  //   {value: 'steak-0', viewValue: 'Steak'},
  //   {value: 'pizza-1', viewValue: 'Pizza'},
  //   {value: 'tacos-2', viewValue: 'Tacos'}
  // ];

  public time: Date = new Date();

  @ViewChild('viewAsDateTemplate')
  public viewAsDateTemplate: any;
  @ViewChild('tableActionTemplate')
  public tableActionTemplate: any;

  public action: ActionService;
  public inputForm: InputForm;
  public dataTable: DataTable;

  public lovClients: LOVService;

  constructor(private _factory: CoreFactory, private router: Router) { }

  // tslint:disable-next-line:no-empty
  public ngOnInit() {
    this.inputForm = this._factory.inputForm({
      formControls: {
        client_id: '',
        client_name: '',
        client_mobileClient: '',
        client_picClient: '',
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
    this.dataTable = this._factory.dataTable({
      serverSide : true,
      pagingParams : {
        // filter : {
        //   operator : CONJUNCTION_OPERATOR.AND,
        //   component : [
        //     {
        //       field : 'kddati1',
        //       operator : COMPARISON_OPERATOR.EQ,
        //       value : Session.getUserData('kddati1')
        //     },
        //     {
        //       field : 'kddati2',
        //       operator : COMPARISON_OPERATOR.EQ,
        //       value : Session.getUserData('kddati2')
        //     }
        //   ]
        // },
        limit : 10
      },
      searchCriteria : [
        { viewValue: 'Client Name', viewKey: 'client_name', type: TYPE.STRING}
        // { viewValue: 'Client id', viewKey: 'client_id', type: TYPE.NUMBER}
      ],
      tableColumns : [
        { prop: 'sdmhiring_id', name: 'No', width: 40, sortable: false },
        { prop: 'client_name', name: 'Client Name', width: 100, sortable: false },
        { prop: 'client_mobileclient', name: 'Contact', width: 100, sortable: false },
        { prop: 'hirestat_name', name: 'Status', width: 100, sortable: false },
        { prop: 'id', name: 'Action', width: 100,
          cellTemplate: this.tableActionTemplate, sortable: false }
      ]
    });
    this.action = this._factory.actions({
      api: 'project/mengelolaHiring',
      inputForm: this.inputForm,
      dataTable: this.dataTable
    });

    this.lovClients = this._factory.lov({
      api: 'lov/clients',
      initializeData: true
    });
    setInterval(() => {
    this.time = new Date();
    }, 1);
  }

  public navigateEditMenu(id) {
    this.router.navigate(['pages/pja/PJA008', { id }]);
    console.log('Selected IDX : ' + id);
  }

}
