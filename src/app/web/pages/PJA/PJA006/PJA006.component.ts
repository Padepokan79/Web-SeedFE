import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { InputForm } from '../../../../core/models/input-form';
import { ActionService } from '../../../../core/services/uninjectable/action.service';
import { CoreFactory } from '../../../../core/factory/core.factory';
import { COMPARISON_OPERATOR } from '../../../../core/constant/constant';
import { ActivatedRoute, ParamMap, Router } from '../../../../../../node_modules/@angular/router';
import { DefaultNotificationService } from '../../../../core/services/default-notification.service';

@Component({
  selector: 'app-PJA006',
  templateUrl: './PJA006.component.html',
  styleUrls: ['./PJA006.component.scss']
})
export class PJA006Component implements OnInit {
public action: ActionService;
public inputForm: InputForm;
public time: Date = new Date();

@ViewChild('viewAsDateTemplate')
public viewAsDateTemplate: any;
@ViewChild('tableActionTemplate')
public tableActionTemplate: any;
private selectedId: string;

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
    setInterval(() => {
      this.time = new Date();
    }, 1);
    this.inputForm = this._factory.inputForm({
      formControls: {
       client_id: '',
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
       },
    });

    this.action = this._factory.actions({
      api: 'project/MengelolaClient/',
      inputForm: this.inputForm,
    });

    const readAllApi = this._factory.api({
      api : 'project/MengelolaClient/readAll',
      pagingParams : {
        filter : {
          field : 'client_id',
          operator : COMPARISON_OPERATOR.EQ,
          value : this.selectedId
        }
      }
    });

    this._factory.http().get(readAllApi).subscribe((res: any) => {
      this.action.patchFormData(res.data.items[0]);
    });
  }

  public onUpdate() {
    const updateAPI = this._factory.api({
      api : 'project/MengelolaClient/update',
      // params : {
      //   client_id : this.selectedId
      // }
    });
    this._factory.http().put(updateAPI + '?client_id=' + this.selectedId, this.action.getFormData()).subscribe((response: any) => {
    this._notif.success({
      message: 'Update Data Berhasil'
      });
    setTimeout(() => this.router.navigate(['pages/pja/PJA004']), 1000);
     });
  }
}
