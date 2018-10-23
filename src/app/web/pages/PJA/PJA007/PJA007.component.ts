import { HttpClient } from '@angular/common/http';
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
import { FormGroup, FormControl } from '../../../../../../node_modules/@angular/forms';
import { ListOfValue } from '../../../../core/models/list-of-value';
import { startWith, map } from '../../../../../../node_modules/rxjs/operators';

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
  public filteredSdm: any;
  public sdmCtrl: FormControl;

  public lovSdm: LOVService;
  public SdmName: any;
  public KeyId: any;
  public dataFilter: any;
  public sdmId: any;
  public Idsdm: string;
  public searchBy: string;
  public searchCheck: boolean;

  constructor(private _factory: CoreFactory,
              private router: Router,
              public _notif: DefaultNotificationService,
              private _dialog: MatDialog,
              private http: HttpClient) {
                this.sdmCtrl = new FormControl();
                this.filteredSdm = this.sdmCtrl.valueChanges
    .pipe(
      startWith(''),
      map((value) => this.filterSdm(value))
    );
              }
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
        search_by: '',
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
        limit : 10,
        filter : Comparison.EQ('client_id', '1')
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

    this.lovSdm = this._factory.lov({
      api: 'lov/Sdm',
      pagingParams: {
        orderby: 'sdm_name ASC',
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
      this.selected = 1;
      this.clientPic = res.data.items[0].client_picclient;
      this.clientMobile = res.data.items[0].client_mobileclient;
    });
    // this.action.setPaginationFilter(
    //   Comparison.EQ('client_id', '1')
    // );
    // this.action.refreshTable();
  }
  public filterSdm(val: string) {
    return val ? this.lovSdm.data.filter((s) => s.values.sdm_sdm_name.toLowerCase().indexOf(val.toLocaleLowerCase()) === 0) : [];
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
    if (this.selected == 1) {
      this.btnDisabled = true;
    } else {
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

  public navigateEditMenu(id, sdmhiringId, cId) {
    this.router.navigate(['pages/pja/PJA009', { id, sdmhiringId, cId }]);
  }

  public navigatePushId(idClient) {
    this.router.navigate(['pages/pja/PJA008', { idClient }]);
  }

  public onReset() {
    this.action.patchFormData({client_id : 1});
    this.onSearch();
  }
  public onSearch() {
    this.dataTable.rows = null;
    const ClientId = this.action.getFormControlValue('client_id');
    this.selected = ClientId;
    this.http.get(this._factory.api({api: 'project/mengelolaHiring'}) + '/readAll?$filter=client_id=' + ClientId).subscribe((res: any) => {
      console.log(res.data.items);
      this.dataTable.rows = res.data.items;
    });
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
    if (this.selected == 1) {
      this.btnDisabled = true;
    } else {
      this.btnDisabled = false;
    }
    this.action.patchFormData({client_id : ClientId});
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
    }, (error: any) => {
      this._notif.error({
        message: 'Hiring SDM tidak bisa dihapus, masih terdata pada SDM Assignment'});
      });
    this.ambilData();
    this.onSearch();
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
          if (data) {
            this.onEksekusi(id);
          }
          this.action.refreshTable();
        });
  }

  public setSdmValue(inputForm: FormGroup, dataSdm: ListOfValue) {
    console.log(dataSdm);
    this.sdmId = dataSdm;
    this.Idsdm = this.sdmId;
    if(this.dataFilter == 'sdm_name'){
      if (dataSdm) {
        this.lovSdm = this._factory.lov({
          api: 'lov/statushiring',
          params: {
            sdm_id: dataSdm.key
          },
          initializeData: true
        });
    } else {
      if (dataSdm) {
        this.lovSdm = this._factory.lov({
          api: 'lov/statushiring',
          params: {
            sdm_id: dataSdm.key
          },
          initializeData: true
        });
    }
      this.SdmName = dataSdm.key;
      this.action.patchFormData({sdm_id: dataSdm.key, sdm_name: dataSdm.values.sdm_sdm_name});
      console.log(this.SdmName);
    }
  }
  }
  public onKeySdmName(event: any) {
    this.KeyId = event.target.value;
    if (this.KeyId === '') {
      this.SdmName = null;
      console.log('Nama: ', this.SdmName);
    }
  }

  public onSearchAnd() {
    console.log(this.selected);
    console.log(this.dataFilter);
    console.log(this.SdmName);
    console.log(this.sdmId);
    const ClientId = this.action.getFormControlValue('client_id');
   //  const sdmId = this.action.getFormControlValue('sdm_name');
    const IdSdm = this.Idsdm;
    console.log(ClientId);
    console.log();
    if(this.dataFilter == 'sdm_name'){
     this.action.setPaginationFilter(
       Conjunction.AND(
         Comparison.EQ('client_id', ClientId),
       Comparison.EQ('sdm_id', this.SdmName)
      )
      );
   }

    this.action.refreshTable();
  }
  public pencarian() {
    console.log(this.dataFilter);
    console.log('hello');
  }

}
