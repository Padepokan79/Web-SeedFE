import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ActionService } from '../../../../../core/services/uninjectable/action.service';
import { InputForm } from '../../../../../core/models/input-form';
import { LOVService } from '../../../../../core/services/uninjectable/lov.service';
import { CoreFactory } from '../../../../../core/factory/core.factory';
import { COMPARISON_OPERATOR } from '../../../../../core/constant/constant';
import { DefaultNotificationService } from '../../../../../core/services/default-notification.service';
import { Router } from '../../../../../../../node_modules/@angular/router';
import { FileUploader } from '../../../../../../../node_modules/ng2-file-upload';

@Component({
  selector: 'app-tab-datapribadi',
  templateUrl: './tab-datapribadi.component.html',
  styleUrls: ['./tab-datapribadi.component.scss']
})
export class TabDatapribadiComponent implements OnInit {

  /*
  * Updated by Alifhar Juliansyah
  * 31/08/2018
  */
  public pathFoto: string;
  public imageFiles: any;
  public files: any[] = [];
  public fileReader = new FileReader();

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

  public date: Date = new Date();
  public mulaiDari: Date = new Date(1990, 0 , 1);
  public maxDate: Date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() - 1);

  // coba
  public uploaderFoto: FileUploader;
  public uploader: FileUploader;

  constructor(private _factory: CoreFactory,
              public _notif: DefaultNotificationService,
              private router: Router) {
                const URL = this._factory.api({
                  api: 'sdm\Upload',
                  params: {
                    sdm_id: this.id
                  }
                });

                // tslint:disable-next-line:prefer-const
                let token = 'bearer' + JSON.parse((localStorage.getItem('loggedInUser')))['access_token'];
                this.uploader = new FileUploader({url: URL, authToken: token, authTokenHeader: 'authorization'});
                this.uploaderFoto = new FileUploader({});
              }

    public ngOnInit() {

      setInterval(() => {
        this.date = new Date();
      }, 1);

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

  public handleFileInput(event) {
    // console.log(event);
    const files = event.target['files'];
    if (event.target['files']) {
      this.readFiles(event.target['files'], 0);
    }
  }

  public readFiles(files: any[], index: number) {
    this.pathFoto = null;
    this.imageFiles = [];
    const file = files[index];
    this.fileReader.onload = () => {
      this.imageFiles.push(this.fileReader.result);
      if (files[index + 1]) {
        this.readFiles(files, index + 1);
      } else {
        console.log('Succes Read Photo');
      }
    };
    this.fileReader.readAsDataURL(file);
    console.log('file: ' + file);
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

  public masukanPhoto() {
    // tslint:disable-next-line:prefer-const
    let token = 'bearer ' + JSON.parse((localStorage.getItem('loggedInUser')))['access_token'];
    console.log(token);
    // tslint:disable-next-line:prefer-const
    let URL = this._factory.api ({
      api: 'sdm/Upload/upload',
      params: {
        sdm_id: this.id
      }
    });
    if (this.uploaderFoto.queue.length > 0) {
      this.uploaderFoto.setOptions({ url: URL,
                                      authToken: token,
                                    authTokenHeader: 'authorization'});
      this.uploaderFoto.onBuildItemForm = (item, form) => {
        // tslint:disable-next-line:prefer-const
        let fileName = this.action.getFormControlValue('sdm_name') + '.'
                      + item._file.type.replace('image/', '');
        item.file.name = fileName.replace(' ', '_');
      };
      if (this.uploaderFoto.queue.length > 0) {
        if (this.uploaderFoto.queue[0].file.size > 500000) {
          this._notif.error({
            message: 'File tidak boleh melebihi 500kb'
          });
          this.uploaderFoto.clearQueue();
        } else {
          this.uploaderFoto.uploadAll();
        }
      }
    } else {
      this.uploaderFoto.clearQueue();
      this.action.onSave();
    }
  }

  public onUpdate() {
    const updateAPI = this._factory.api({
      api : 'sdm/mengelolaSdm/update',
    });

    this.action.patchFormData({
      sdm_image: this.uploaderFoto.queue[0].file.name
    });
    console.log(this.uploaderFoto.queue[0].file.name);

    // tslint:disable-next-line:no-empty
    this._factory.http().put(updateAPI + '?sdm_id=' + this.id, this.action.getFormData()).subscribe((response: any) => {
      this._notif.success({
        message: 'Successfully Update Data'
      });
    });
  }

}
