import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionService } from '../../../../core/services/uninjectable/action.service';
import { InputForm } from '../../../../core/models/input-form';
import { CoreFactory } from '../../../../core/factory/core.factory';
import { DataTable } from '../../../../core/models/data-table';
import { TYPE } from '../../../../core/constant/constant';
import { LOVService } from '../../../../core/services/uninjectable/lov.service';

@Component({
  selector: 'app-PJA005',
  templateUrl: './PJA005.component.html',
  styleUrls: ['./PJA005.component.css']
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
  constructor(private _factory: CoreFactory) {}

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
        required: 'Silahkan masukan Kontak Client'
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
}
