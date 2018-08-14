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

@Component({
  selector: 'app-PJA009',
  templateUrl: './PJA009.component.html',
  styleUrls: ['./PJA009.component.css']
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
  private selectedId: number;

  constructor(
    public _notif: DefaultNotificationService,
    private _factory: CoreFactory,
    private route: ActivatedRoute,
    private router: Router
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

    });
  }

  public onUpdate() {    const updateAPI = this._factory.api({
    api: 'project/mengelolaHiring/update',
    // params: {
    // client_id: this.selectedId }
  });
  this._factory.http().put(updateAPI + '?sdmhiring_id=' + this.selectedId, this.action.getFormData()).subscribe((response: any) => {
    this._notif.success({
      message: 'Update Data Berhasil'
    });
    setTimeout(() => this.router.navigate(['pages/pja/PJA007']), 1000);
   });
 }

}
