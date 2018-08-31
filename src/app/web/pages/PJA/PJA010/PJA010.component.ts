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
import { Comparison } from '../../../../core/enums/comparison-operator.enum';

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

  public action: ActionService;
  public inputForm: InputForm;
  public dataTable: DataTable;
  public lovClient: LOVService;
  public clientPic: string;
  public clientMobile: string;
  public btnDisabled: boolean = true;
  private selected: number;
  // public dataRow: any;
  // public lovUser: LOVService;

  constructor(
    private _factory: CoreFactory,
    private route: ActivatedRoute,
    private router: Router
  ) { }

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

    // First Data Table Initialization
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
        { prop: 'norut', name: 'No', width: 15, sortable: false },
        { prop: 'sdm_name', name: 'Name', width: 15, sortable: false },
        { prop: 'sdm_phone', name: 'Contact', width: 15, sortable: false },
        { prop: 'sdmassign_startdate', name: 'Start', width: 15, sortable: false },
        { prop: 'sdmassign_enddate', name: 'End', width: 15, sortable: false },
        { prop: 'sdmassign_loc', name: 'Location', width: 20, sortable: false },
        { prop: 'sdmassign_picclient', name: 'PIC Handler', width: 50, sortable: false },
        { prop: 'sdmassign_picclientphone', name: 'PIC Contact', width: 50, sortable: false },
        { prop: 'method_name', name: 'Method', width: 15, sortable: false },
        { prop: 'sdmassign_notification', name: 'Notifikasi', width: 15,
          cellTemplate: this.notif, sortable: false },
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

  public onSearch() {
    const filterCriteria = [];
    const ClientId = this.action.getFormControlValue('client_id');

    this.action.setPaginationFilter(
      Conjunction.OR(
        Comparison.EQ('client_id', ClientId),
      )
    );

    this.action.refreshTable();
  }

  public navigateEditMenu(id) {
    this.router.navigate(['/pages/pja/PJA011', { id }]);
  }

  public navigatePushId(idClient) {
    this.router.navigate(['pages/pja/PJA012', { idClient }]);
  }

  public setTrueClick() {
    this.btnDisabled = false;
 }

}
