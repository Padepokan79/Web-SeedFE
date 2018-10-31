import { Component, OnInit, ViewChild } from '@angular/core';
import { COMPARISON_OPERATOR } from '../../../../core/constant/constant';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreFactory } from '../../../../core/factory/core.factory';
import { Observable } from 'rxjs/Observable';
import { LOVService } from '../../../../core/services/uninjectable/lov.service';
import { DataTable } from '../../../../core/models/data-table';
import { InputForm } from '../../../../core/models/input-form';
import { ActionService } from '../../../../core/services/uninjectable/action.service';
import { DefaultNotificationService } from '../../../../core/services/default-notification.service';
import { HttpParams, HttpClient } from '../../../../../../node_modules/@angular/common/http';
import { Comparison } from 'app/core/enums/comparison-operator.enum';

@Component({
  selector: 'app-PJA009',
  templateUrl: './PJA009.component.html',
  styleUrls: ['./PJA009.component.scss']
})
export class PJA009Component implements OnInit {

  @ViewChild('viewAsDateTemplate')
  public viewAsDateTemplate: any;
  @ViewChild('tableActionTemplate')
  public tableActionTemplate: any;

  public action: ActionService;
  public inputForm: InputForm;
  public dataTable: DataTable;
  public lovHiring: LOVService;
  public clients$: Observable<any>;
  public clientName: string;
  public sdmName: string;
  public apiRoot: string = 'project/InsertAssignment';
  public clientIds: string;
  public sdmId: string;
  public methodId: number;
  public hirestatId: number;
  public sdmhiringId: number;
  public disabled: boolean = false;
  public currentDate: Date = new Date();
  public click: number = 0;
  public cekStat: boolean = true;
  private selectedId: number;
  private selectedHiringId: number;
  private selectedClientId: number;


  constructor(
    public _notif: DefaultNotificationService,
    private _factory: CoreFactory,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
    this.route.params.subscribe((param) => {
      this.selectedId = param.id;
      this.selectedHiringId = param.sdmhiringId;
      this.selectedClientId = param.cId;

    });
  }

  public ngOnInit() {
    this.inputForm = this._factory.inputForm({
      formControls: {
        sdmhiring_id: '',
        hirestat_name: '',
        hirestat_id: '',
        sdm_id: '',
        sdm_name: '',
        client_id: '',
        client_name: '',
        method_id: '',
        method_name: '',

        sdmpsycological_desc: '',
        psycological_date: '',
        psyco_id: '',
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

    this.action = this._factory.actions({
        api: 'project/mengelolaHiring',
        inputForm: this.inputForm,
        dataTable: this.dataTable
    });

    // this.lovHiring = this._factory.lov({
    //     api: 'lov/StatusHiring',
    //     pagingParams : {
    //       filter : {
    //         field : 'hirestat_id',
    //         operator : COMPARISON_OPERATOR.LE,
    //         value : 9
    //       }
    //     },
    //     initializeData: true
    // });

    const readAllApi = this._factory.api({
      api : 'project/mengelolaHiring/readAll',
      pagingParams : {
        filter : {
          field : 'sdm_id',
          operator : COMPARISON_OPERATOR.EQ,
          value : this.selectedId
        }
      }
    });

    this._factory.http().get(readAllApi).subscribe((res: any) => {
      console.log(res.data.items.length);

      for ( var index = 0; index < res.data.items.length; index++) {
        if(res.data.items[index].hirestat_id == 4 && res.data.items[index].client_id != 1){
          this.disabled = true;
        } 
        if(this.selectedHiringId == res.data.items[index].sdmhiring_id && res.data.items[index].hirestat_id == 4){
          this.disabled = false;
        }
        console.log(this.selectedHiringId);
        if (this.selectedHiringId == res.data.items[index].sdmhiring_id){
          this.action.patchFormData(res.data.items[index]);
          this.clientIds = res.data.items[index].client_id;
          this.clientName = res.data.items[index].client_name;
          this.sdmName = res.data.items[index].sdm_name;
          this.sdmId = res.data.items[index].sdm_id;
          this.methodId = res.data.items[index].method_id;
          this.sdmhiringId = res.data.items[index].sdmhiring_id;
          this.hirestatId = res.data.items[index].hirestat_id;  

        }

      }

    });
    this.lovStatus();
  }

  public onUpdate() {
    const updateAPI = this._factory.api({
    api: 'project/mengelolaHiring/updateSdm',
  });
    console.log(this.hirestatId);
    this._factory.http().put(updateAPI + '?sdmhiring_id=' + this.selectedHiringId + '&hirestat_id=' + this.hirestatId + '&client_id=' + this.clientIds, this.action.getFormData()).subscribe((response: any) => {
    this._notif.success({
      message: 'Update Data Berhasil'
    });
    setTimeout(() => this.router.navigate(['pages/pja/PJA007']), 1000);
   });

    this.hirestatId = this.action.getFormData().hirestat_id;
    console.log('hire stat id' + this.hirestatId);
    if (this.hirestatId === 4) {
    const insertAssign = [];
    insertAssign.push({
      client_id: this.clientIds,
      sdm_id: this.sdmId,
      method_id: 1,
      sdmhiring_id: this.sdmhiringId,
    });
    const url = this._factory.api({
      api: `${this.apiRoot}/multiCreate`
    });
    const httpOption = {
      params: new HttpParams()
    };
    this.http.post(url, {
      listassignment: insertAssign
    }, httpOption)
    .subscribe(() => {
      this._notif.success({
        message: 'You have successfully Assigned'
      });
    });
    console.log(insertAssign);
    const urlpsycho = this._factory.api({
      api: `sdm/sdmPsycological/create`
    });

    const insertPsychologi = [];
    insertPsychologi.push({
      sdmhiring_id: this.sdmhiringId,
      sdm_id: this.sdmId,
    });
    if ( this.action.getFormControlValue('client_id') != 1) {
      this.http.post(urlpsycho, { listpsychology : insertPsychologi }, httpOption)
    .subscribe(() => {
      this._notif.success({
        message: 'You have successfully Insert'
      });
    });
    }
   }

 }
  public lovStatus() {
    this.click = this.click + 1;
    console.log("ini client id : " + this.selectedClientId);
    if (this.selectedClientId != 1){
      this.lovHiring = this._factory.lov({
        api: 'lov/StatusHiring',
        pagingParams : {
          filter : {
            field : 'hirestat_id',
            operator : COMPARISON_OPERATOR.LE,
            value : 9
          }
        },
        initializeData: true
    });
    } else if (this.click >= 2 ) {
      this.lovHiring = this._factory.lov({
        api: 'lov/StatusHiring',
        pagingParams : {
          filter : {
            field : 'hirestat_id',
            operator : COMPARISON_OPERATOR.LE,
            value : 8
          }
        },
        initializeData: true
    });
    } else {
      this.lovHiring = this._factory.lov({
        api: 'lov/StatusHiring',
        // pagingParams : {
        //   filter : {
        //     field : 'hirestat_id',
        //     operator : COMPARISON_OPERATOR.LE,
        //     value : 8
        //   }
        // },
        initializeData: true
    });
    }
    console.log('hello' + this.click);
  }

  public cekData() {
    if (this.cekStat == true) {
      this.cekStat = false;
    } else {
      this.cekStat = true;
    }
    console.log(this.cekStat);
  }
}
