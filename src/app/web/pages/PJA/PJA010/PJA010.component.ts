import { Comparison } from 'app/core/enums/comparison-operator.enum';
import { TYPE, CONJUNCTION_OPERATOR, COMPARISON_OPERATOR } from '../../../../core/constant/constant';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActionService } from '../../../../core/services/uninjectable/action.service';
import { InputForm } from '../../../../core/models/input-form';
import { DataTable } from '../../../../core/models/data-table';
import { CoreFactory } from '../../../../core/factory/core.factory';
import { LOVService } from '../../../../core/services/uninjectable/lov.service';
import { Session } from '../../../../core/utils/session';
import { Router, ActivatedRoute } from '@angular/router';
import { Conjunction } from '../../../../core/enums/conjunction-operator.enum';
import { ConfirmDialogsComponent } from '../../../../core/components/confirm-dialogs/confirm-dialogs.component';
import { DefaultNotificationService } from '../../../../core/services/default-notification.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-PJA010',
  templateUrl: './PJA010.component.html',
  styleUrls: ['./PJA010.component.scss']
})

export class PJA010Component implements OnInit {

  @ViewChild('viewAsDateTemplate')
  public viewAsDateTemplate: any;
  @ViewChild('tableActionTemplate')
  public tableActionTemplate: any;
  @ViewChild('notif')
  public notif: any;
  public notifications: any;

  public time: Date = new Date();
  public action: ActionService;
  public inputForm: InputForm;
  public dataTable: DataTable;
  public lovClient: LOVService;
  public clientPic: string;
  public clientMobile: string;
  public btnDisabled: boolean = true;
  public onInitID: string;
  private selected: number;

  // public dataRow: any;
  // public lovUser: LOVService;

  constructor(
    public _notif: DefaultNotificationService,
    private _factory: CoreFactory,
    private route: ActivatedRoute,
    private router: Router,
    private _dialog: MatDialog
  ) { 
    this.route.params.subscribe((param) => {
      if (param.cId == null) {
        this.onInitID = '';
      } else if (param.cId == 0) {
        this.onInitID = '';
      } else {
        this.onInitID = param.cId;
        this.selected = param.cId;
      }
    });
  }
  public ngOnInit() {

    this.inputForm = this._factory.inputForm({
      formControls: {
        sdmassign_id: '',
        sdmassign_loc: '',
        sdmassign_picclient: '',
        sdm_id: '',
        sdm_name: '',
        sdm_phone: '',
        client_id: '',
        client_name: '',
        client_mobileClient: '',
        method_id: '',
        method_name: '',
        sdmassign_notification: '',
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

    // First Data Table Initialization\
    if (this.onInitID == '') {
      this.dataTable = this._factory.dataTable({
        serverSide : false,
        pagingParams : {
          limit : 10
        },
        searchCriteria : [
          { viewValue: 'Name', viewKey: 'sdm_name', type: TYPE.STRING },
          { viewValue: 'PIC Handler', viewKey: 'sdmassign_picclient', type: TYPE.STRING }
        ],
        tableColumns : [
          { prop: 'norut', name: 'No', flexGrow: 1, sortable: false },
          { prop: 'sdm_name', name: 'Name', flexGrow: 3, sortable: false },
          { prop: 'sdm_phone', name: 'Contact', flexGrow: 2, sortable: false },
          { prop: 'sdmassign_startdate', name: 'Start', flexGrow: 2, sortable: false },
          { prop: 'sdmassign_enddate', name: 'End', flexGrow: 2, sortable: false },
          { prop: 'sdmassign_loc', name: 'Location', flexGrow: 2, sortable: false },
          { prop: 'sdmassign_picclient', name: 'PIC Handler', flexGrow: 2, sortable: false },
          { prop: 'sdmassign_picclientphone', name: 'PIC Contact', flexGrow: 3, sortable: false },
          { prop: 'method_name', name: 'Method', flexGrow: 2, sortable: false },
          { prop: 'sdmassign_notification', name: 'Notification Assignment', flexGrow: 3,
            cellTemplate: this.notif, sortable: false },
          { prop: 'sdmassign_id', name: 'Action', flexGrow: 2,
            cellTemplate: this.tableActionTemplate, sortable: false }
        ]
      });
    } else {
      this.dataTable = this._factory.dataTable({
        serverSide : false,
        pagingParams : {
          limit : 10,
          filter : Comparison.EQ('client_id', this.onInitID)
        },
        searchCriteria : [
          { viewValue: 'Name', viewKey: 'sdm_name', type: TYPE.STRING },
          { viewValue: 'PIC Handler', viewKey: 'sdmassign_picclient', type: TYPE.STRING }
        ],
        tableColumns : [
          { prop: 'norut', name: 'No', flexGrow: 1, sortable: false },
          { prop: 'sdm_name', name: 'Name', flexGrow: 3, sortable: false },
          { prop: 'sdm_phone', name: 'Contact', flexGrow: 2, sortable: false },
          { prop: 'sdmassign_startdate', name: 'Start', flexGrow: 2, sortable: false },
          { prop: 'sdmassign_enddate', name: 'End', flexGrow: 2, sortable: false },
          { prop: 'sdmassign_loc', name: 'Location', flexGrow: 2, sortable: false },
          { prop: 'sdmassign_picclient', name: 'PIC Handler', flexGrow: 2, sortable: false },
          { prop: 'sdmassign_picclientphone', name: 'PIC Contact', flexGrow: 3, sortable: false },
          { prop: 'method_name', name: 'Method', flexGrow: 2, sortable: false },
          { prop: 'sdmassign_notification', name: 'Notification Assignment', flexGrow: 3,
            cellTemplate: this.notif, sortable: false },
          { prop: 'sdmassign_id', name: 'Action', flexGrow: 2,
            cellTemplate: this.tableActionTemplate, sortable: false }
        ]
      });
    }
   

    this.action = this._factory.actions({
        api: 'project/SdmAssignment',
        inputForm: this.inputForm,
        dataTable: this.dataTable
    });

    this.lovClient = this._factory.lov({
        api: 'lov/Clients',
        pagingParams: {
          orderby: 'client_name ASC',
        },
        initializeData: true
    });
    this.action.patchFormData({ client_id : Number(this.onInitID)});
    this.selected = Number(this.onInitID);
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

  public refreshTabel() {
    this.action.refreshTable();
  }

  public clearData() {
    this.clientPic = '';
    this.clientMobile = '';
    this.btnDisabled = true;

    this.action.resetFilter() ;
    this.action.refreshTable();
  }

  public onSearch() {
    this.ambilData();
    this.dataTable = null ;
    const ClientId = this.action.getFormControlValue('client_id');

    // this.action.setPaginationFilter(
    //   // Conjunction.OR(
    //     Comparison.EQ('client_id', ClientId),
    //   // )
    // );
    this.dataTable = this._factory.dataTable({
      serverSide : false,
      pagingParams : {
        limit : 10,
        filter : Comparison.EQ('client_id', ClientId)
      },
      searchCriteria : [
        { viewValue: 'Name', viewKey: 'sdm_name', type: TYPE.STRING },
        { viewValue: 'PIC Handler', viewKey: 'sdmassign_picclient', type: TYPE.STRING }
      ],
      tableColumns : [
        { prop: 'norut', name: 'No', flexGrow: 1, sortable: false },
        { prop: 'sdm_name', name: 'Name', flexGrow: 3, sortable: false },
        { prop: 'sdm_phone', name: 'Contact', flexGrow: 2, sortable: false },
        { prop: 'sdmassign_startdate', name: 'Start', flexGrow: 2, sortable: false },
        { prop: 'sdmassign_enddate', name: 'End', flexGrow: 2, sortable: false },
        { prop: 'sdmassign_loc', name: 'Location', flexGrow: 2, sortable: false },
        { prop: 'sdmassign_picclient', name: 'PIC Handler', flexGrow: 2, sortable: false },
        { prop: 'sdmassign_picclientphone', name: 'PIC Contact', flexGrow: 3, sortable: false },
        { prop: 'method_name', name: 'Method', flexGrow: 2, sortable: false },
        { prop: 'sdmassign_notification', name: 'Notification Assignment', flexGrow: 3,
          cellTemplate: this.notif, sortable: false },
        { prop: 'sdmassign_id', name: 'Action', flexGrow: 2,
          cellTemplate: this.tableActionTemplate, sortable: false }
      ]
    });
    this.action = this._factory.actions({
      api: 'project/SdmAssignment',
      inputForm: this.inputForm,
      dataTable: this.dataTable
  });
    this.action.refreshTable();
    this.action.patchFormData({client_id : ClientId});
  }

  public navigateEditMenu(id, cId) {
    this.router.navigate(['/pages/pja/PJA011', { id, cId }]);
  }

  public navigatePushId(idClient) {
    this.router.navigate(['pages/pja/PJA012', { idClient }]);
  }

  public setTrueClick() {
    this.btnDisabled = false;
 }

 public onEksekusi(id) {
  const deleteAPI = this._factory.api({
    api : 'project/SdmAssignment/delete'
  });
  this._factory.http().delete(deleteAPI + '?sdmassign_id=' + id).subscribe((response: any) => {
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
        if (data) {
          this.onEksekusi(id);
        }
        this.action.refreshTable();
      });
}

public onReset() {
  this.onInitID = '';
  this.ngOnInit();
}
}
