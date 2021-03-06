import { Component, OnInit, ViewChild } from '@angular/core';
import { CoreFactory } from '../../../../core/factory/core.factory';
import { ActivatedRoute, Router } from '@angular/router';
import { COMPARISON_OPERATOR } from '../../../../core/constant/constant';
import { ActionService } from '../../../../core/services/uninjectable/action.service';
import { LOVService } from '../../../../core/services/uninjectable/lov.service';
import { InputForm } from '../../../../core/models/input-form';
import { DefaultNotificationService } from '../../../../core/services/default-notification.service';

@Component({
  selector: 'app-PJA011',
  templateUrl: './PJA011.component.html',
  styleUrls: ['./PJA011.component.scss']
})

export class PJA011Component implements OnInit {

  public selectedSdm: number;
  public onInitID: string;

  @ViewChild('viewAsDateTemplate')
  public viewAsDateTemplate: any;
  @ViewChild('tableActionTemplate')
  public tableActionTemplate: any;

  public action: ActionService;
  public inputForm: InputForm;
  public time: Date = new Date();

  public lovMethod: LOVService;
  
  public sdmPhone: string;
  public sdmName: string;
  public maxContract: string;
  public minContract: string;
  private selectedId: number;


  constructor(
    public _notif: DefaultNotificationService,
    private _factory: CoreFactory,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe((param) => {
      this.selectedId = param.id;
      if (param.cId == null) {
        this.onInitID = '';
      } else {
        this.onInitID = param.cId;
      }
    });
  }

  public ngOnInit() {
    this.inputForm = this._factory.inputForm({
      formControls: {
        sdmassign_id: '',
        sdm_id: '',
        sdm_name: '',
        sdm_phone: '',
        sdmassign_startdate: '',
        sdmassign_enddate: '',
        sdmassign_loc: '',
        sdmassign_picclient: '',
        sdmassign_picclientphone: '',
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

    this.lovMethod = this._factory.lov({
        api: 'lov/method',
        initializeData: true
    });

    this.action = this._factory.actions({
        api: 'project/SdmAssignment',
        inputForm: this.inputForm,
    });

    const readAllApi = this._factory.api({
        api : 'project/SdmAssignment/readAll',
        pagingParams : {
          filter : {
            field : 'sdmassign_id',
            operator : COMPARISON_OPERATOR.EQ,
            value : this.selectedId
          }
        }
      });

    this._factory.http().get(readAllApi).subscribe((res: any) => {
      this.action.patchFormData(res.data.items[0]);
      this.sdmPhone = res.data.items[0].sdm_phone;
      this.sdmName = res.data.items[0].sdm_name;
      this.selectedSdm = res.data.items[0].sdm_id;
          const readAllSDM = this._factory.api({
            api : 'sdm/MengelolaSdm/readAll',
            pagingParams : {
              filter : {
                field : 'sdm_id',
                operator : COMPARISON_OPERATOR.EQ,
                value : this.selectedSdm
              }
            }
          });
      
        this._factory.http().get(readAllSDM).subscribe((res: any) => {
          this.action.patchFormData(res.data.items[0]);
          this.maxContract = res.data.items[0].sdm_endcontract;
          this.minContract = res.data.items[0].sdm_startcontract;
        });

    });

    setInterval(() => {
      this.time = new Date();
    }, 1);

  }

  public onUpdate() { 
    const updateAPI = this._factory.api({
    api: 'project/SdmAssignment/update',
    // params: {
    // client_id: this.selectedId }
   });
    this._factory.http().put(updateAPI + '?sdmassign_id=' + this.selectedId, this.action.getFormData()).subscribe((response: any) => {
      this._notif.success({
        message: 'Update Data Berhasil'
      });
      setTimeout(() => this.navigateBack(this.onInitID), 1000);
    });
 }
 public navigateBack(cId) {
  this.router.navigate(['/pages/pja/PJA010', { cId }]);
}
}
