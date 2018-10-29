import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CoreFactory } from '../../../../../../core/factory/core.factory';
import { ActionService } from '../../../../../../core/services/uninjectable/action.service';
import { InputForm } from '../../../../../../core/models/input-form';
import { LOVService } from '../../../../../../core/services/uninjectable/lov.service';
import { COMPARISON_OPERATOR } from '../../../../../../core/constant/constant';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { angularMath } from 'angular-ts-math';

@Component({
  selector: 'app-tabDetail-dataPribadi',
  templateUrl: './tabDetail-dataPribadi.component.html',
  styleUrls: ['./tabDetail-dataPribadi.component.scss']
})
export class TabDetailDataPribadiComponent implements OnInit {

  public imageUrl: string = 'http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png';
  public fileToUpload: File = null;
  // public form = 1;
  public gender = '1';

  @Input()
  public form: number;
  @Input()
  public id: number;

  @ViewChild('viewAsDateTemplate')
  public viewAsDateTemplate: any;
  @ViewChild('tableActionTemplate')
  public tableActionTemplate: any;

  public action: ActionService;
  public inputForm: InputForm;
  public teknis: string;
  public teknon: string;
  public lovReligion: LOVService;
  public lovHealth: LOVService;
  public lovLevel: LOVService;
  public lovStatus: LOVService;
  public lovDegree: LOVService;
  private selectedId: string;

  // Gambar
  // tslint:disable-next-line:member-ordering
  public pathFoto: string;
  public incFoto = angularMath.getIntegerRandomRange(1, 100000);

  constructor(
    private location: Location,
    private _factory: CoreFactory,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((param) => {
      this.selectedId = param.id;
    });
  }

  public ngOnInit() {

    this.inputForm = this._factory.inputForm({
      formControls: {
        sdm_id: '',
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
      }
    });

    this.action = this._factory.actions({
      api: 'sdm/mengelolaSdm',
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

    const readAllApi = this._factory.api({
      api : 'sdm/mengelolaSdm/readAll',
      pagingParams : {
        filter : {
          field : 'sdm_id',
          operator : COMPARISON_OPERATOR.EQ,
          value : this.selectedId
        }
      }
    });

    this._factory.http().get(readAllApi).subscribe((res: any) => {
      console.log(res);
      this.action.patchFormData(res.data.items[0]);
      // tslint:disable-next-line:triple-equals
      if (this.pathFoto == null || this.pathFoto == '') {
        this.pathFoto = this._factory.config().staticResourceFullPath(res.data.items[0].sdm_image + "?rnd=" + this.incFoto);
        console.log ('Berhasil', 'LOAD PHOTO');
      } else {
        console.log ('GAGAL', 'LOAD PHOTO');
      }
      // this.pathFoto = this._factory.config().staticResourceFullPath(res.data.items[0].sdm_image);
      console.log(this.pathFoto + ' ini path foto');
      this.teknis = res.data.items[0].sdm_nik;
      if (this.teknis === '-') {
        this.teknis = '000000000';
      }
    });
  }

  public handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
  }
  public goBack(){
    this.location.back();
  }

}
