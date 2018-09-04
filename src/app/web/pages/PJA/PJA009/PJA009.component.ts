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
  public apiRoot: string = 'project/MultiInsertHiringAssign';
  public clientIds: string;
  public sdmId: string;
  public methodId: number;
  public hirestatId: number;
  private selectedId: number;

  constructor(
    public _notif: DefaultNotificationService,
    private _factory: CoreFactory,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
    this.route.params.subscribe((param) => {
      this.selectedId = param.id;
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

    this.lovHiring = this._factory.lov({
        api: 'lov/StatusHiring',
        initializeData: true
    });

    const readAllApi = this._factory.api({
      api : 'project/mengelolaHiring/readAll',
      pagingParams : {
        filter : {
          field : 'sdmhiring_id',
          operator : COMPARISON_OPERATOR.EQ,
          value : this.selectedId
        }
      }
    });

    this._factory.http().get(readAllApi).subscribe((res: any) => {
      this.action.patchFormData(res.data.items[0]);
      this.clientIds = res.data.items[0].client_id;
      this.clientName = res.data.items[0].client_name;
      this.sdmName = res.data.items[0].sdm_name;
      this.sdmId = res.data.items[0].sdm_id;
      this.methodId = res.data.items[0].method_id;
    });
  }

  public onUpdate() {
    const updateAPI = this._factory.api({
    api: 'project/mengelolaHiring/update',
    // params: {
    // client_id: this.selectedId }
  });
    this.hirestatId = 4;
    this._factory.http().put(updateAPI + '?sdmhiring_id=' + this.selectedId, this.action.getFormData()).subscribe((response: any) => {
    this._notif.success({
      message: 'Update Data Berhasil'
    });
    setTimeout(() => this.router.navigate(['pages/pja/PJA007']), 1000);
   });

    if (this.hirestatId === 4) {
    const insertAssign = [];
    insertAssign.push({
      client_id: this.clientIds,
      sdm_id: this.sdmId,
      method_id: 1,
      sdmhiring_id: 10,
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
   }

 }

}
