import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ActionService } from '../../../../../core/services/uninjectable/action.service';
import { InputForm } from '../../../../../core/models/input-form';
import { LOVService } from '../../../../../core/services/uninjectable/lov.service';
import { CoreFactory } from '../../../../../core/factory/core.factory';
import { COMPARISON_OPERATOR } from '../../../../../core/constant/constant';
import { DefaultNotificationService } from '../../../../../core/services/default-notification.service';
import { Router } from '../../../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-tab-datapribadi',
  templateUrl: './tab-datapribadi.component.html',
  styleUrls: ['./tab-datapribadi.component.css']
})
export class TabDatapribadiComponent implements OnInit {

  public imageUrl: string = 'http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png';
  public fileToUpload: File = null;
  // public form = 1;
  public gender = '1';

  @Input()
  public form: number;
  @Input()
  public id: number;

  @Output()
  public tabEvent = new EventEmitter<number>();

  @ViewChild('viewAsDateTemplate')
  public viewAsDateTemplate: any;
  @ViewChild('tableActionTemplate')
  public tableActionTemplate: any;

  public action: ActionService;
  public inputForm: InputForm;

  public lovReligion: LOVService;
  public lovHealth: LOVService;
  public lovLevel: LOVService;
  public lovStatus: LOVService;
  public lovDegree: LOVService;

  constructor(
    private _factory: CoreFactory,
    public _notif: DefaultNotificationService,
    private router: Router
  ) { }

    public ngOnInit() {

      this.inputForm = this._factory.inputForm({
        formControls: {
          sdm_id: null,
          contracttype_id: '',
          gender_id: '1',
          health_id: '',
          religion_id: '',
          sdm_address: '',
          sdm_contractloc: '',
          sdm_datebirth: '',
          sdm_email: '',
          sdm_endcontract: '',
          sdm_image: '',
          sdm_ktp: '',
          sdm_linkedin: '',
          sdm_name: '',
          sdm_nik: '',
          sdm_objective: '',
          sdm_phone: '',
          sdm_placebirth: '',
          sdm_postcode: '',
          sdm_startcontract: '',
          sdm_status: '1',
          sdmlvl_id: '',
        },
        validationMessages: {
          sdm_name: {
            required: 'Silahkan masukkan Nama Lengkap'
          },
          sdm_nik: {
            pattern: 'Masukkan hanya angka'
          },
          sdm_ktp: {
            pattern: 'Masukkan hanya angka'
          },
          sdm_postcode: {
            pattern: 'Masukkan hanya angka'
          }
        },
      });

      this.action = this._factory.actions({
        api: 'sdm/MengelolaSdm',
        inputForm: this.inputForm
      });

      this.lovReligion = this._factory.lov({
        api: 'lov/religion',
        initializeData: true
      });

      this.lovHealth = this._factory.lov({
        api: 'lov/health',
        initializeData: true
      });

      this.lovLevel = this._factory.lov({
        api: 'lov/sdmLvl',
        initializeData: true
      });

      this.lovStatus = this._factory.lov({
        api: 'lov/contractType',
        initializeData: true
      });

      if (this.form === 2) {
        const readAllApi = this._factory.api({
          api : 'sdm/mengelolaSdm/readAll',
          pagingParams : {
            filter : {
              field : 'sdm_id',
              operator : COMPARISON_OPERATOR.EQ,
              value : this.id
            }
          }
        });

        this._factory.http().get(readAllApi).subscribe((res: any) => {
          res.data.items[0].sdm_status = res.data.items[0].sdm_status === 'Active' ? 1 : 0;
          this.action.patchFormData(res.data.items[0]);
        });
      }
  }

  public handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
  }

  public onSave() {
    const postAPI = this._factory.api({
      api: 'sdm/mengelolaSdm/create',
    });

    this._factory.http().post(postAPI, this.action.getFormData())
    .subscribe((response: any) => {
      // console.log(response.data.sdm_id);
      this.tabEvent.emit(response.data.sdm_id);
    });

  }

  public onUpdate() {
    const updateAPI = this._factory.api({
      api : 'sdm/mengelolaSdm/update',
    });

    // tslint:disable-next-line:no-empty
    this._factory.http().put(updateAPI + '?sdm_id=' + this.id, this.action.getFormData()).subscribe((response: any) => {
      this._notif.success({
        message: 'Successfully Update Data'
      });
    });
  }

}
