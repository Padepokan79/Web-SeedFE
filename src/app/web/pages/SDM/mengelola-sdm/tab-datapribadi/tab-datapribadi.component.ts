import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ActionService } from '../../../../../core/services/uninjectable/action.service';
import { InputForm } from '../../../../../core/models/input-form';
import { LOVService } from '../../../../../core/services/uninjectable/lov.service';
import { CoreFactory } from '../../../../../core/factory/core.factory';
import { COMPARISON_OPERATOR } from '../../../../../core/constant/constant';
import { DefaultNotificationService } from '../../../../../core/services/default-notification.service';
import { Router } from '../../../../../../../node_modules/@angular/router';
import { FileUploader } from '../../../../../../../node_modules/ng2-file-upload';
import { IAfterActionResult } from '../../../../../core/interfaces/action/i-after-action-result';
import { FormControl } from '../../../../../../../node_modules/@angular/forms';
import { HttpClient, HttpParams } from '../../../../../../../node_modules/@angular/common/http';
import { url } from 'inspector';
import { SubjectSubscriber } from '../../../../../../../node_modules/rxjs/Subject';

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
  public sdmId: any;
  public contractType: any;
  public sdmhiringId: any;
  public clientId: any;

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
  public mulaiDari: Date = new Date(1992, 0 , 1);
  public maxDate: Date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() - 1);

  // coba
  public test: number = 1;
  public uploaderFoto: FileUploader;
  public uploader: FileUploader;

  constructor(private _factory: CoreFactory,
              public _notif: DefaultNotificationService,
              private router: Router,
              private http: HttpClient
            ) {
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

          client_id: '1',
          hirestat_id: '4'
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
          // tslint:disable-next-line:triple-equals
          if (this.pathFoto == null || this.pathFoto == '') {
            this.pathFoto = this._factory.config().staticResourceFullPath(res.data.items[0].sdm_image);
            console.log ('Berhasil', 'LOAD PHOTO');
          } else {
            console.log ('GAGAL', 'LOAD PHOTO');
          }
          // this.pathFoto = this._factory.config().staticResourceFullPath(res.data.items[0].sdm_image);
          console.log(this.pathFoto + ' ini path foto');
        });
      }

    
  }

  public onSave() {
    if (this.uploaderFoto.queue[0]) {
      if(this.uploaderFoto.queue[0].file.size < 500000){
        const postAPI = this._factory.api({
          api: 'sdm/mengelolaSdm/create',
        });
        console.log(this.pathFoto);
        this._factory.http().post(postAPI, this.action.getFormData())
        .subscribe((response: any) => {
          // console.log(response.data.sdm_id);
          this.tabEvent.emit(response.data.sdm_id);
          this.masukanPhoto(response.data.sdm_id);
          console.log(response.data. contracttype_id);
          console.log(response.data.sdm_id);
          this.insertHiring(response.data.sdm_id, response.data. contracttype_id);
        });
        this._notif.success({
        message: 'Save Successfuly'
      });
      }
      else{
        this._notif.error({
          message:'file lebih dari 500kb!'
        })
      }

    } else {
      this._notif.error({
        message: 'Anda belum mengupload foto!'
      });
    }
  }

  // tslint:disable-next-line:variable-name
  public insertHiring(sdm_id, contracttype_id) {
    // tslint:disable-next-line:prefer-const
    let sdmId = sdm_id;
    // tslint:disable-next-line:prefer-const
    let contractType = contracttype_id;
    const multiInsert = [];
    multiInsert.push({
      sdmhiring_id : null,
      client_id: 1,
      hirestat_id: 4,
      sdm_id: sdmId
    });
    const hiringAPI = this._factory.api({
      api: 'project/MultiHiring/multiCreate',
    });
    const httpOtions = {
      params: new HttpParams()
    };
    if (contractType === 3 ) {
      this.http.post(hiringAPI, {
        listhiring: multiInsert
      }, httpOtions).subscribe((res: any) => {
        this._notif.success({
          message: 'You have successfully Hired'
        });
        console.log(res.data.sdmhiring_id);
        console.log(res.data.client_id);
        // this.insertassign(
        //   res.data.sdmhiringId,
        //   res.data.clientId
        // );

      }, (error: any) => {
        this._notif.error({
          message: 'Please check SDM Data'
        });
      }
    );
    }
  }

  // tslint:disable-next-line:variable-name
  public insertassign(sdmhiring_id, client_id ) {
  // tslint:disable-next-line:prefer-const
  let sdmhiringId = sdmhiring_id;
  // tslint:disable-next-line:prefer-const
  let clientId = client_id;
  // tslint:disable-next-line:prefer-const

  const multiInsertAssign = [];
  multiInsertAssign.push({
    client_id: clientId,
    sdmhiring_id: sdmhiringId,
    method_id: 1,
    hirestat_id: 4,
    // sdmassign_startdate: sdmStartcontract,
    // sdmassign_enddate: sdmEndcontract,
    // sdmassign_loc: 'Bandung'
    });
  console.log(client_id);
  console.log(sdmhiringId);

  const AssignApi = this._factory.api({
      api: 'project/InsertAssignment/multiCreate'
    });
  const httpOptions = {
      params: new HttpParams()
    };
  this.http.post(AssignApi, {
      listassignment: multiInsertAssign
    }, httpOptions).subscribe(() => {
      this._notif.success({
        message: 'You have successfully Assigned'
    });
    });
  }

  public clearUploaderFoto() {
    this.uploaderFoto.clearQueue();
  }

  // tslint:disable-next-line:variable-name
  public masukanPhoto(sdm_id) {
    // tslint:disable-next-line:prefer-const
    let nomorSdm = sdm_id;
    // tslint:disable-next-line:prefer-const
    let token = 'bearer ' + JSON.parse((localStorage.getItem('loggedInUser')))['access_token'];
    console.log(token);
    // tslint:disable-next-line:prefer-const
    let URL = this._factory.api({
      api: 'sdm/Upload/upload',
      params: {
        sdm_id: nomorSdm
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
            this.uploaderFoto.onSuccessItem = (item, response, status, headers) => {
              this.action.patchFormData({foto : item.file.name});
              this.test++;
              this.uploaderFoto.clearQueue();
          };
        }
      }   else {
        this.uploaderFoto.clearQueue();
      }
    }
  }

  public masukanPhotoEdit() {
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
    if (this.uploaderFoto.queue.length >= 0) {
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
            this.uploaderFoto.onSuccessItem = (item, response, status, headers) => {
              this.action.patchFormData({foto : item.file.name});
              this.test++;
              this.uploaderFoto.clearQueue();
          };
        }
      }   else {
        this.uploaderFoto.clearQueue();
      }
    }
  }

  public onUpdate() {
    const updateAPI = this._factory.api({
      api : 'sdm/mengelolaSdm/update',
    });
    this.masukanPhotoEdit();
    // this.action.patchFormData({
    //   sdm_image: this.uploaderFoto.queue[0].file.name
    // });
    // console.log(this.uploaderFoto.queue[0].file.name);
    // tslint:disable-next-line:no-empty
    this._factory.http().put(updateAPI + '?sdm_id=' + this.id, this.action.getFormData()).subscribe((response: any) => {
      this._notif.success({
        message: 'Successfully Update Data'
      });
    });
  }

  public handleFileInput(event) {
    // console.log(event);
    const files = event.target['files'];
    if (event.target['files']) {
      this.readFiles(event.target['files'], 0);
    }
    this.action.form().data.markAsDirty();
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

}
