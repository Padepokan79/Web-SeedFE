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
import { DefaultNotificationService } from '../../../../core/services/default-notification.service';
import { MatDialog } from '@angular/material';
import { ConfirmDialogsComponent } from '../../../../core/components/confirm-dialogs/confirm-dialogs.component';

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
  public selected: number = 1;

  constructor(private _factory: CoreFactory,
              private router: Router,
              public _notif: DefaultNotificationService,
              private _dialog: MatDialog) {}
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
        { viewValue: 'Name', viewKey: 'sdm_name', type: TYPE.STRING},
        { viewValue: 'Status', viewKey: 'hirestat_name', type: TYPE.STRING}
      ],
      tableColumns : [
        { prop: 'norut', name: 'No', flexGrow: 1, sortable: false },
        { prop: 'sdm_name', name: 'Name', flexGrow: 3, sortable: false },
        { prop: 'sdm_phone', name: 'Contact', flexGrow: 3, sortable: false },
        { prop: 'hirestat_name', name: 'Status', flexGrow: 3, sortable: true },
        { prop: 'id', name: 'Action', flexGrow: 2,
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

    this._factory.http().get(
      this._factory.api({
        api : 'project/MengelolaClient/readAll',
        pagingParams : {
          filter: Comparison.EQ('client_id', '1')
        }
      })
    ).subscribe((res: any) => {
      // this.action.patchFormData(res.data.items[this.selected]);
      this.clientPic = res.data.items[0].client_picclient;
      this.clientMobile = res.data.items[0].client_mobileclient;
    });
    this.action.setPaginationFilter(
      Comparison.EQ('client_id', '1')
    );
    this.action.refreshTable();

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
    if(this.selected == 1){
      this.btnDisabled = true;
    }else{
      this.btnDisabled = false;
    }
  }

  public clearData() {
    this.clientPic = '';
    this.clientMobile = '';
    this.btnDisabled = true;
    this.action.resetFilter() ;
    this.action.refreshTable();
  }

  public navigateEditMenu(id, sdmhiringId) {
    this.router.navigate(['pages/pja/PJA009', { id, sdmhiringId }]);
  }

  public navigatePushId(idClient) {
    this.router.navigate(['pages/pja/PJA008', { idClient }]);
  }

  public onSearch() {
    const ClientId = this.action.getFormControlValue('client_id');

    this.action.setPaginationFilter(
        Comparison.EQ('client_id', ClientId)
    );

    this.action.refreshTable();
  }

  public setTrueClick() {
    //  this.btnDisabled = false;
  }

  public onEksekusi(id) {
    const deleteAPI = this._factory.api({
      api : 'project/mengelolaHiring/delete'
    });
    this._factory.http().delete(deleteAPI + '?sdmhiring_id=' + id).subscribe((response: any) => {
      this._notif.success({
        message : 'Delete berhasil'
      });
    });
    this.action.refreshTable();
  }

  public onDelete(id, deleteMassage: string = 'Are you sure to delete?') {
    this._dialog
        .open(ConfirmDialogsComponent, {
          data : {
            selectedData : id,
            message : deleteMassage
          }
        })
        .afterClosed()
        .subscribe((data: any) => {
          this.onEksekusi(id);
          this.action.refreshTable();
        });
  }

}
