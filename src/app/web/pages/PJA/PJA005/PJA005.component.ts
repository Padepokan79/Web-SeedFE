import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionService } from '../../../../core/services/uninjectable/action.service';
import { InputForm } from '../../../../core/models/input-form';
import { CoreFactory } from '../../../../core/factory/core.factory';
import { DataTable } from '../../../../core/models/data-table';
import { TYPE } from '../../../../core/constant/constant';
import { LOVService } from '../../../../core/services/uninjectable/lov.service';
import { Router } from '../../../../../../node_modules/@angular/router';
import { DefaultNotificationService } from '../../../../core/services/default-notification.service';

@Component({
  selector: 'app-PJA005',
  templateUrl: './PJA005.component.html',
  styleUrls: ['./PJA005.component.scss']
})
export class PJA005Component implements OnInit {
  // @ViewChild('viewAsDateTemplate')
  // public viewAsDateTemplate: any;
  // @ViewChild('tableActionTemplate')
  // public tableActionTemplate: any;
  public action: ActionService;
  public inputForm: InputForm;
  public dataTable: DataTable;
  public time: Date = new Date();
  public clientName: string = null;
  public clientPicclient: string = null;
  public clientMobileclient: number = null;

  constructor(
    public _notif: DefaultNotificationService,
    private _factory: CoreFactory,
    private router: Router
    ) {}

  public ngOnInit() {
   setInterval(() => {
     this.time = new Date();
   }, 1);

   this.inputForm = this._factory.inputForm({
     formControls: {
       client_name: '',
       client_picclient: '',
       client_mobileclient: '',
       client_address: '',
     },
     validationMessages: {
      client_name: {
        required: 'Silahkan masukan Nama client'
      },
      client_picclient: {
        required: 'Silahkan masukan PIC Handler',
        patern: 'Hanya boleh angka'
      },
      client_mobileclient: {
        required: 'Silahkan masukan Kontak Client',
        maxlength: 'Maksimal 13 karakter'
      },
      client_address: {
        required: 'Silahkan masukan Alamat Client'
      },
      user_id: {
        required: 'Silahkan masukan user ID'
      }
     }
   });
   this.dataTable = this._factory.dataTable({
    serverSide : true,
    pagingParams : {
      // filter: {
      //   operator: CONJUNCTION_OPERATOR.AND,
      //   component: [
      //     {
      //       field: 'skilltype_name',
      //       operator: COMPARISON_OPERATOR.EQ,
      //       value: Session.getUserData('skill_name')
      //     }
      //   ]
      // },
      limit : 5
    },
    searchCriteria : [
      { viewValue: 'Client Name', viewKey: 'client_name', type: TYPE.NUMBER}
    ],
    tableColumns : [
      { prop: 'client_id', name: 'No', width: 100, sortable: false},
      { prop: 'client_name', name: 'Client Name', width: 200, sortable: false}
    ]
  });
   this.action = this._factory.actions({
    api: 'project/MengelolaClient/Create',
    inputForm: this.inputForm,
    // dataTable: this.dataTable
  });

  }
  public onSave() {
    const createAPI = this._factory.api({
      api : 'project/MengelolaClient/create',
      // params : {
      //   client_id : this.selectedId
      // }
    });
    if (this.clientName === null || this.clientName === '') {
      this._notif.error({
        message: 'Client Name Harus Diisi'
      });
      } else if (this.clientPicclient === null || this.clientPicclient === '') {
        this._notif.error({
          message: 'PIC Handler Harus Diisi'
        });
      } else if (this.clientMobileclient === undefined || this.clientMobileclient === null) {
        this._notif.error({
          message: 'Contact Person Harus Diisi'
        });
      } else if (this.clientMobileclient > 9999999999999) {
        this._notif.error({
          message: 'Contact Person Max 13 Digit'
        });
      } else {
        this._factory.http().post(createAPI, this.action.getFormData()).subscribe((response: any) => {
          this._notif.success({
            message: 'Data Berhasil Disimpan'
            });
          setTimeout(() => this.router.navigate(['pages/pja/PJA004']), 1000);
           });
      }
   }
  }
