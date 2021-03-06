import { HttpClient } from '@angular/common/http';
import { TYPE, COMPARISON_OPERATOR, CONJUNCTION_OPERATOR } from './../../../../core/constant/constant';
import { CoreFactory } from './../../../../core/factory/core.factory';
import { DataTable } from './../../../../core/models/data-table';
import { InputForm } from './../../../../core/models/input-form';
import { ActionService } from './../../../../core/services/uninjectable/action.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LOVService } from '../../../../core/services/uninjectable/lov.service';
import { Router } from '../../../../../../node_modules/@angular/router';
import { FormControl, FormGroup } from '../../../../../../node_modules/@angular/forms';
import { ListOfValue } from '../../../../core/models/list-of-value';
import { Comparison } from '../../../../core/enums/comparison-operator.enum';
import { startWith, map } from '../../../../../../node_modules/rxjs/operators';
import { ConfirmDialogsComponent } from '../../../../core/components/confirm-dialogs/confirm-dialogs.component';
import { DefaultNotificationService } from '../../../../core/services/default-notification.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-SDM008',
  templateUrl: './SDM008.component.html',
  styleUrls: ['./SDM008.component.scss']
})
export class SDM008Component implements OnInit {

  public time: Date = new Date();
  @ViewChild('viewAsDateTemplate')
  public viewAsDateTemplate: any;
  @ViewChild('tableActionTemplate')
  public tableActionTemplate: any;

  public action: ActionService;
  public inputForm: InputForm;
  public dataTable: DataTable;

  public lovSdm: LOVService;
  public lovPsychologicals: LOVService;

  // SDM
  public filteredSdm: any;
  public sdmCtrl: FormControl;

  // Delete
  public KeyId: any;
  public SdmName: any;

  public selected: string;
  public lovClients: LOVService;

  public onKeySdmName(event: any) {
    this.KeyId = event.target.value;
    if (this.KeyId === '') {
      this.SdmName = null;
      console.log('Nama: ', this.SdmName);
    }
  }
  // tslint:disable-next-line:member-ordering
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

  public ngOnInit() {
    setInterval(() => {
      this.time = new Date();
    }, 1);
    this.inputForm = this._factory.inputForm({
      formControls: {
        sdm_id: '',
        sdm_name: '',
        client_id: '',
      },
    });

    // First Data Table Initialization
    this.dataTable = this._factory.dataTable({
      serverSide : false,
      pagingParams : {
        limit : 10
      },
      searchCriteria : [
        { viewValue: 'Sdm Name', viewKey: 'sdm_name', type: TYPE.STRING },
      ],
      tableColumns : [
        { prop: 'norut', name: 'No', flexGrow: 1, sortable: false },
        { prop: 'sdm_name', name: 'Name', flexGrow: 5, sortable: false },
        { prop: 'psyco_name', name: 'Condition', flexGrow: 2, sortable: false },
        { prop: 'sdmpsycological_desc', name: 'Reason', flexGrow: 6, sortable: false },
        { prop: 'psycological_date', name: 'Date', flexGrow: 2,
          cellTemplate: this.viewAsDateTemplate, sortable: false },
        { prop: 'sdmpsycological_id', name: 'Action', flexGrow: 2, cellTemplate: this.tableActionTemplate, sortable: false },
      ]
    });

    this.action = this._factory.actions({
        api: 'sdm/SdmPsycological',
        inputForm: this.inputForm,
        dataTable: this.dataTable
    });

    this.lovSdm = this._factory.lov({
        api: 'lov/Sdm',
        pagingParams: {
          orderby: 'sdm_name ASC',
        },
        initializeData: true
    });

    this.lovClients = this._factory.lov({
      api: 'lov/clients',
      pagingParams: {
        orderby: 'client_name ASC',
        filter: Comparison.NE('client_id', '1')
      },
      initializeData: true
    });

    this.lovPsychologicals = this._factory.lov({
        api: 'lov/Psychologicals',
        initializeData: true
    });
  }

  public onSelectClient() {
    this.dataTable.rows = null;
    const ClientId = this.action.getFormControlValue('client_id');
    this.http.get(this._factory.api({api: 'sdm/SdmPsycological'}) + '/readAll?client_id=' + ClientId).subscribe((res: any) => {
      console.log(res.data.items);
      this.dataTable.rows = res.data.items;
    });
  }

  public navigateEditMenu(id) {
    this.router.navigate(['/pages/sdm/SDM007', { id }]);
  }

  public setSdmValue(inputForm: FormGroup, dataSdm: ListOfValue) {
    if (dataSdm) {
      this.lovSdm = this._factory.lov({
        api: 'lov/sdm',
        params: {
          sdm_id: dataSdm.key
        },
        initializeData: true
      });
      this.SdmName = dataSdm.key;
      this.action.patchFormData({sdm_id: dataSdm.key, sdm_name: dataSdm.values.sdm_sdm_name});
      console.log(this.SdmName);
    }
  }

  public filterSdm(val: string) {
    return val ? this.lovSdm.data.filter((s) => s.values.sdm_sdm_name.toLowerCase().indexOf(val.toLocaleLowerCase()) === 0) : [];
  }

  public onSearch() {
    this.action.setPaginationFilter(
      this.SdmName ? Comparison.EQ('sdm_id', this.SdmName) : Comparison.NE('sdm_id', 'sdm_id'),
    );

    this.action.refreshTable();
  }

  public onEksekusi(id) {
    const deleteAPI = this._factory.api ({
      api : 'sdm/SdmPsycological/delete'
    });
    this._factory.http().delete(deleteAPI + '?sdmpsycological_id=' + id).subscribe((response: any) => {
      this._notif.success({
        message: 'Delete Data Berhasil'
      });
      this.action.refreshTable();
    });
  }

  public onDelete(id, deleteMessage: string = 'Are you sure to delete?') {
    this._dialog
        .open(ConfirmDialogsComponent, {
          data: {
            selecetedData : id,
            message : deleteMessage
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
  public onReset() {
    this.action.refreshTable();
    this.action.patchFormData({ client_id : '' });
  }

}


