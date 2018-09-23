import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionService } from '../../../../core/services/uninjectable/action.service';
import { InputForm } from '../../../../core/models/input-form';
import { DataTable } from '../../../../core/models/data-table';
import { LOVService } from '../../../../core/services/uninjectable/lov.service';
import { CoreFactory } from '../../../../core/factory/core.factory';
import { TYPE, COMPARISON_OPERATOR } from '../../../../core/constant/constant';
import { Router } from '@angular/router';
import { Comparison } from '../../../../core/enums/comparison-operator.enum';
import { Conjunction } from '../../../../core/enums/conjunction-operator.enum';

@Component({
  selector: 'app-PJA007',
  templateUrl: './PJA007.component.html',
  styleUrls: ['./PJA007.component.scss']
})
export class PJA007Component implements OnInit {

  public selectedValue: string;
  public time: Date = new Date();

  @ViewChild('viewAsDateTemplate')
  public viewAsDateTemplate: any;
  @ViewChild('tableActionTemplate')
  public tableActionTemplate: any;

  public action: ActionService;
  public inputForm: InputForm;
  public dataTable: DataTable;
  public lovClients: LOVService;
  public clientPic: string;
  public clientMobile: string;
  public btnDisabled: boolean = true;
  public selected: number;

  constructor(private _factory: CoreFactory, private router: Router) { }
  public refreshTabel() {
    this.action.refreshTable();
  }

  // tslint:disable-next-line:no-empty
  public ngOnInit() {
    this.inputForm = this._factory.inputForm({
      formControls: {
        sdm_id: '',
        sdm_name: '',
        sdm_phone: '',
        client_id: '',
        client_name: '',
        client_mobileclient: '',
        client_picclient: '',
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
      serverSide : false,
      pagingParams : {
        limit : 10
      },
      searchCriteria : [
        { viewValue: 'Name', viewKey: 'sdm_name', type: TYPE.STRING}
      ],
      tableColumns : [
        { prop: 'norut', name: 'No', width: 20, sortable: false },
        { prop: 'sdm_name', name: 'Name', width: 100, sortable: false },
        { prop: 'sdm_phone', name: 'Contact', width: 100, sortable: false },
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
      pagingParams: {
        orderby: 'client_name ASC',
      },
      initializeData: true
    });
    setInterval(() => {
    this.time = new Date();
    }, 1);
  }

  public ambilData() {
    const readAllApi = this._factory.api({
      api : 'project/MengelolaClient/readAll',
      pagingParams : {
        filter : {
          field : 'client_id',
          operator : COMPARISON_OPERATOR.EQ,
          value : this.selected
        }
      }
    });
    this._factory.http().get(readAllApi).subscribe((res: any) => {
      // this.action.patchFormData(res.data.items[this.selected]);
      this.clientPic = res.data.items[0].client_picclient;
      this.clientMobile = res.data.items[0].client_mobileclient;
    });

  }

  public clearData() {
    this.clientPic = '';
    this.clientMobile = '';
    this.btnDisabled = true;
    this.action.resetFilter() ;
    this.action.refreshTable();
  }

  public navigateEditMenu(id) {
    this.router.navigate(['pages/pja/PJA009', { id }]);
  }

  public navigatePushId(idClient) {
    this.router.navigate(['pages/pja/PJA008', { idClient }]);
  }

  public onSearch() {
    const filterCriteria = [];
    const ClientId = this.action.getFormControlValue('client_id');

    this.action.setPaginationFilter(
        Comparison.EQ('client_id', ClientId)
    );

    this.action.refreshTable();
  }

  public setTrueClick() {
     this.btnDisabled = false;
  }

}
