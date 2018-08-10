import { Component, OnInit, ViewChild } from '@angular/core';
import { CoreFactory } from '../../../../core/factory/core.factory';
import { ActivatedRoute } from '@angular/router';
import { COMPARISON_OPERATOR } from '../../../../core/constant/constant';
import { ActionService } from '../../../../core/services/uninjectable/action.service';
import { LOVService } from '../../../../core/services/uninjectable/lov.service';
import { InputForm } from '../../../../core/models/input-form';


@Component({
  selector: 'app-sdm-assignment-update',
  templateUrl: './sdm-assignment-update.component.html',
  styleUrls: ['./sdm-assignment-update.component.css']
})

export class SdmAssignmentUpdateComponent implements OnInit {

  @ViewChild('viewAsDateTemplate')
  public viewAsDateTemplate: any;
  @ViewChild('tableActionTemplate')
  public tableActionTemplate: any;

  public action: ActionService;
  public inputForm: InputForm;
  public time: Date = new Date();

  public lovMethod: LOVService;
  private selectedId: number;

  constructor(
    private _factory: CoreFactory,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((param) => {
      this.selectedId = param.id;
    });
  }

  public ngOnInit() {
    console.log('Selected ID : ' + this.selectedId);
    this.inputForm = this._factory.inputForm({
      formControls: {
        sdm_name: '',
        sdm_phone: '',
        sdmassign_startdate: '',
        sdmassign_enddate: '',
        sdmassign_loc: '',
        sdmassign_picclient: '',
        sdmassign_picclientphone: '',
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
      console.log(res);
      this.action.patchFormData(res.data.items[(this.selectedId - 1)]);
    });

    setInterval(() => {
      this.time = new Date();
    }, 1);

  }

  public onUpdate() {    const updateAPI = this._factory.api({
    api: 'project/SdmAssignment/update',
    // params: {
    // client_id: this.selectedId }
   });    this._factory.http().put(updateAPI + '?sdmassign_id=' + this.selectedId, this.action.getFormData()).subscribe((response: any) => {
     console.log('Update Data Berhasil');
   });
 }

}
